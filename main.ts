import {
  App,
  MarkdownView,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  WorkspaceLeaf,
} from "obsidian";
import { PaperEaterView, VIEW_TYPE } from "./view";
import { t, isRTL, setLangOverride } from "./i18n";

export interface PaperEaterSettings {
  apiKey: string;
  translationMode: "standard" | "deep";
  outputLanguage: string;
  uiLanguage: string;
}

const DEFAULT_SETTINGS: PaperEaterSettings = {
  apiKey: "",
  translationMode: "standard",
  outputLanguage: "auto",
  uiLanguage: "auto",
};

// ── PDF 文本清洗器 ────────────────────────────────────────────────────────────
//
// Strips common PDF text-layer control artifacts and collapses hard line breaks
// that PDF renderers inject into copied text.

function sanitizePdfText(raw: string): string {
  const PDF_ARTIFACTS =
    /\b(SCROLL_LOCK|PAGE_LEFT|PAGE_RIGHT|SCROLL_UP|SCROLL_DOWN|PAGE_UP|PAGE_DOWN|NUM_LOCK|CAPS_LOCK|PRINT_SCREEN|INSERT|PAUSE|BREAK)\b/gi;

  return raw
    .replace(PDF_ARTIFACTS, "")
    .replace(/\r\n/g, "\n")
    // Split on paragraph breaks, then within each paragraph join hard-wrapped lines
    .split(/\n{2,}/)
    .map(para => para.replace(/\n/g, " ").replace(/[ \t]{2,}/g, " ").trim())
    .filter(para => para.length > 0)
    .join("\n\n")
    .trim();
}

// ── 插件主类 ──────────────────────────────────────────────────────────────────

export default class PaperEaterPlugin extends Plugin {
  settings!: PaperEaterSettings;
  private viewfinder!: Viewfinder;

  async onload() {
    await this.loadSettings();

    // 应用保存的 UI 语言覆盖（若非 auto）
    if (this.settings.uiLanguage !== "auto") {
      setLangOverride(this.settings.uiLanguage);
    }

    this.registerView(VIEW_TYPE, (leaf) => new PaperEaterView(leaf, this));

    this.addRibbonIcon("book-open", t("ribbonTitle"), () => this.activateView());

    this.addCommand({
      id: "rewrite-selection",
      name: t("cmdRewrite"),
      editorCallback: async (editor, ctx) => {
        const raw = editor.getSelection();
        if (!raw?.trim()) { new Notice(t("noticeNoText")); return; }
        const view = await this.activateView();
        view?.processText(sanitizePdfText(raw), ctx as MarkdownView);
      },
    });

    this.addCommand({
      id: "capture-note-pane",
      name: t("cmdCapture"),
      callback: () => this.captureNotePaneAndProcess(),
    });

    this.addSettingTab(new PaperEaterSettingTab(this.app, this));

    // 注册 Alt+框选 取景器
    this.viewfinder = new Viewfinder(this);
    this.viewfinder.install();

    // 布局就绪后自动打开侧边栏（首次启用或重启后均会触发）
    this.app.workspace.onLayoutReady(() => { this.activateView(); });
  }

  onunload() {
    this.viewfinder.uninstall();
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);
  }

  async activateView(): Promise<PaperEaterView | null> {
    const { workspace } = this.app;
    let leaf: WorkspaceLeaf | null = workspace.getLeavesOfType(VIEW_TYPE)[0] ?? null;
    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      await leaf?.setViewState({ type: VIEW_TYPE, active: true });
    }
    if (leaf) {
      workspace.revealLeaf(leaf);
      return leaf.view as PaperEaterView;
    }
    return null;
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  // ── 截图工具方法（供 Viewfinder 和侧边栏按钮共用） ───────────────────────

  // 用 @electron/remote 的 capturePage 截取整个 Obsidian 窗口，再裁剪指定区域
  async captureArea(x: number, y: number, w: number, h: number): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const remote = (window as any).require("@electron/remote") as {
      getCurrentWindow(): {
        webContents: {
          capturePage(): Promise<{
            crop(r: { x: number; y: number; width: number; height: number }): {
              toJPEG(q: number): { toString(enc: string): string };
            };
          }>;
        };
      };
    };

    const win   = remote.getCurrentWindow();
    const full  = await win.webContents.capturePage();
    const scale = window.devicePixelRatio || 1;

    return full
      .crop({
        x:      Math.round(x * scale),
        y:      Math.round(y * scale),
        width:  Math.max(1, Math.round(w * scale)),
        height: Math.max(1, Math.round(h * scale)),
      })
      .toJPEG(85)
      .toString("base64");
  }

  // 截取区域后自动开启侧边栏并发送给 Gemini
  async captureAndProcess(x: number, y: number, w: number, h: number) {
    let base64: string;
    try {
      base64 = await this.captureArea(x, y, w, h);
    } catch (e) {
      console.error("[PaperEater] captureArea error:", e);
      new Notice(t("noticeCaptureError") + (e as Error).message);
      return;
    }
    const view = await this.activateView();
    view?.processScreenshot(base64);
  }

  // 截取当前活跃笔记编辑区（左侧主内容区）
  async captureNotePaneAndProcess() {
    // 优先取活跃 leaf 的内容容器，退而求其次取左分栏根节点
    const el =
      document.querySelector<HTMLElement>(".workspace-leaf.mod-active .view-content") ??
      document.querySelector<HTMLElement>(".workspace-split.mod-left-split");

    if (!el) {
      new Notice(t("noticeNoNote"));
      return;
    }

    const r = el.getBoundingClientRect();
    await this.captureAndProcess(r.left, r.top, r.width, r.height);
  }
}

// ── Alt + 框选 取景器 ─────────────────────────────────────────────────────────
//
// 使用方法：
//   1. 按住 Alt/Option，鼠标光标变为十字准星
//   2. 拖动鼠标框选任意区域（红陶土色选框）
//   3. 松开鼠标 → 自动截图裁剪 → 发送 Gemini

class Viewfinder {
  private plugin: PaperEaterPlugin;
  private isAltHeld  = false;
  private isSelecting = false;
  private startX = 0;
  private startY = 0;
  private overlay:  HTMLElement | null = null;
  private selBox:   HTMLElement | null = null;
  private hint:     HTMLElement | null = null;

  // 绑定 this 后的引用，用于 removeEventListener
  private readonly onKeyDown  = this._onKeyDown.bind(this);
  private readonly onKeyUp    = this._onKeyUp.bind(this);
  private readonly onMouseDown = this._onMouseDown.bind(this);

  constructor(plugin: PaperEaterPlugin) {
    this.plugin = plugin;
  }

  install() {
    document.addEventListener("keydown",   this.onKeyDown,   true);
    document.addEventListener("keyup",     this.onKeyUp,     true);
    document.addEventListener("mousedown", this.onMouseDown, true);
  }

  uninstall() {
    document.removeEventListener("keydown",   this.onKeyDown,   true);
    document.removeEventListener("keyup",     this.onKeyUp,     true);
    document.removeEventListener("mousedown", this.onMouseDown, true);
    this.cleanup();
  }

  // ── 键盘事件 ────────────────────────────────────────────────────────────

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key !== "Alt" || this.isAltHeld) return;
    this.isAltHeld = true;
    document.body.style.cursor = "crosshair";
    this.showHint();
  }

  private _onKeyUp(e: KeyboardEvent) {
    if (e.key !== "Alt") return;
    this.isAltHeld = false;
    if (!this.isSelecting) this.cleanup();
  }

  // 按住 Alt 时右下角显示小提示
  private showHint() {
    if (this.hint) return;
    this.hint = document.createElement("div");
    Object.assign(this.hint.style, {
      position: "fixed", right: "16px", bottom: "16px",
      background: "rgba(184,92,78,0.92)", color: "#fff",
      fontSize: "12px", padding: "5px 10px", borderRadius: "5px",
      zIndex: "99998", pointerEvents: "none", userSelect: "none",
    } satisfies Partial<CSSStyleDeclaration>);
    this.hint.textContent = t("viewfinderHint");
    document.body.appendChild(this.hint);
  }

  // ── 鼠标事件 ────────────────────────────────────────────────────────────

  private _onMouseDown(e: MouseEvent) {
    if (!this.isAltHeld || e.button !== 0) return;
    // 阻止 Obsidian 正常的文字选中 / 链接点击
    e.preventDefault();
    e.stopPropagation();

    this.isSelecting = true;
    this.startX = e.clientX;
    this.startY = e.clientY;

    // 透明全屏遮罩（仅为捕获 mousemove / mouseup 事件）
    this.overlay = document.createElement("div");
    Object.assign(this.overlay.style, {
      position: "fixed", inset: "0",
      zIndex: "99999", cursor: "crosshair", userSelect: "none",
    } satisfies Partial<CSSStyleDeclaration>);

    // 选择框（红陶土边框 + 半透明填充）
    this.selBox = document.createElement("div");
    Object.assign(this.selBox.style, {
      position: "fixed", display: "none",
      border: "2px solid #B85C4E",
      background: "rgba(184,92,78,0.08)",
      // dim 未选区域：box-shadow 向外扩散覆盖整个视口
      boxShadow: "0 0 0 9999px rgba(0,0,0,0.25)",
      pointerEvents: "none",
    } satisfies Partial<CSSStyleDeclaration>);

    this.overlay.appendChild(this.selBox);
    document.body.appendChild(this.overlay);

    const onMove = (ev: MouseEvent) => this.onMouseMove(ev);
    const onUp   = (ev: MouseEvent) => {
      this.overlay?.removeEventListener("mousemove", onMove);
      this.overlay?.removeEventListener("mouseup",   onUp);
      this.onMouseUp(ev);
    };
    this.overlay.addEventListener("mousemove", onMove);
    this.overlay.addEventListener("mouseup",   onUp);
  }

  private onMouseMove(e: MouseEvent) {
    if (!this.selBox) return;
    const x = Math.min(e.clientX, this.startX);
    const y = Math.min(e.clientY, this.startY);
    const w = Math.abs(e.clientX - this.startX);
    const h = Math.abs(e.clientY - this.startY);
    if (w > 4 || h > 4) this.selBox.style.display = "block";
    Object.assign(this.selBox.style, {
      left: `${x}px`, top: `${y}px`,
      width: `${w}px`, height: `${h}px`,
    });
  }

  private async onMouseUp(e: MouseEvent) {
    const x = Math.min(e.clientX, this.startX);
    const y = Math.min(e.clientY, this.startY);
    const w = Math.abs(e.clientX - this.startX);
    const h = Math.abs(e.clientY - this.startY);

    this.cleanup();

    if (w < 20 || h < 20) return; // 太小则忽略

    // 先等两帧确保遮罩已从 DOM 移除，再截图（否则会截到遮罩本身）
    await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));

    await this.plugin.captureAndProcess(x, y, w, h);
  }

  private cleanup() {
    this.isSelecting = false;
    this.isAltHeld   = false;
    document.body.style.cursor = "";
    this.overlay?.remove(); this.overlay = null;
    this.selBox  = null;
    this.hint?.remove();    this.hint    = null;
  }
}

// ── 设置页 ────────────────────────────────────────────────────────────────────

class PaperEaterSettingTab extends PluginSettingTab {
  plugin: PaperEaterPlugin;

  constructor(app: App, plugin: PaperEaterPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    if (isRTL()) containerEl.setAttribute("dir", "rtl");
    containerEl.createEl("h2", { text: t("settingsTitle") });

    new Setting(containerEl)
      .setName(t("settingsApiKeyName"))
      .setDesc(t("settingsApiKeyDesc"))
      .addText((text) => {
        text.inputEl.type = "password";
        text
          .setPlaceholder("AIza...")
          .setValue(this.plugin.settings.apiKey)
          .onChange(async (value) => {
            this.plugin.settings.apiKey = value.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName(t("settingsModeName"))
      .setDesc(t("settingsModeDesc"))
      .addDropdown((drop) =>
        drop
          .addOption("standard", t("settingsModeOptStandard"))
          .addOption("deep", t("settingsModeOptDeep"))
          .setValue(this.plugin.settings.translationMode)
          .onChange(async (value) => {
            this.plugin.settings.translationMode = value as "standard" | "deep";
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t("settingUiLangTitle"))
      .setDesc(t("settingUiLangDesc"))
      .addDropdown((drop) => {
        const UI_LANG_OPTIONS: [string, string][] = [
          ["auto", t("settingUiLangAuto")],
          ["zh", "简体中文"], ["en", "English"],  ["de", "Deutsch"],
          ["es", "Español"],  ["fr", "Français"], ["ja", "日本語"],
          ["ko", "한국어"],    ["pt", "Português"], ["ru", "Русский"],
          ["ar", "العربية"],
        ];
        for (const [val, label] of UI_LANG_OPTIONS) drop.addOption(val, label);
        return drop
          .setValue(this.plugin.settings.uiLanguage)
          .onChange(async (value) => {
            this.plugin.settings.uiLanguage = value;
            await this.plugin.saveSettings();
            setLangOverride(value === "auto" ? null : value);
            // 立即重绘所有食卷兽面板
            this.app.workspace.getLeavesOfType(VIEW_TYPE).forEach(leaf => {
              (leaf.view as PaperEaterView).rebuild();
            });
          });
      });

    new Setting(containerEl)
      .setName(t("settingOutputLangTitle"))
      .setDesc(t("settingOutputLangDesc"))
      .addDropdown((drop) => {
        drop.addOption("auto", t("settingOutputLangAuto"));
        const OUTPUT_LANGUAGES = [
          "简体中文", "繁體中文", "English", "Deutsch", "Español",
          "Français", "Italiano", "日本語", "한국어", "Русский",
          "العربية", "Nederlands", "Português", "Svenska", "Polski",
          "Türkçe", "Bahasa Indonesia", "Tiếng Việt", "ภาษาไทย",
          "हिन्दी", "Dansk", "Norsk", "Suomi", "Čeština",
          "Magyar", "Română", "Català", "Ελληνικά", "עברית",
        ];
        for (const lang of OUTPUT_LANGUAGES) drop.addOption(lang, lang);
        return drop
          .setValue(this.plugin.settings.outputLanguage)
          .onChange(async (value) => {
            this.plugin.settings.outputLanguage = value;
            await this.plugin.saveSettings();
          });
      });

    containerEl.createEl("p", {
      text: t("settingsShortcutHint"),
      cls:  "setting-item-description",
    });
  }
}
