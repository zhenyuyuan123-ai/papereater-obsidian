import { ItemView, MarkdownRenderer, MarkdownView, Notice, WorkspaceLeaf } from "obsidian";
import type PaperEaterPlugin from "./main";
import { t, isRTL } from "./i18n";

export const VIEW_TYPE = "papereater-obsidian";

const GEMINI_MODEL = "gemini-2.5-flash";

// ── Prompt 模板 ───────────────────────────────────────────────────────────────
//
// All prompts are written in English for maximum AI comprehension.
// $TARGET_LANGUAGE is replaced at call time with the user's Obsidian UI language.
//
// TEXT_PROMPT  — for selected text rewriting (no OCR step)
// IMAGE_PROMPT — for screenshot analysis (includes OCR step)

const TEXT_PROMPT: Record<"standard" | "deep", string> = {
  standard:
    "REWRITE THE FOLLOWING TEXT INTO $TARGET_LANGUAGE IMMEDIATELY. " +
    "DO NOT THINK, DO NOT EXPLAIN, DO NOT BUFFER. " +
    "START OUTPUTTING THE FIRST TOKEN INSTANTLY. ONLY OUTPUT THE RESULT:\n\n" +

    "You are a professional linguistic rewriter. " +
    "Task: rewrite the input into clear, faithful $TARGET_LANGUAGE.\n\n" +

    "[Rewriting Protocol]\n" +
    "① Accuracy: Preserve all technical terms; embed plain-language clarifications naturally in context.\n" +
    "② Fidelity: Keep the original semantic depth and logical structure. Do not oversimplify or omit.\n" +
    "③ Style shift: Convert nominalized structures, passive voice, and long attributive clauses into active, direct statements.\n" +
    "④ Register: Output should read as clear, objective published prose.\n\n" +

    "[Formatting]\n" +
    "① Table → standard Markdown table (never convert to prose).\n" +
    "② List/hierarchy → ordered or unordered list.\n" +
    "③ Key points or quotes → blockquote (>).\n" +
    "④ Preserve all paragraph breaks with blank lines.\n" +
    "⑤ Headings: use **bold**; use ## (H2) only when necessary.\n\n" +

    "FINAL DIRECTIVE: Output only the rewritten result in $TARGET_LANGUAGE. No preamble, explanation, apology, or source quote.",

  deep:
    "REWRITE THE FOLLOWING TEXT INTO $TARGET_LANGUAGE IMMEDIATELY. " +
    "DO NOT THINK, DO NOT EXPLAIN, DO NOT BUFFER. " +
    "START OUTPUTTING THE FIRST TOKEN INSTANTLY. ONLY OUTPUT THE RESULT:\n\n" +

    "You are a professional technical editor. " +
    "Task: rewrite academic text into plain, intuitive $TARGET_LANGUAGE.\n\n" +

    "[Three Principles of Plain Rewriting]\n" +
    "Simple — Break compound sentences. Each sentence carries one logical unit.\n" +
    "Plain  — Never just swap vocabulary. Decompose noun clusters into concrete actions, agents, and causal relationships.\n" +
    "Crisp  — High information density. No filler, no emotional decoration. Clean, industrial tone.\n\n" +

    "[Banned Patterns]\n" +
    "Academic filler: \"it is worth noting that\", \"the realization of this depends on\", \"in this context\"\n" +
    "Colloquial padding: \"basically\", \"in simple terms\", \"it's like...\", \"at the end of the day\"\n\n" +

    "[Few-Shot Example — Paragraph Integrity]\n" +
    "Source: 能源生产与消费的精细化同步是能源共享的核心要素。此要素的实现，离不开智能计量系统（iMSys）和高效数据整合，同时还需要对分布式能源资产进行优化控制。\n" +
    "✗ Fragmented (wrong — sentences split into pseudo-paragraphs with bold pseudo-headings):\n" +
    "**能源共享核心是精细化同步。**\n\n" +
    "这需要智能电表和数据整合。\n\n" +
    "资产也需要优化控制。\n\n" +
    "✓ Plain prose (correct — one source paragraph → one output paragraph, flowing prose):\n" +
    "能源共享最核心的挑战，是让发电量和用电量在时间上完全对齐。要做到这点，必须依靠智能电表进行实时数据传输与高效整合，同时还要对能源资产进行优化控制。\n\n" +

    "[Paragraph Integrity — Iron Rule]\n" +
    "If the source is one continuous paragraph, the output MUST also be one unbroken paragraph. Never split a paragraph into isolated single sentences with blank lines between them.\n" +
    "Output as flowing academic/engineering prose. Do NOT bold individual sentences as pseudo-headings. Do NOT wrap sentences arbitrarily in blockquotes (>).\n\n" +

    "[Formatting]\n" +
    "① Table → standard Markdown table. Explicit list in source → ordered/unordered list. Do not create lists from prose.\n" +
    "② Use **bold** only for genuine technical term emphasis found in the source. Use > only for explicitly quoted speech.\n" +
    "③ Preserve paragraph breaks: blank line between paragraphs, none within a paragraph.\n" +
    "④ Headings: **bold**; use ## (H2) only when the source has section headings.\n\n" +

    "FINAL DIRECTIVE: Output only the rewritten result in $TARGET_LANGUAGE. No preamble, annotation, or source quote.",
};

const IMAGE_PROMPT: Record<"standard" | "deep", string> = {
  standard:
    "TRANSLATE THE CAPTURED TEXT INTO $TARGET_LANGUAGE IMMEDIATELY. " +
    "DO NOT THINK, DO NOT EXPLAIN, DO NOT BUFFER. " +
    "START OUTPUTTING THE FIRST TOKEN INSTANTLY. ONLY OUTPUT THE RESULT:\n\n" +

    "You are a professional translator. " +
    "Task: extract text from the screenshot and translate it into accurate, faithful $TARGET_LANGUAGE.\n\n" +

    "[Step 1 · OCR]\n" +
    "Extract all body text from the screenshot precisely. Ignore UI noise (navigation bars, buttons, headers, footers).\n\n" +

    "[Step 2 · Translation Protocol]\n" +
    "① Accuracy: Use the most authoritative, established $TARGET_LANGUAGE terms for technical vocabulary.\n" +
    "② Fidelity: Preserve semantic depth and logical structure. Do not oversimplify or omit.\n" +
    "③ Rhetoric: Retain the original rhetorical devices, sentence rhythm, and argumentative cadence.\n" +
    "④ Register: The translation should read as formal academic prose — calm, objective, restrained.\n\n" +

    "[Formatting]\n" +
    "① Table → standard Markdown table (never convert to prose).\n" +
    "② Mind maps / scattered text → ordered or unordered list by visual hierarchy.\n" +
    "③ Multi-column layout → complete left column first, then right column.\n" +
    "④ Captions or callout boxes → blockquote (>).\n" +
    "⑤ Preserve all paragraph breaks with blank lines.\n" +
    "⑥ Headings: **bold**; use ## (H2) only when necessary. Never use ###.\n\n" +

    "FINAL DIRECTIVE: Output only the final $TARGET_LANGUAGE translation. No preamble, explanation, apology, or source quote.",

  deep:
    "TRANSLATE THE CAPTURED TEXT INTO $TARGET_LANGUAGE IMMEDIATELY. " +
    "DO NOT THINK, DO NOT EXPLAIN, DO NOT BUFFER. " +
    "START OUTPUTTING THE FIRST TOKEN INSTANTLY. ONLY OUTPUT THE RESULT:\n\n" +

    "You are a professional technical editor. " +
    "Task: extract text from the screenshot and rewrite it into plain, intuitive $TARGET_LANGUAGE.\n\n" +

    "[Step 1 · OCR]\n" +
    "Extract all body text from the screenshot precisely. Ignore UI noise (navigation bars, buttons, headers, footers).\n\n" +

    "[Step 2 · Three Principles of Plain Rewriting]\n" +
    "Simple — Break compound sentences. Each sentence carries one logical unit.\n" +
    "Plain  — Never just swap vocabulary. Decompose noun clusters into concrete actions, agents, and causal relationships.\n" +
    "Crisp  — High information density. No filler, no emotional decoration. Clean, industrial tone.\n\n" +

    "[Banned Patterns]\n" +
    "Academic filler: \"it is worth noting that\", \"the realization of this depends on\", \"in this context\"\n" +
    "Colloquial padding: \"basically\", \"in simple terms\", \"it's like...\", \"at the end of the day\"\n\n" +

    "[Few-Shot Example — Paragraph Integrity]\n" +
    "Source: 能源生产与消费的精细化同步是能源共享的核心要素。此要素的实现，离不开智能计量系统（iMSys）和高效数据整合，同时还需要对分布式能源资产进行优化控制。\n" +
    "✗ Fragmented (wrong — sentences split into pseudo-paragraphs with bold pseudo-headings):\n" +
    "**能源共享核心是精细化同步。**\n\n" +
    "这需要智能电表和数据整合。\n\n" +
    "资产也需要优化控制。\n\n" +
    "✓ Plain prose (correct — one source paragraph → one output paragraph, flowing prose):\n" +
    "能源共享最核心的挑战，是让发电量和用电量在时间上完全对齐。要做到这点，必须依靠智能电表进行实时数据传输与高效整合，同时还要对能源资产进行优化控制。\n\n" +

    "[Paragraph Integrity — Iron Rule]\n" +
    "If the source is one continuous paragraph, the output MUST also be one unbroken paragraph. Never split a paragraph into isolated single sentences with blank lines between them.\n" +
    "Output as flowing academic/engineering prose. Do NOT bold individual sentences as pseudo-headings. Do NOT wrap sentences arbitrarily in blockquotes (>).\n\n" +

    "[Formatting]\n" +
    "① Table → standard Markdown table. Explicit list in source → ordered/unordered list. Do not create lists from prose.\n" +
    "② Use **bold** only for genuine technical term emphasis found in the source. Use > only for explicitly quoted speech.\n" +
    "③ Multi-column layout → complete left column first, then right column.\n" +
    "④ Preserve paragraph breaks: blank line between paragraphs, none within a paragraph.\n" +
    "⑤ Headings: **bold**; use ## (H2) only when the source has section headings.\n\n" +

    "FINAL DIRECTIVE: Output only the result in $TARGET_LANGUAGE. No preamble, annotation, or source quote.",
};

// Inject the target language name into a prompt template.
// outputLanguage: "auto" → follow Obsidian UI lang; anything else → use as-is.
function resolvePrompt(template: string, outputLanguage: string): string {
  const lang = outputLanguage === "auto" ? t("targetLanguageName") : outputLanguage;
  return template.replace(/\$TARGET_LANGUAGE/g, lang);
}

// ── 侧边栏视图 ────────────────────────────────────────────────────────────────

type ImagePart = { text: string } | { inline_data: { mime_type: string; data: string } };

export class PaperEaterView extends ItemView {
  plugin: PaperEaterPlugin;

  private outputEl!: HTMLElement;
  private statusEl!: HTMLElement;
  private copyBtn!: HTMLButtonElement;
  private insertBtn!: HTMLButtonElement;
  private btnStandard!: HTMLButtonElement;
  private btnDeep!: HTMLButtonElement;
  private screenshotBtn!: HTMLButtonElement;

  private modeState: "standard" | "deep" = "standard";
  private currentController: AbortController | null = null;
  private lastResult = "";
  private lastMarkdownView: MarkdownView | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: PaperEaterPlugin) {
    super(leaf);
    this.plugin = plugin;
    this.modeState = plugin.settings?.translationMode ?? "standard";
  }

  getViewType()    { return VIEW_TYPE; }
  getDisplayText() { return t("appName"); }
  getIcon()        { return "book-open"; }

  async onOpen() {
    this.modeState = this.plugin.settings?.translationMode ?? "standard";
    this.buildUI();
  }

  /** Called from settings when the UI language changes. */
  public rebuild() {
    this.modeState = this.plugin.settings?.translationMode ?? "standard";
    this.buildUI();
  }

  async onClose() {
    this.currentController?.abort();
  }

  // ── UI 构建 ───────────────────────────────────────────────────────────────

  private buildUI() {
    const root = (this.containerEl.children[1] ?? this.containerEl) as HTMLElement;
    root.empty();
    root.addClass("pe-root");
    if (isRTL()) root.setAttribute("dir", "rtl");
    this.buildHeader(root);
    this.outputEl = root.createDiv({ cls: "pe-output pe-output--empty" });
    this.buildFooter(root);
    this.showPlaceholder();
  }

  private buildHeader(root: HTMLElement) {
    const header = root.createDiv({ cls: "pe-header" });

    header.createDiv({ cls: "pe-logo", text: t("appName") });

    const seg = header.createDiv({ cls: "pe-mode-seg" });
    this.btnStandard = seg.createEl("button", { cls: "pe-seg-btn", text: t("modeStandard") });
    this.btnDeep     = seg.createEl("button", { cls: "pe-seg-btn", text: t("modeDeep") });
    this.syncSegBtns();
    this.btnStandard.addEventListener("click", () => this.setMode("standard"));
    this.btnDeep.addEventListener("click",     () => this.setMode("deep"));

    this.screenshotBtn = header.createEl("button", {
      cls:   "pe-icon-btn",
      title: t("screenshotBtnTitle"),
    });
    this.screenshotBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
    this.screenshotBtn.addEventListener("click", () => this.plugin.captureNotePaneAndProcess());
  }

  private buildFooter(root: HTMLElement) {
    const footer = root.createDiv({ cls: "pe-footer" });
    this.statusEl = footer.createDiv({ cls: "pe-status" });
    this.insertBtn = footer.createEl("button", { cls: "pe-insert-btn pe-hidden", text: t("insertBtn") });
    this.insertBtn.addEventListener("click", () => this.insertCallout());
    this.copyBtn = footer.createEl("button", { cls: "pe-copy-btn pe-hidden", text: t("copyBtn") });
    this.copyBtn.addEventListener("click", () => this.copyResult());
  }

  private async setMode(mode: "standard" | "deep") {
    this.modeState = mode;
    this.plugin.settings.translationMode = mode;
    await this.plugin.saveSettings();
    this.syncSegBtns();
  }

  private syncSegBtns() {
    this.btnStandard.toggleClass("pe-seg-active", this.modeState === "standard");
    this.btnDeep.toggleClass("pe-seg-active",     this.modeState === "deep");
  }

  // ── 占位 & 状态 ───────────────────────────────────────────────────────────

  private showPlaceholder() {
    this.outputEl.empty();
    this.outputEl.addClass("pe-output--empty");
    const wrap = this.outputEl.createDiv({ cls: "pe-placeholder" });

    // 顶部 tip 标签
    wrap.createDiv({ cls: "pe-placeholder-tip", text: t("placeholderTip") });

    // 按键示意：[Option / Alt] + [拖拽划选]
    const demo = wrap.createDiv({ cls: "pe-shortcut-demo" });
    demo.createEl("span", { cls: "pe-key pe-key--hero", text: t("placeholderKey") });
    demo.createEl("span", { cls: "pe-demo-plus", text: "+" });
    demo.createEl("span", { cls: "pe-key pe-key--hero", text: t("placeholderAction") });

    // 全句说明
    wrap.createEl("p", { cls: "pe-placeholder-desc", text: t("placeholderDesc") });

    // 分隔线
    wrap.createDiv({ cls: "pe-placeholder-divider" });

    // 命令面板备选提示
    wrap.createEl("p", { cls: "pe-sub-hint", text: t("placeholderSubHint") });

    this.hideCopyBtn();
    this.setStatus("");
  }

  private setStatus(msg: string, type: "" | "loading" | "error" | "done" = "") {
    this.statusEl.className = "pe-status" + (type ? ` pe-status--${type}` : "");
    this.statusEl.textContent = msg;
  }

  private showCopyBtn() {
    this.copyBtn.removeClass("pe-hidden");
    this.insertBtn.removeClass("pe-hidden");
  }
  private hideCopyBtn() {
    this.copyBtn.addClass("pe-hidden");
    this.insertBtn.addClass("pe-hidden");
  }

  private async copyResult() {
    if (!this.lastResult) return;
    await navigator.clipboard.writeText(this.lastResult);
    const orig = this.copyBtn.textContent;
    this.copyBtn.textContent = t("copiedBtn");
    this.copyBtn.addClass("pe-copy-btn--done");
    setTimeout(() => {
      this.copyBtn.textContent = orig;
      this.copyBtn.removeClass("pe-copy-btn--done");
    }, 1500);
  }

  private insertCallout() {
    if (!this.lastResult) return;

    // Track 1: use the view that triggered the last processText call
    let mdView: MarkdownView | null = this.lastMarkdownView;

    // Track 2: if that tab was closed or never set, fall back to any open markdown leaf
    if (!mdView || !mdView.containerEl.isConnected) {
      const leaves = this.app.workspace.getLeavesOfType("markdown");
      mdView = leaves.length > 0 ? (leaves[0].view as MarkdownView) : null;
    }

    if (!mdView) {
      new Notice(t("noticeNoNote"));
      return;
    }

    const editor = mdView.editor;
    const cursor = editor.getCursor();
    const title  = t("calloutTitle");

    const bodyLines    = this.lastResult.split("\n");
    const calloutLines = [
      `> [!abstract] 📖 ${title}`,
      ...bodyLines.map(line => (line.trim() ? `> ${line}` : ">")),
    ];
    const calloutBlock = calloutLines.join("\n");

    // Insert after the end of the current cursor line
    const lineEnd = { line: cursor.line, ch: editor.getLine(cursor.line).length };
    editor.replaceRange(`\n${calloutBlock}\n`, lineEnd);
    editor.setCursor({ line: cursor.line + calloutLines.length + 1, ch: 0 });
  }

  // ── 公共入口：校验 API Key，重置 UI，发起流式请求 ─────────────────────

  private async prepareAndStream(payload: object) {
    if (!this.plugin.settings.apiKey) {
      new Notice(t("noticeNoApiKey"));
      this.setStatus(t("statusNoApiKey"), "error");
      return;
    }

    this.currentController?.abort();
    this.currentController = new AbortController();

    this.lastResult = "";
    this.hideCopyBtn();
    this.outputEl.removeClass("pe-output--empty");
    this.outputEl.empty();
    this.setStatus(t("statusLoading1"), "loading");

    await this.streamSSE(payload, this.currentController.signal);
  }

  // ── 文字入口 ──────────────────────────────────────────────────────────────

  async processText(text: string, sourceView?: MarkdownView) {
    if (sourceView) this.lastMarkdownView = sourceView;
    if (!this.outputEl) this.buildUI();
    await this.prepareAndStream({
      system_instruction: {
        parts: [{ text: resolvePrompt(TEXT_PROMPT[this.modeState], this.plugin.settings.outputLanguage) }],
      },
      contents: [{
        role: "user",
        parts: [{ text }],
      }],
    });
  }

  // ── 截图入口 ──────────────────────────────────────────────────────────────

  async processScreenshot(base64: string) {
    if (!this.outputEl) this.buildUI();
    await this.prepareAndStream({
      contents: [{
        parts: [
          { text: resolvePrompt(IMAGE_PROMPT[this.modeState], this.plugin.settings.outputLanguage) },
          { inline_data: { mime_type: "image/jpeg", data: base64 } },
        ] as ImagePart[],
      }],
    });
  }

  // ── 剪贴板截图（备用入口） ────────────────────────────────────────────────

  async processClipboardImage() {
    let base64: string;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { clipboard } = (window as any).require("electron") as {
        clipboard: { readImage(): { isEmpty(): boolean; toJPEG(q: number): { toString(e: string): string } } };
      };
      const img = clipboard.readImage();
      if (img.isEmpty()) {
        new Notice(t("noticeNoImage"));
        return;
      }
      base64 = img.toJPEG(85).toString("base64");
    } catch (e) {
      console.error("[PaperEater] clipboard read error:", e);
      new Notice(t("noticeClipboardError"));
      return;
    }
    await this.processScreenshot(base64);
  }

  // ── 核心：Gemini SSE 流式请求 ─────────────────────────────────────────────

  private async streamSSE(payload: object, signal: AbortSignal) {
    const { apiKey } = this.plugin.settings;
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}` +
      `:streamGenerateContent?alt=sse&key=${apiKey}`;

    let streamEl: HTMLElement | null = null;
    let accumulated = "";
    let firstChunk  = true;
    let phaseTimer: ReturnType<typeof setTimeout> | null = null;

    const clearPhase = () => { if (phaseTimer) { clearTimeout(phaseTimer); phaseTimer = null; } };

    try {
      phaseTimer = setTimeout(() => this.setStatus(t("statusLoading2"), "loading"), 3000);

      const response = await fetch(url, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
        signal,
      });

      clearPhase();

      if (!response.ok) {
        const body = await response.text();
        if (response.status === 429) {
          const wait = parseInt(response.headers.get("Retry-After") ?? "60", 10) || 60;
          this.setStatus(t("statusRateLimit").replace("{wait}", String(wait)), "error");
          return;
        }
        let errMsg = `API ${response.status}`;
        try { errMsg = (JSON.parse(body) as { error?: { message?: string } }).error?.message ?? errMsg; }
        catch { /* ignore */ }
        throw new Error(errMsg);
      }

      const reader  = response.body!.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer    = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let parsed: any;
          try { parsed = JSON.parse(jsonStr); } catch { continue; }

          const chunk: string | undefined =
            parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!chunk) continue;

          if (firstChunk) {
            firstChunk = false;
            this.setStatus(t("statusLoading3"), "loading");
            this.outputEl.empty();
            streamEl = this.outputEl.createDiv({ cls: "pe-stream-text" });
          }

          accumulated += chunk;
          streamEl!.insertAdjacentText("beforeend", chunk);
          this.outputEl.scrollTop = this.outputEl.scrollHeight;
        }
      }

      if (!firstChunk && accumulated.trim()) {
        this.lastResult = accumulated.trim();
        this.outputEl.empty();
        await MarkdownRenderer.render(this.app, this.lastResult, this.outputEl, "", this);
        this.setStatus(t("statusDone"), "done");
        this.showCopyBtn();
      } else if (firstChunk) {
        this.setStatus(t("statusNoContent"), "error");
        console.error("[PaperEater] stream ended with no content");
      }

    } catch (err: unknown) {
      clearPhase();
      const e = err as Error;
      if (e.name === "AbortError") {
        if (firstChunk) this.showPlaceholder();
        else this.setStatus(t("statusAborted"), "");
        return;
      }
      console.error("[PaperEater] stream error:", e);
      this.setStatus(t("statusError") + e.message, "error");
      if (firstChunk) {
        this.outputEl.empty();
        this.outputEl.createDiv({ cls: "pe-error-box", text: `⚠️ ${e.message}` });
      }
    } finally {
      clearPhase();
      this.currentController = null;
    }
  }
}
