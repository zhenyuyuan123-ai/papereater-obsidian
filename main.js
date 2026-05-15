"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PaperEaterPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// view.ts
var import_obsidian = require("obsidian");

// i18n.ts
var SUPPORTED = ["zh", "en", "de", "es", "fr", "ja", "ko", "pt", "ru", "ar"];
function detectLang() {
  var _a;
  const raw = ((_a = window.localStorage.getItem("language")) != null ? _a : "en").toLowerCase();
  const code = raw.startsWith("zh") ? "zh" : raw.slice(0, 2);
  return SUPPORTED.includes(code) ? code : "en";
}
var DICT = {
  zh: {
    appName: "\u98DF\u5377\u517D",
    modeStandard: "\u7CBE\u51C6",
    modeDeep: "\u767D\u8BDD\u6587",
    placeholderTitle: "\u5982\u4F55\u89E6\u53D1\u98DF\u5377\u517D\uFF1F",
    placeholderKey: "Option / Alt",
    placeholderAction: "\u9F20\u6807\u62D6\u62FD\u9009\u4E2D",
    placeholderTip: "\u6838\u5FC3\u73A9\u6CD5",
    placeholderDesc: "\u6309\u4F4F\u952E\u76D8\u4E0A\u7684 Option / Alt \u952E\uFF0C\u540C\u65F6\u7528\u9F20\u6807\u5728\u5DE6\u4FA7\u7B14\u8BB0\u4E2D\u300C\u62D6\u62FD\u5212\u9009\u300D\u4EFB\u610F\u6BB5\u843D\uFF0C\u98DF\u5377\u517D\u5C06\u5728\u6B64\u5904\u81EA\u52A8\u4E3A\u60A8\u62C6\u89E3\u3002",
    placeholderSubHint: "\u6216\u9009\u4E2D\u6587\u5B57\u540E\u4F7F\u7528 Cmd/Ctrl + P \u641C\u7D22\u300C\u98DF\u5377\u517D\u300D",
    copyBtn: "\u590D\u5236",
    copiedBtn: "\u5DF2\u590D\u5236 \u2713",
    screenshotBtnTitle: "\u622A\u53D6\u5F53\u524D\u7B14\u8BB0\u753B\u9762\uFF08\u6216\u6309\u4F4F Alt \u62D6\u52A8\u6846\u9009\u4EFB\u610F\u533A\u57DF\uFF09",
    ribbonTitle: "\u98DF\u5377\u517D",
    viewfinderHint: "\u62D6\u52A8\u9F20\u6807\u6846\u9009\u533A\u57DF",
    cmdRewrite: "\u98DF\u5377\u517D\uFF1A\u91CD\u5199\u9009\u4E2D\u6587\u6BB5",
    cmdCapture: "\u98DF\u5377\u517D\uFF1A\u622A\u53D6\u5F53\u524D\u7B14\u8BB0\u753B\u9762\u5E76\u89E3\u8BFB",
    statusLoading1: "\u6B63\u5728\u541E\u54BD\u2026",
    statusLoading2: "\u6B63\u5728\u6D88\u5316\u2026",
    statusLoading3: "\u6B63\u5728\u56DE\u520D\u2026",
    statusDone: "\u5B8C\u6210",
    statusAborted: "\u5DF2\u4E2D\u6B62",
    statusNoApiKey: "\u672A\u914D\u7F6E API Key",
    statusError: "\u9519\u8BEF\uFF1A",
    statusNoContent: "\u672A\u6536\u5230\u4EFB\u4F55\u5185\u5BB9\uFF0C\u8BF7\u68C0\u67E5 API Key \u6216\u7F51\u7EDC",
    statusRateLimit: "\u89E6\u53D1\u9650\u901F\uFF0C\u8BF7 {wait} \u79D2\u540E\u91CD\u8BD5",
    noticeNoText: "\u8BF7\u5148\u9009\u4E2D\u8981\u91CD\u5199\u7684\u6587\u6BB5",
    noticeNoApiKey: "\u8BF7\u5148\u5728\u8BBE\u7F6E\u9875\u586B\u5199 Gemini API Key\uFF08\u8BBE\u7F6E \u2192 \u98DF\u5377\u517D\uFF09",
    noticeNoNote: "\u627E\u4E0D\u5230\u7B14\u8BB0\u7F16\u8F91\u533A\uFF0C\u8BF7\u5148\u6253\u5F00\u4E00\u7BC7\u7B14\u8BB0",
    noticeCaptureError: "\u622A\u56FE\u5931\u8D25\uFF1A",
    noticeNoImage: "\u526A\u8D34\u677F\u4E2D\u6CA1\u6709\u56FE\u7247\n\u8BF7\u5148\u7528 Cmd+Ctrl+Shift+4 \u622A\u56FE\u5230\u526A\u8D34\u677F",
    noticeClipboardError: "\u65E0\u6CD5\u8BFB\u53D6\u526A\u8D34\u677F",
    settingsTitle: "\u98DF\u5377\u517D",
    settingsApiKeyName: "Gemini API Key",
    settingsApiKeyDesc: "\u4ECE Google AI Studio \u83B7\u53D6\uFF1Aaistudio.google.com/app/apikey",
    settingsModeName: "\u9ED8\u8BA4\u6A21\u5F0F",
    settingsModeDesc: "\u7CBE\u51C6\uFF1A\u4FE1\u8FBE\u96C5\u6539\u5199  \xB7  \u767D\u8BDD\u6587\uFF1A\u76F4\u89C9\u62C6\u89E3\u5E95\u5C42\u903B\u8F91",
    settingsModeOptStandard: "\u7CBE\u51C6",
    settingsModeOptDeep: "\u767D\u8BDD\u6587",
    settingsShortcutHint: "\u622A\u56FE\u5FEB\u6377\u952E\uFF1A\u6309\u4F4F Alt/Option + \u62D6\u52A8\u9F20\u6807\u6846\u9009\u4EFB\u610F\u533A\u57DF",
    settingOutputLangTitle: "\u76EE\u6807\u8F93\u51FA\u8BED\u8A00",
    settingOutputLangDesc: "Gemini \u767D\u8BDD\u6587\u7684\u8F93\u51FA\u8BED\u8A00\u3002'\u81EA\u52A8'\u65F6\u8DDF\u968F Obsidian \u754C\u9762\u8BED\u8A00\u3002",
    settingOutputLangAuto: "\u81EA\u52A8\uFF08\u8DDF\u968F\u7CFB\u7EDF\uFF09",
    settingUiLangTitle: "\u754C\u9762\u8BED\u8A00",
    settingUiLangDesc: "\u624B\u52A8\u8986\u76D6\u63D2\u4EF6\u754C\u9762\u8BED\u8A00\u3002\u9009 Auto \u65F6\u8DDF\u968F Obsidian \u7CFB\u7EDF\u8BED\u8A00\uFF0C\u4FEE\u6539\u540E\u754C\u9762\u7ACB\u5373\u5237\u65B0\u3002",
    settingUiLangAuto: "\u81EA\u52A8\uFF08\u8DDF\u968F Obsidian\uFF09",
    calloutTitle: "\u98DF\u5377\u517D\u89E3\u6784",
    insertBtn: "\u63D2\u5165\u7B14\u8BB0",
    targetLanguageName: "\u7B80\u4F53\u4E2D\u6587"
  },
  en: {
    appName: "PaperEater",
    modeStandard: "Precise",
    modeDeep: "Plain",
    placeholderTitle: "How to use PaperEater?",
    placeholderKey: "Option / Alt",
    placeholderAction: "drag to select",
    placeholderTip: "How it works",
    placeholderDesc: "Hold Option / Alt on your keyboard, then drag-select any passage in the note on the left. PaperEater will instantly deconstruct it here.",
    placeholderSubHint: 'Or select text and use Cmd/Ctrl + P \u2192 "PaperEater"',
    copyBtn: "Copy",
    copiedBtn: "Copied \u2713",
    screenshotBtnTitle: "Capture current note (or hold Alt + drag to select any area)",
    ribbonTitle: "PaperEater",
    viewfinderHint: "Drag to select area",
    cmdRewrite: "PaperEater: Rewrite selection",
    cmdCapture: "PaperEater: Capture & analyze note",
    statusLoading1: "Processing\u2026",
    statusLoading2: "Analyzing\u2026",
    statusLoading3: "Generating\u2026",
    statusDone: "Done",
    statusAborted: "Aborted",
    statusNoApiKey: "API Key not configured",
    statusError: "Error: ",
    statusNoContent: "No content received. Check your API Key or network.",
    statusRateLimit: "Rate limited. Retry in {wait}s.",
    noticeNoText: "Please select text first.",
    noticeNoApiKey: "Set your Gemini API Key in Settings \u2192 PaperEater.",
    noticeNoNote: "No active note found. Please open a note first.",
    noticeCaptureError: "Screenshot failed: ",
    noticeNoImage: "No image in clipboard.\nUse Cmd+Ctrl+Shift+4 to capture first.",
    noticeClipboardError: "Cannot read clipboard.",
    settingsTitle: "PaperEater",
    settingsApiKeyName: "Gemini API Key",
    settingsApiKeyDesc: "Get yours at: aistudio.google.com/app/apikey",
    settingsModeName: "Default Mode",
    settingsModeDesc: "Precise: faithful rewrite  \xB7  Plain: intuitive deconstruction",
    settingsModeOptStandard: "Precise",
    settingsModeOptDeep: "Plain",
    settingsShortcutHint: "Screenshot: hold Alt/Option + drag to select any area",
    settingOutputLangTitle: "Output Language",
    settingOutputLangDesc: "Language Gemini writes in. 'Auto' follows your Obsidian UI language.",
    settingOutputLangAuto: "Auto (follow system)",
    settingUiLangTitle: "UI Language",
    settingUiLangDesc: "Override the plugin UI language. Auto follows Obsidian system language. Interface refreshes immediately on change.",
    settingUiLangAuto: "Auto (Follow Obsidian)",
    calloutTitle: "PaperEater Deconstruction",
    insertBtn: "Insert",
    targetLanguageName: "English"
  },
  de: {
    appName: "PaperEater",
    modeStandard: "Pr\xE4zise",
    modeDeep: "Klartext",
    placeholderTitle: "Wie nutze ich PaperEater?",
    placeholderKey: "Option / Alt",
    placeholderAction: "Maus ziehen zum Ausw\xE4hlen",
    placeholderTip: "So funktioniert es",
    placeholderDesc: "Halte Option / Alt gedr\xFCckt und ziehe mit der Maus einen Textabschnitt in der Notiz links aus. PaperEater zerlegt ihn sofort hier.",
    placeholderSubHint: 'Oder Text markieren und Cmd/Ctrl + P \u2192 "PaperEater"',
    copyBtn: "Kopieren",
    copiedBtn: "Kopiert \u2713",
    screenshotBtnTitle: "Aktuelle Notiz aufnehmen (oder Alt halten + Ziehen f\xFCr Bereich)",
    ribbonTitle: "PaperEater",
    viewfinderHint: "Ziehen zum Ausw\xE4hlen",
    cmdRewrite: "PaperEater: Auswahl umschreiben",
    cmdCapture: "PaperEater: Notizbereich aufnehmen",
    statusLoading1: "Verarbeite\u2026",
    statusLoading2: "Analysiere\u2026",
    statusLoading3: "Generiere\u2026",
    statusDone: "Fertig",
    statusAborted: "Abgebrochen",
    statusNoApiKey: "API-Schl\xFCssel nicht konfiguriert",
    statusError: "Fehler: ",
    statusNoContent: "Kein Inhalt erhalten. API-Schl\xFCssel oder Netzwerk pr\xFCfen.",
    statusRateLimit: "Ratenlimit. Bitte in {wait}s erneut versuchen.",
    noticeNoText: "Bitte zuerst Text ausw\xE4hlen.",
    noticeNoApiKey: "Gemini API-Schl\xFCssel in Einstellungen \u2192 PaperEater eingeben.",
    noticeNoNote: "Keine aktive Notiz. Bitte zuerst eine Notiz \xF6ffnen.",
    noticeCaptureError: "Screenshot fehlgeschlagen: ",
    noticeNoImage: "Kein Bild in der Zwischenablage.",
    noticeClipboardError: "Zwischenablage kann nicht gelesen werden.",
    settingsTitle: "PaperEater",
    settingsApiKeyName: "Gemini API-Schl\xFCssel",
    settingsApiKeyDesc: "Erh\xE4ltlich unter: aistudio.google.com/app/apikey",
    settingsModeName: "Standardmodus",
    settingsModeDesc: "Pr\xE4zise: treue Umschreibung  \xB7  Klartext: intuitive Zerlegung",
    settingsModeOptStandard: "Pr\xE4zise",
    settingsModeOptDeep: "Klartext",
    settingsShortcutHint: "Screenshot: Alt/Option halten + Ziehen f\xFCr Bereich",
    settingOutputLangTitle: "Ausgabesprache",
    settingOutputLangDesc: "Sprache, in der Gemini schreibt. 'Auto' folgt der Obsidian-UI-Sprache.",
    settingOutputLangAuto: "Auto (System folgen)",
    settingUiLangTitle: "UI-Sprache",
    settingUiLangDesc: "Sprache der Plugin-Oberfl\xE4che manuell festlegen. Auto folgt der Obsidian-Systemsprache. Die Oberfl\xE4che wird sofort aktualisiert.",
    settingUiLangAuto: "Auto (Obsidian folgen)",
    calloutTitle: "PaperEater Dekonstruktion",
    insertBtn: "Einf\xFCgen",
    targetLanguageName: "Deutsch"
  },
  es: {
    appName: "PaperEater",
    modeStandard: "Preciso",
    modeDeep: "Claro",
    placeholderTitle: "\xBFC\xF3mo usar PaperEater?",
    placeholderKey: "Option / Alt",
    placeholderAction: "arrastrar para seleccionar",
    placeholderTip: "C\xF3mo funciona",
    placeholderDesc: "Mant\xE9n presionado Option / Alt y arrastra el rat\xF3n para seleccionar cualquier p\xE1rrafo en la nota de la izquierda. PaperEater lo deconstruir\xE1 aqu\xED al instante.",
    placeholderSubHint: 'O selecciona texto y usa Cmd/Ctrl + P \u2192 "PaperEater"',
    copyBtn: "Copiar",
    copiedBtn: "Copiado \u2713",
    screenshotBtnTitle: "Capturar nota actual (o mantener Alt + arrastrar para seleccionar)",
    ribbonTitle: "PaperEater",
    viewfinderHint: "Arrastra para seleccionar",
    cmdRewrite: "PaperEater: Reescribir selecci\xF3n",
    cmdCapture: "PaperEater: Capturar nota actual",
    statusLoading1: "Procesando\u2026",
    statusLoading2: "Analizando\u2026",
    statusLoading3: "Generando\u2026",
    statusDone: "Listo",
    statusAborted: "Cancelado",
    statusNoApiKey: "Clave de API no configurada",
    statusError: "Error: ",
    statusNoContent: "No se recibi\xF3 contenido. Verifica tu clave de API o red.",
    statusRateLimit: "L\xEDmite de velocidad. Reintenta en {wait}s.",
    noticeNoText: "Por favor selecciona texto primero.",
    noticeNoApiKey: "Configura tu clave API Gemini en Ajustes \u2192 PaperEater.",
    noticeNoNote: "No hay nota activa. Por favor abre una nota primero.",
    noticeCaptureError: "Error en captura: ",
    noticeNoImage: "No hay imagen en el portapapeles.",
    noticeClipboardError: "No se puede leer el portapapeles.",
    settingsTitle: "PaperEater",
    settingsApiKeyName: "Clave de API Gemini",
    settingsApiKeyDesc: "Obt\xE9n la tuya en: aistudio.google.com/app/apikey",
    settingsModeName: "Modo predeterminado",
    settingsModeDesc: "Preciso: reescritura fiel  \xB7  Claro: deconstrucci\xF3n intuitiva",
    settingsModeOptStandard: "Preciso",
    settingsModeOptDeep: "Claro",
    settingsShortcutHint: "Captura: mantener Alt/Option + arrastrar para seleccionar",
    settingOutputLangTitle: "Idioma de salida",
    settingOutputLangDesc: 'Idioma en el que escribe Gemini. "Auto" sigue el idioma de la interfaz de Obsidian.',
    settingOutputLangAuto: "Auto (seguir sistema)",
    settingUiLangTitle: "Idioma de la interfaz",
    settingUiLangDesc: "Anular el idioma de la interfaz del plugin. Auto sigue el idioma del sistema de Obsidian. La interfaz se actualiza inmediatamente.",
    settingUiLangAuto: "Auto (seguir Obsidian)",
    calloutTitle: "PaperEater Deconstrucci\xF3n",
    insertBtn: "Insertar",
    targetLanguageName: "Espa\xF1ol"
  },
  fr: {
    appName: "PaperEater",
    modeStandard: "Pr\xE9cis",
    modeDeep: "Clair",
    placeholderTitle: "Comment utiliser PaperEater ?",
    placeholderKey: "Option / Alt",
    placeholderAction: "glisser pour s\xE9lectionner",
    placeholderTip: "Comment \xE7a marche",
    placeholderDesc: "Maintenez Option / Alt enfonc\xE9 et glissez la souris pour s\xE9lectionner un passage dans la note \xE0 gauche. PaperEater le d\xE9construira instantan\xE9ment ici.",
    placeholderSubHint: 'Ou s\xE9lectionnez du texte et utilisez Cmd/Ctrl + P \u2192 "PaperEater"',
    copyBtn: "Copier",
    copiedBtn: "Copi\xE9 \u2713",
    screenshotBtnTitle: "Capturer la note (ou maintenir Alt + glisser pour s\xE9lectionner)",
    ribbonTitle: "PaperEater",
    viewfinderHint: "Glisser pour s\xE9lectionner",
    cmdRewrite: "PaperEater : R\xE9\xE9crire la s\xE9lection",
    cmdCapture: "PaperEater : Capturer la note actuelle",
    statusLoading1: "Traitement\u2026",
    statusLoading2: "Analyse\u2026",
    statusLoading3: "G\xE9n\xE9ration\u2026",
    statusDone: "Termin\xE9",
    statusAborted: "Annul\xE9",
    statusNoApiKey: "Cl\xE9 API non configur\xE9e",
    statusError: "Erreur : ",
    statusNoContent: "Aucun contenu re\xE7u. V\xE9rifiez votre cl\xE9 API ou r\xE9seau.",
    statusRateLimit: "Limite de d\xE9bit. R\xE9essayez dans {wait}s.",
    noticeNoText: "Veuillez d'abord s\xE9lectionner du texte.",
    noticeNoApiKey: "Configurez votre cl\xE9 API Gemini dans Param\xE8tres \u2192 PaperEater.",
    noticeNoNote: "Aucune note active. Veuillez d'abord ouvrir une note.",
    noticeCaptureError: "Capture \xE9chou\xE9e : ",
    noticeNoImage: "Pas d'image dans le presse-papiers.",
    noticeClipboardError: "Impossible de lire le presse-papiers.",
    settingsTitle: "PaperEater",
    settingsApiKeyName: "Cl\xE9 API Gemini",
    settingsApiKeyDesc: "Obtenez la v\xF4tre sur : aistudio.google.com/app/apikey",
    settingsModeName: "Mode par d\xE9faut",
    settingsModeDesc: "Pr\xE9cis : r\xE9\xE9criture fid\xE8le  \xB7  Clair : d\xE9construction intuitive",
    settingsModeOptStandard: "Pr\xE9cis",
    settingsModeOptDeep: "Clair",
    settingsShortcutHint: "Capture : maintenir Alt/Option + glisser pour s\xE9lectionner",
    settingOutputLangTitle: "Langue de sortie",
    settingOutputLangDesc: "Langue dans laquelle Gemini \xE9crit. \xAB Auto \xBB suit la langue de l'interface Obsidian.",
    settingOutputLangAuto: "Auto (suivre le syst\xE8me)",
    settingUiLangTitle: "Langue de l'interface",
    settingUiLangDesc: "Remplacer la langue de l'interface du plugin. Auto suit la langue systeme d'Obsidian. L'interface se met a jour immediatement.",
    settingUiLangAuto: "Auto (suivre Obsidian)",
    calloutTitle: "PaperEater D\xE9construction",
    insertBtn: "Ins\xE9rer",
    targetLanguageName: "Fran\xE7ais"
  },
  ja: {
    appName: "PaperEater",
    modeStandard: "\u7CBE\u5BC6",
    modeDeep: "\u304B\u307F\u7815\u304D",
    placeholderTitle: "PaperEater\u306E\u4F7F\u3044\u65B9",
    placeholderKey: "Option / Alt",
    placeholderAction: "\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u9078\u629E",
    placeholderTip: "\u4F7F\u3044\u65B9",
    placeholderDesc: "Option / Alt \u3092\u62BC\u3057\u306A\u304C\u3089\u3001\u5DE6\u5074\u306E\u30CE\u30FC\u30C8\u3067\u4EFB\u610F\u306E\u6BB5\u843D\u3092\u30DE\u30A6\u30B9\u3067\u30C9\u30E9\u30C3\u30B0\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002PaperEater \u304C\u3053\u3053\u3067\u5373\u5EA7\u306B\u5206\u89E3\u3057\u307E\u3059\u3002",
    placeholderSubHint: '\u307E\u305F\u306F\u30C6\u30AD\u30B9\u30C8\u3092\u9078\u629E\u3057\u3066 Cmd/Ctrl + P \u2192 "PaperEater"',
    copyBtn: "\u30B3\u30D4\u30FC",
    copiedBtn: "\u30B3\u30D4\u30FC\u6E08 \u2713",
    screenshotBtnTitle: "\u73FE\u5728\u306E\u30CE\u30FC\u30C8\u3092\u30AD\u30E3\u30D7\u30C1\u30E3\uFF08Alt \u3092\u62BC\u3057\u306A\u304C\u3089\u30C9\u30E9\u30C3\u30B0\u3067\u7BC4\u56F2\u9078\u629E\uFF09",
    ribbonTitle: "PaperEater",
    viewfinderHint: "\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u7BC4\u56F2\u9078\u629E",
    cmdRewrite: "PaperEater\uFF1A\u9078\u629E\u7BC4\u56F2\u3092\u66F8\u304D\u63DB\u3048",
    cmdCapture: "PaperEater\uFF1A\u73FE\u5728\u306E\u30CE\u30FC\u30C8\u3092\u30AD\u30E3\u30D7\u30C1\u30E3\u3057\u3066\u89E3\u8AAD",
    statusLoading1: "\u51E6\u7406\u4E2D\u2026",
    statusLoading2: "\u5206\u6790\u4E2D\u2026",
    statusLoading3: "\u751F\u6210\u4E2D\u2026",
    statusDone: "\u5B8C\u4E86",
    statusAborted: "\u4E2D\u6B62",
    statusNoApiKey: "API\u30AD\u30FC\u672A\u8A2D\u5B9A",
    statusError: "\u30A8\u30E9\u30FC\uFF1A",
    statusNoContent: "\u30B3\u30F3\u30C6\u30F3\u30C4\u304C\u53D7\u4FE1\u3055\u308C\u307E\u305B\u3093\u3067\u3057\u305F\u3002API\u30AD\u30FC\u307E\u305F\u306F\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
    statusRateLimit: "\u30EC\u30FC\u30C8\u5236\u9650\u3002{wait}\u79D2\u5F8C\u306B\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
    noticeNoText: "\u30C6\u30AD\u30B9\u30C8\u3092\u5148\u306B\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
    noticeNoApiKey: "\u8A2D\u5B9A \u2192 PaperEater \u3067 Gemini API\u30AD\u30FC\u3092\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
    noticeNoNote: "\u30A2\u30AF\u30C6\u30A3\u30D6\u306A\u30CE\u30FC\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u5148\u306B\u30CE\u30FC\u30C8\u3092\u958B\u3044\u3066\u304F\u3060\u3055\u3044\u3002",
    noticeCaptureError: "\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8\u5931\u6557\uFF1A",
    noticeNoImage: "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u753B\u50CF\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
    noticeClipboardError: "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u3092\u8AAD\u307F\u53D6\u308C\u307E\u305B\u3093\u3002",
    settingsTitle: "PaperEater",
    settingsApiKeyName: "Gemini API\u30AD\u30FC",
    settingsApiKeyDesc: "\u53D6\u5F97\u5148\uFF1Aaistudio.google.com/app/apikey",
    settingsModeName: "\u30C7\u30D5\u30A9\u30EB\u30C8\u30E2\u30FC\u30C9",
    settingsModeDesc: "\u7CBE\u5BC6\uFF1A\u5FE0\u5B9F\u306A\u66F8\u304D\u63DB\u3048  \xB7  \u304B\u307F\u7815\u304D\uFF1A\u76F4\u611F\u7684\u306A\u5206\u89E3",
    settingsModeOptStandard: "\u7CBE\u5BC6",
    settingsModeOptDeep: "\u304B\u307F\u7815\u304D",
    settingsShortcutHint: "\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8\uFF1AAlt/Option \u3092\u62BC\u3057\u306A\u304C\u3089\u30C9\u30E9\u30C3\u30B0",
    settingOutputLangTitle: "\u51FA\u529B\u8A00\u8A9E",
    settingOutputLangDesc: "Gemini \u304C\u66F8\u304F\u8A00\u8A9E\u3002\u300C\u81EA\u52D5\u300D\u306F Obsidian \u306E UI \u8A00\u8A9E\u306B\u5F93\u3044\u307E\u3059\u3002",
    settingOutputLangAuto: "\u81EA\u52D5\uFF08\u30B7\u30B9\u30C6\u30E0\u306B\u5F93\u3046\uFF09",
    settingUiLangTitle: "UI \u8A00\u8A9E",
    settingUiLangDesc: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E UI \u8A00\u8A9E\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059\u3002Auto \u306F Obsidian \u306E\u30B7\u30B9\u30C6\u30E0\u8A00\u8A9E\u306B\u5F93\u3044\u307E\u3059\u3002\u5909\u66F4\u5F8C\u3059\u3050\u306B\u53CD\u6620\u3055\u308C\u307E\u3059\u3002",
    settingUiLangAuto: "\u81EA\u52D5\uFF08Obsidian \u306B\u5F93\u3046\uFF09",
    calloutTitle: "PaperEater \u5206\u89E3",
    insertBtn: "\u633F\u5165",
    targetLanguageName: "\u65E5\u672C\u8A9E"
  },
  ko: {
    appName: "PaperEater",
    modeStandard: "\uC815\uBC00",
    modeDeep: "\uC26C\uC6B4 \uB9D0",
    placeholderTitle: "PaperEater \uC0AC\uC6A9\uBC95",
    placeholderKey: "Option / Alt",
    placeholderAction: "\uB4DC\uB798\uADF8\uD558\uC5EC \uC120\uD0DD",
    placeholderTip: "\uC0AC\uC6A9 \uBC29\uBC95",
    placeholderDesc: "Option / Alt \uD0A4\uB97C \uB204\uB978 \uCC44\uB85C \uC67C\uCABD \uB178\uD2B8\uC5D0\uC11C \uC6D0\uD558\uB294 \uB2E8\uB77D\uC744 \uB9C8\uC6B0\uC2A4\uB85C \uB4DC\uB798\uADF8\uD558\uC5EC \uC120\uD0DD\uD558\uC138\uC694. PaperEater\uAC00 \uC989\uC2DC \uC5EC\uAE30\uC5D0\uC11C \uBD84\uD574\uD569\uB2C8\uB2E4.",
    placeholderSubHint: '\uB610\uB294 \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD558\uACE0 Cmd/Ctrl + P \u2192 "PaperEater"',
    copyBtn: "\uBCF5\uC0AC",
    copiedBtn: "\uBCF5\uC0AC\uB428 \u2713",
    screenshotBtnTitle: "\uD604\uC7AC \uB178\uD2B8 \uCEA1\uCC98 (Alt \uB204\uB978 \uCC44 \uB4DC\uB798\uADF8\uB85C \uC601\uC5ED \uC120\uD0DD)",
    ribbonTitle: "PaperEater",
    viewfinderHint: "\uB4DC\uB798\uADF8\uD558\uC5EC \uC120\uD0DD",
    cmdRewrite: "PaperEater: \uC120\uD0DD \uC601\uC5ED \uB2E4\uC2DC \uC4F0\uAE30",
    cmdCapture: "PaperEater: \uD604\uC7AC \uB178\uD2B8 \uCEA1\uCC98 \uBC0F \uBD84\uC11D",
    statusLoading1: "\uCC98\uB9AC \uC911\u2026",
    statusLoading2: "\uBD84\uC11D \uC911\u2026",
    statusLoading3: "\uC0DD\uC131 \uC911\u2026",
    statusDone: "\uC644\uB8CC",
    statusAborted: "\uC911\uB2E8\uB428",
    statusNoApiKey: "API \uD0A4 \uBBF8\uC124\uC815",
    statusError: "\uC624\uB958: ",
    statusNoContent: "\uCF58\uD150\uCE20\uB97C \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. API \uD0A4 \uB610\uB294 \uB124\uD2B8\uC6CC\uD06C\uB97C \uD655\uC778\uD558\uC138\uC694.",
    statusRateLimit: "\uC18D\uB3C4 \uC81C\uD55C. {wait}\uCD08 \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694.",
    noticeNoText: "\uBA3C\uC800 \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD558\uC138\uC694.",
    noticeNoApiKey: "\uC124\uC815 \u2192 PaperEater\uC5D0\uC11C Gemini API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.",
    noticeNoNote: "\uD65C\uC131 \uB178\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uBA3C\uC800 \uB178\uD2B8\uB97C \uC5F4\uC5B4\uC8FC\uC138\uC694.",
    noticeCaptureError: "\uC2A4\uD06C\uB9B0\uC0F7 \uC2E4\uD328: ",
    noticeNoImage: "\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uC774\uBBF8\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
    noticeClipboardError: "\uD074\uB9BD\uBCF4\uB4DC\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
    settingsTitle: "PaperEater",
    settingsApiKeyName: "Gemini API \uD0A4",
    settingsApiKeyDesc: "\uD0A4 \uBC1C\uAE09: aistudio.google.com/app/apikey",
    settingsModeName: "\uAE30\uBCF8 \uBAA8\uB4DC",
    settingsModeDesc: "\uC815\uBC00: \uCDA9\uC2E4\uD55C \uC7AC\uC791\uC131  \xB7  \uC26C\uC6B4 \uB9D0: \uC9C1\uAD00\uC801 \uBD84\uD574",
    settingsModeOptStandard: "\uC815\uBC00",
    settingsModeOptDeep: "\uC26C\uC6B4 \uB9D0",
    settingsShortcutHint: "\uC2A4\uD06C\uB9B0\uC0F7: Alt/Option \uB204\uB978 \uCC44 \uB4DC\uB798\uADF8",
    settingOutputLangTitle: "\uCD9C\uB825 \uC5B8\uC5B4",
    settingOutputLangDesc: "Gemini\uAC00 \uC791\uC131\uD558\uB294 \uC5B8\uC5B4\uC785\uB2C8\uB2E4. '\uC790\uB3D9'\uC740 Obsidian UI \uC5B8\uC5B4\uB97C \uB530\uB985\uB2C8\uB2E4.",
    settingOutputLangAuto: "\uC790\uB3D9 (\uC2DC\uC2A4\uD15C \uB530\uB984)",
    settingUiLangTitle: "UI \uC5B8\uC5B4",
    settingUiLangDesc: "\uD50C\uB7EC\uADF8\uC778 UI \uC5B8\uC5B4\uB97C \uC7AC\uC815\uC758\uD569\uB2C8\uB2E4. Auto\uB294 Obsidian \uC2DC\uC2A4\uD15C \uC5B8\uC5B4\uB97C \uB530\uB985\uB2C8\uB2E4. \uBCC0\uACBD \uC989\uC2DC \uC801\uC6A9\uB429\uB2C8\uB2E4.",
    settingUiLangAuto: "\uC790\uB3D9 (Obsidian \uB530\uB984)",
    calloutTitle: "PaperEater \uBD84\uD574",
    insertBtn: "\uC0BD\uC785",
    targetLanguageName: "\uD55C\uAD6D\uC5B4"
  },
  pt: {
    appName: "PaperEater",
    modeStandard: "Preciso",
    modeDeep: "Simples",
    placeholderTitle: "Como usar o PaperEater?",
    placeholderKey: "Option / Alt",
    placeholderAction: "arrastar para selecionar",
    placeholderTip: "Como funciona",
    placeholderDesc: "Mantenha Option / Alt pressionado e arraste o mouse para selecionar qualquer trecho na nota \xE0 esquerda. O PaperEater o desconstruir\xE1 instantaneamente aqui.",
    placeholderSubHint: 'Ou selecione texto e use Cmd/Ctrl + P \u2192 "PaperEater"',
    copyBtn: "Copiar",
    copiedBtn: "Copiado \u2713",
    screenshotBtnTitle: "Capturar nota atual (ou manter Alt + arrastar para selecionar)",
    ribbonTitle: "PaperEater",
    viewfinderHint: "Arraste para selecionar",
    cmdRewrite: "PaperEater: Reescrever sele\xE7\xE3o",
    cmdCapture: "PaperEater: Capturar nota atual",
    statusLoading1: "Processando\u2026",
    statusLoading2: "Analisando\u2026",
    statusLoading3: "Gerando\u2026",
    statusDone: "Conclu\xEDdo",
    statusAborted: "Cancelado",
    statusNoApiKey: "Chave de API n\xE3o configurada",
    statusError: "Erro: ",
    statusNoContent: "Nenhum conte\xFAdo recebido. Verifique sua chave de API ou rede.",
    statusRateLimit: "Limite de taxa. Tente novamente em {wait}s.",
    noticeNoText: "Por favor, selecione o texto primeiro.",
    noticeNoApiKey: "Configure sua chave de API Gemini em Configura\xE7\xF5es \u2192 PaperEater.",
    noticeNoNote: "Nenhuma nota ativa. Por favor, abra uma nota primeiro.",
    noticeCaptureError: "Falha na captura: ",
    noticeNoImage: "Nenhuma imagem na \xE1rea de transfer\xEAncia.",
    noticeClipboardError: "N\xE3o \xE9 poss\xEDvel ler a \xE1rea de transfer\xEAncia.",
    settingsTitle: "PaperEater",
    settingsApiKeyName: "Chave de API Gemini",
    settingsApiKeyDesc: "Obtenha em: aistudio.google.com/app/apikey",
    settingsModeName: "Modo padr\xE3o",
    settingsModeDesc: "Preciso: reescrita fiel  \xB7  Simples: desconstru\xE7\xE3o intuitiva",
    settingsModeOptStandard: "Preciso",
    settingsModeOptDeep: "Simples",
    settingsShortcutHint: "Captura: manter Alt/Option + arrastar para selecionar",
    settingOutputLangTitle: "Idioma de sa\xEDda",
    settingOutputLangDesc: 'Idioma em que o Gemini escreve. "Auto" segue o idioma da interface do Obsidian.',
    settingOutputLangAuto: "Auto (seguir sistema)",
    settingUiLangTitle: "Idioma da interface",
    settingUiLangDesc: "Substituir o idioma da interface do plugin. Auto segue o idioma do sistema Obsidian. A interface e atualizada imediatamente.",
    settingUiLangAuto: "Auto (seguir Obsidian)",
    calloutTitle: "PaperEater Desconstru\xE7\xE3o",
    insertBtn: "Inserir",
    targetLanguageName: "Portugu\xEAs"
  },
  ru: {
    appName: "PaperEater",
    modeStandard: "\u0422\u043E\u0447\u043D\u044B\u0439",
    modeDeep: "\u041F\u0440\u043E\u0441\u0442\u043E\u0439",
    placeholderTitle: "\u041A\u0430\u043A \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C PaperEater?",
    placeholderKey: "Option / Alt",
    placeholderAction: "\u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u044C \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430",
    placeholderTip: "\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442",
    placeholderDesc: "\u0423\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439\u0442\u0435 Option / Alt \u0438 \u0432\u044B\u0434\u0435\u043B\u0438\u0442\u0435 \u043C\u044B\u0448\u044C\u044E \u043B\u044E\u0431\u043E\u0439 \u0430\u0431\u0437\u0430\u0446 \u0432 \u0437\u0430\u043C\u0435\u0442\u043A\u0435 \u0441\u043B\u0435\u0432\u0430. PaperEater \u043C\u0433\u043D\u043E\u0432\u0435\u043D\u043D\u043E \u0440\u0430\u0437\u0431\u0435\u0440\u0451\u0442 \u0435\u0433\u043E \u0437\u0434\u0435\u0441\u044C.",
    placeholderSubHint: '\u0418\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 Cmd/Ctrl + P \u2192 "PaperEater"',
    copyBtn: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
    copiedBtn: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u2713",
    screenshotBtnTitle: "\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443 (\u0438\u043B\u0438 \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C Alt + \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u044C \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430)",
    ribbonTitle: "PaperEater",
    viewfinderHint: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
    cmdRewrite: "PaperEater: \u041F\u0435\u0440\u0435\u043F\u0438\u0441\u0430\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435",
    cmdCapture: "PaperEater: \u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443",
    statusLoading1: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430\u2026",
    statusLoading2: "\u0410\u043D\u0430\u043B\u0438\u0437\u2026",
    statusLoading3: "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F\u2026",
    statusDone: "\u0413\u043E\u0442\u043E\u0432\u043E",
    statusAborted: "\u041F\u0440\u0435\u0440\u0432\u0430\u043D\u043E",
    statusNoApiKey: "\u041A\u043B\u044E\u0447 API \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D",
    statusError: "\u041E\u0448\u0438\u0431\u043A\u0430: ",
    statusNoContent: "\u041A\u043E\u043D\u0442\u0435\u043D\u0442 \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043A\u043B\u044E\u0447 API \u0438\u043B\u0438 \u0441\u0435\u0442\u044C.",
    statusRateLimit: "\u041B\u0438\u043C\u0438\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 {wait}\u0441.",
    noticeNoText: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442.",
    noticeNoApiKey: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043A\u043B\u044E\u0447 API Gemini \u0432 \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u2192 PaperEater.",
    noticeNoNote: "\u0410\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0443.",
    noticeCaptureError: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043D\u0438\u043C\u043A\u0430 \u044D\u043A\u0440\u0430\u043D\u0430: ",
    noticeNoImage: "\u0412 \u0431\u0443\u0444\u0435\u0440\u0435 \u043E\u0431\u043C\u0435\u043D\u0430 \u043D\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F.",
    noticeClipboardError: "\u041D\u0435 \u0443\u0434\u0430\u0451\u0442\u0441\u044F \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430.",
    settingsTitle: "PaperEater",
    settingsApiKeyName: "\u041A\u043B\u044E\u0447 API Gemini",
    settingsApiKeyDesc: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043D\u0430: aistudio.google.com/app/apikey",
    settingsModeName: "\u0420\u0435\u0436\u0438\u043C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
    settingsModeDesc: "\u0422\u043E\u0447\u043D\u044B\u0439: \u0442\u043E\u0447\u043D\u0430\u044F \u043F\u0435\u0440\u0435\u0444\u0440\u0430\u0437\u0438\u0440\u043E\u0432\u043A\u0430  \xB7  \u041F\u0440\u043E\u0441\u0442\u043E\u0439: \u0438\u043D\u0442\u0443\u0438\u0442\u0438\u0432\u043D\u0430\u044F \u0434\u0435\u043A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u044F",
    settingsModeOptStandard: "\u0422\u043E\u0447\u043D\u044B\u0439",
    settingsModeOptDeep: "\u041F\u0440\u043E\u0441\u0442\u043E\u0439",
    settingsShortcutHint: "\u0421\u043D\u0438\u043C\u043E\u043A \u044D\u043A\u0440\u0430\u043D\u0430: \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C Alt/Option + \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u044C \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430",
    settingOutputLangTitle: "\u042F\u0437\u044B\u043A \u0432\u044B\u0432\u043E\u0434\u0430",
    settingOutputLangDesc: "\u042F\u0437\u044B\u043A, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u043F\u0438\u0448\u0435\u0442 Gemini. \xAB\u0410\u0432\u0442\u043E\xBB \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u044F\u0437\u044B\u043A\u0443 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430 Obsidian.",
    settingOutputLangAuto: "\u0410\u0432\u0442\u043E (\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u0435)",
    settingUiLangTitle: "\u042F\u0437\u044B\u043A \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430",
    settingUiLangDesc: "\u041F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u044F\u0437\u044B\u043A \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430 \u043F\u043B\u0430\u0433\u0438\u043D\u0430. Auto \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u043C\u0443 \u044F\u0437\u044B\u043A\u0443 Obsidian. \u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E.",
    settingUiLangAuto: "\u0410\u0432\u0442\u043E (\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C Obsidian)",
    calloutTitle: "PaperEater \u0414\u0435\u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F",
    insertBtn: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C",
    targetLanguageName: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  ar: {
    appName: "PaperEater",
    modeStandard: "\u062F\u0642\u064A\u0642",
    modeDeep: "\u0645\u0628\u0633\u0651\u0637",
    placeholderTitle: "\u0643\u064A\u0641 \u062A\u0633\u062A\u062E\u062F\u0645 PaperEater\u061F",
    placeholderKey: "Option / Alt",
    placeholderAction: "\u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062D\u062F\u064A\u062F",
    placeholderTip: "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644",
    placeholderDesc: "\u0627\u0636\u063A\u0637 \u0645\u0639 \u0627\u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0639\u0644\u0649 Option / Alt \u0648\u0627\u0633\u062D\u0628 \u0627\u0644\u0645\u0627\u0648\u0633 \u0644\u062A\u062D\u062F\u064A\u062F \u0623\u064A \u0641\u0642\u0631\u0629 \u0641\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0639\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631. \u0633\u064A\u0642\u0648\u0645 PaperEater \u0628\u062A\u0641\u0643\u064A\u0643\u0647\u0627 \u0647\u0646\u0627 \u0641\u0648\u0631\u0627\u064B.",
    placeholderSubHint: '\u0623\u0648 \u062D\u062F\u062F \u0646\u0635\u064B\u0627 \u0648\u0627\u0633\u062A\u062E\u062F\u0645 Cmd/Ctrl + P \u2192 "PaperEater"',
    copyBtn: "\u0646\u0633\u062E",
    copiedBtn: "\u062A\u0645 \u0627\u0644\u0646\u0633\u062E \u2713",
    screenshotBtnTitle: "\u0627\u0644\u062A\u0642\u0627\u0637 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 (\u0623\u0648 \u0627\u0636\u063A\u0637 Alt \u0648\u0627\u0633\u062D\u0628 \u0644\u062A\u062D\u062F\u064A\u062F \u0645\u0646\u0637\u0642\u0629)",
    ribbonTitle: "PaperEater",
    viewfinderHint: "\u0627\u0633\u062D\u0628 \u0644\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0646\u0637\u0642\u0629",
    cmdRewrite: "PaperEater: \u0625\u0639\u0627\u062F\u0629 \u0643\u062A\u0627\u0628\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u062F",
    cmdCapture: "PaperEater: \u0627\u0644\u062A\u0642\u0627\u0637 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629",
    statusLoading1: "\u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629\u2026",
    statusLoading2: "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u2026",
    statusLoading3: "\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0646\u0634\u0627\u0621\u2026",
    statusDone: "\u062A\u0645",
    statusAborted: "\u062A\u0645 \u0627\u0644\u0625\u0644\u063A\u0627\u0621",
    statusNoApiKey: "\u0645\u0641\u062A\u0627\u062D API \u063A\u064A\u0631 \u0645\u064F\u0647\u064A\u0623",
    statusError: "\u062E\u0637\u0623: ",
    statusNoContent: "\u0644\u0645 \u064A\u064F\u0633\u062A\u0644\u0645 \u0623\u064A \u0645\u062D\u062A\u0648\u0649. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0645\u0641\u062A\u0627\u062D API \u0623\u0648 \u0627\u0644\u0634\u0628\u0643\u0629.",
    statusRateLimit: "\u062A\u0645 \u062A\u062C\u0627\u0648\u0632 \u062D\u062F \u0627\u0644\u0645\u0639\u062F\u0644. \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F {wait}\u062B.",
    noticeNoText: "\u0627\u0644\u0631\u062C\u0627\u0621 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0646\u0635 \u0623\u0648\u0644\u0627\u064B.",
    noticeNoApiKey: "\u0642\u0645 \u0628\u062A\u0647\u064A\u0626\u0629 \u0645\u0641\u062A\u0627\u062D API Gemini \u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u2192 PaperEater.",
    noticeNoNote: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0644\u0627\u062D\u0638\u0629 \u0646\u0634\u0637\u0629. \u0627\u0644\u0631\u062C\u0627\u0621 \u0641\u062A\u062D \u0645\u0644\u0627\u062D\u0638\u0629 \u0623\u0648\u0644\u0627\u064B.",
    noticeCaptureError: "\u0641\u0634\u0644 \u0644\u0642\u0637\u0629 \u0627\u0644\u0634\u0627\u0634\u0629: ",
    noticeNoImage: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u062D\u0627\u0641\u0638\u0629.",
    noticeClipboardError: "\u062A\u0639\u0630\u0651\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062D\u0627\u0641\u0638\u0629.",
    settingsTitle: "PaperEater",
    settingsApiKeyName: "\u0645\u0641\u062A\u0627\u062D API Gemini",
    settingsApiKeyDesc: "\u0627\u062D\u0635\u0644 \u0639\u0644\u064A\u0647 \u0645\u0646: aistudio.google.com/app/apikey",
    settingsModeName: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A",
    settingsModeDesc: "\u062F\u0642\u064A\u0642: \u0625\u0639\u0627\u062F\u0629 \u0643\u062A\u0627\u0628\u0629 \u0623\u0645\u064A\u0646\u0629  \xB7  \u0645\u0628\u0633\u0651\u0637: \u062A\u0641\u0643\u064A\u0643 \u0628\u062F\u064A\u0647\u064A",
    settingsModeOptStandard: "\u062F\u0642\u064A\u0642",
    settingsModeOptDeep: "\u0645\u0628\u0633\u0651\u0637",
    settingsShortcutHint: "\u0644\u0642\u0637\u0629 \u0627\u0644\u0634\u0627\u0634\u0629: \u0627\u0636\u063A\u0637 Alt/Option + \u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062D\u062F\u064A\u062F",
    settingOutputLangTitle: "\u0644\u063A\u0629 \u0627\u0644\u0625\u062E\u0631\u0627\u062C",
    settingOutputLangDesc: "\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u062A\u064A \u064A\u0643\u062A\u0628 \u0628\u0647\u0627 Gemini. \xAB\u062A\u0644\u0642\u0627\u0626\u064A\xBB \u064A\u062A\u0628\u0639 \u0644\u063A\u0629 \u0648\u0627\u062C\u0647\u0629 Obsidian.",
    settingOutputLangAuto: "\u062A\u0644\u0642\u0627\u0626\u064A (\u0627\u062A\u0628\u0627\u0639 \u0627\u0644\u0646\u0638\u0627\u0645)",
    settingUiLangTitle: "\u0644\u063A\u0629 \u0627\u0644\u0648\u0627\u062C\u0647\u0629",
    settingUiLangDesc: "\u062A\u062C\u0627\u0648\u0632 \u0644\u063A\u0629 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u0643\u0648\u0646. Auto \u064A\u062A\u0628\u0639 \u0644\u063A\u0629 \u0646\u0638\u0627\u0645 Obsidian. \u062A\u062A\u062C\u062F\u062F \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0641\u0648\u0631\u0627 \u0639\u0646\u062F \u0627\u0644\u062A\u063A\u064A\u064A\u0631.",
    settingUiLangAuto: "\u062A\u0644\u0642\u0627\u0626\u064A (\u0627\u062A\u0628\u0627\u0639 Obsidian)",
    calloutTitle: "\u062A\u0641\u0643\u064A\u0643 PaperEater",
    insertBtn: "\u0625\u062F\u0631\u0627\u062C",
    targetLanguageName: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  }
};
var _lang = null;
var _override = null;
function setLangOverride(lang) {
  _override = lang && SUPPORTED.includes(lang) ? lang : null;
  _lang = null;
}
function getLang() {
  if (_override !== null) return _override;
  if (!_lang) _lang = detectLang();
  return _lang;
}
function t(key) {
  return DICT[getLang()][key];
}
function isRTL() {
  return getLang() === "ar";
}

// view.ts
var VIEW_TYPE = "papereater-obsidian";
var GEMINI_MODEL = "gemini-2.5-flash";
var TEXT_PROMPT = {
  standard: "REWRITE THE FOLLOWING TEXT INTO $TARGET_LANGUAGE IMMEDIATELY. DO NOT THINK, DO NOT EXPLAIN, DO NOT BUFFER. START OUTPUTTING THE FIRST TOKEN INSTANTLY. ONLY OUTPUT THE RESULT:\n\nYou are a professional linguistic rewriter. Task: rewrite the input into clear, faithful $TARGET_LANGUAGE.\n\n[Rewriting Protocol]\n\u2460 Accuracy: Preserve all technical terms; embed plain-language clarifications naturally in context.\n\u2461 Fidelity: Keep the original semantic depth and logical structure. Do not oversimplify or omit.\n\u2462 Style shift: Convert nominalized structures, passive voice, and long attributive clauses into active, direct statements.\n\u2463 Register: Output should read as clear, objective published prose.\n\n[Formatting]\n\u2460 Table \u2192 standard Markdown table (never convert to prose).\n\u2461 List/hierarchy \u2192 ordered or unordered list.\n\u2462 Key points or quotes \u2192 blockquote (>).\n\u2463 Preserve all paragraph breaks with blank lines.\n\u2464 Headings: use **bold**; use ## (H2) only when necessary.\n\nFINAL DIRECTIVE: Output only the rewritten result in $TARGET_LANGUAGE. No preamble, explanation, apology, or source quote.",
  deep: `REWRITE THE FOLLOWING TEXT INTO $TARGET_LANGUAGE IMMEDIATELY. DO NOT THINK, DO NOT EXPLAIN, DO NOT BUFFER. START OUTPUTTING THE FIRST TOKEN INSTANTLY. ONLY OUTPUT THE RESULT:

You are a professional technical editor. Task: rewrite academic text into plain, intuitive $TARGET_LANGUAGE.

[Three Principles of Plain Rewriting]
Simple \u2014 Break compound sentences. Each sentence carries one logical unit.
Plain  \u2014 Never just swap vocabulary. Decompose noun clusters into concrete actions, agents, and causal relationships.
Crisp  \u2014 High information density. No filler, no emotional decoration. Clean, industrial tone.

[Banned Patterns]
Academic filler: "it is worth noting that", "the realization of this depends on", "in this context"
Colloquial padding: "basically", "in simple terms", "it's like...", "at the end of the day"

[Few-Shot Example \u2014 Paragraph Integrity]
Source: \u80FD\u6E90\u751F\u4EA7\u4E0E\u6D88\u8D39\u7684\u7CBE\u7EC6\u5316\u540C\u6B65\u662F\u80FD\u6E90\u5171\u4EAB\u7684\u6838\u5FC3\u8981\u7D20\u3002\u6B64\u8981\u7D20\u7684\u5B9E\u73B0\uFF0C\u79BB\u4E0D\u5F00\u667A\u80FD\u8BA1\u91CF\u7CFB\u7EDF\uFF08iMSys\uFF09\u548C\u9AD8\u6548\u6570\u636E\u6574\u5408\uFF0C\u540C\u65F6\u8FD8\u9700\u8981\u5BF9\u5206\u5E03\u5F0F\u80FD\u6E90\u8D44\u4EA7\u8FDB\u884C\u4F18\u5316\u63A7\u5236\u3002
\u2717 Fragmented (wrong \u2014 sentences split into pseudo-paragraphs with bold pseudo-headings):
**\u80FD\u6E90\u5171\u4EAB\u6838\u5FC3\u662F\u7CBE\u7EC6\u5316\u540C\u6B65\u3002**

\u8FD9\u9700\u8981\u667A\u80FD\u7535\u8868\u548C\u6570\u636E\u6574\u5408\u3002

\u8D44\u4EA7\u4E5F\u9700\u8981\u4F18\u5316\u63A7\u5236\u3002

\u2713 Plain prose (correct \u2014 one source paragraph \u2192 one output paragraph, flowing prose):
\u80FD\u6E90\u5171\u4EAB\u6700\u6838\u5FC3\u7684\u6311\u6218\uFF0C\u662F\u8BA9\u53D1\u7535\u91CF\u548C\u7528\u7535\u91CF\u5728\u65F6\u95F4\u4E0A\u5B8C\u5168\u5BF9\u9F50\u3002\u8981\u505A\u5230\u8FD9\u70B9\uFF0C\u5FC5\u987B\u4F9D\u9760\u667A\u80FD\u7535\u8868\u8FDB\u884C\u5B9E\u65F6\u6570\u636E\u4F20\u8F93\u4E0E\u9AD8\u6548\u6574\u5408\uFF0C\u540C\u65F6\u8FD8\u8981\u5BF9\u80FD\u6E90\u8D44\u4EA7\u8FDB\u884C\u4F18\u5316\u63A7\u5236\u3002

[Paragraph Integrity \u2014 Iron Rule]
If the source is one continuous paragraph, the output MUST also be one unbroken paragraph. Never split a paragraph into isolated single sentences with blank lines between them.
Output as flowing academic/engineering prose. Do NOT bold individual sentences as pseudo-headings. Do NOT wrap sentences arbitrarily in blockquotes (>).

[Formatting]
\u2460 Table \u2192 standard Markdown table. Explicit list in source \u2192 ordered/unordered list. Do not create lists from prose.
\u2461 Use **bold** only for genuine technical term emphasis found in the source. Use > only for explicitly quoted speech.
\u2462 Preserve paragraph breaks: blank line between paragraphs, none within a paragraph.
\u2463 Headings: **bold**; use ## (H2) only when the source has section headings.

FINAL DIRECTIVE: Output only the rewritten result in $TARGET_LANGUAGE. No preamble, annotation, or source quote.`
};
var IMAGE_PROMPT = {
  standard: "TRANSLATE THE CAPTURED TEXT INTO $TARGET_LANGUAGE IMMEDIATELY. DO NOT THINK, DO NOT EXPLAIN, DO NOT BUFFER. START OUTPUTTING THE FIRST TOKEN INSTANTLY. ONLY OUTPUT THE RESULT:\n\nYou are a professional translator. Task: extract text from the screenshot and translate it into accurate, faithful $TARGET_LANGUAGE.\n\n[Step 1 \xB7 OCR]\nExtract all body text from the screenshot precisely. Ignore UI noise (navigation bars, buttons, headers, footers).\n\n[Step 2 \xB7 Translation Protocol]\n\u2460 Accuracy: Use the most authoritative, established $TARGET_LANGUAGE terms for technical vocabulary.\n\u2461 Fidelity: Preserve semantic depth and logical structure. Do not oversimplify or omit.\n\u2462 Rhetoric: Retain the original rhetorical devices, sentence rhythm, and argumentative cadence.\n\u2463 Register: The translation should read as formal academic prose \u2014 calm, objective, restrained.\n\n[Formatting]\n\u2460 Table \u2192 standard Markdown table (never convert to prose).\n\u2461 Mind maps / scattered text \u2192 ordered or unordered list by visual hierarchy.\n\u2462 Multi-column layout \u2192 complete left column first, then right column.\n\u2463 Captions or callout boxes \u2192 blockquote (>).\n\u2464 Preserve all paragraph breaks with blank lines.\n\u2465 Headings: **bold**; use ## (H2) only when necessary. Never use ###.\n\nFINAL DIRECTIVE: Output only the final $TARGET_LANGUAGE translation. No preamble, explanation, apology, or source quote.",
  deep: `TRANSLATE THE CAPTURED TEXT INTO $TARGET_LANGUAGE IMMEDIATELY. DO NOT THINK, DO NOT EXPLAIN, DO NOT BUFFER. START OUTPUTTING THE FIRST TOKEN INSTANTLY. ONLY OUTPUT THE RESULT:

You are a professional technical editor. Task: extract text from the screenshot and rewrite it into plain, intuitive $TARGET_LANGUAGE.

[Step 1 \xB7 OCR]
Extract all body text from the screenshot precisely. Ignore UI noise (navigation bars, buttons, headers, footers).

[Step 2 \xB7 Three Principles of Plain Rewriting]
Simple \u2014 Break compound sentences. Each sentence carries one logical unit.
Plain  \u2014 Never just swap vocabulary. Decompose noun clusters into concrete actions, agents, and causal relationships.
Crisp  \u2014 High information density. No filler, no emotional decoration. Clean, industrial tone.

[Banned Patterns]
Academic filler: "it is worth noting that", "the realization of this depends on", "in this context"
Colloquial padding: "basically", "in simple terms", "it's like...", "at the end of the day"

[Few-Shot Example \u2014 Paragraph Integrity]
Source: \u80FD\u6E90\u751F\u4EA7\u4E0E\u6D88\u8D39\u7684\u7CBE\u7EC6\u5316\u540C\u6B65\u662F\u80FD\u6E90\u5171\u4EAB\u7684\u6838\u5FC3\u8981\u7D20\u3002\u6B64\u8981\u7D20\u7684\u5B9E\u73B0\uFF0C\u79BB\u4E0D\u5F00\u667A\u80FD\u8BA1\u91CF\u7CFB\u7EDF\uFF08iMSys\uFF09\u548C\u9AD8\u6548\u6570\u636E\u6574\u5408\uFF0C\u540C\u65F6\u8FD8\u9700\u8981\u5BF9\u5206\u5E03\u5F0F\u80FD\u6E90\u8D44\u4EA7\u8FDB\u884C\u4F18\u5316\u63A7\u5236\u3002
\u2717 Fragmented (wrong \u2014 sentences split into pseudo-paragraphs with bold pseudo-headings):
**\u80FD\u6E90\u5171\u4EAB\u6838\u5FC3\u662F\u7CBE\u7EC6\u5316\u540C\u6B65\u3002**

\u8FD9\u9700\u8981\u667A\u80FD\u7535\u8868\u548C\u6570\u636E\u6574\u5408\u3002

\u8D44\u4EA7\u4E5F\u9700\u8981\u4F18\u5316\u63A7\u5236\u3002

\u2713 Plain prose (correct \u2014 one source paragraph \u2192 one output paragraph, flowing prose):
\u80FD\u6E90\u5171\u4EAB\u6700\u6838\u5FC3\u7684\u6311\u6218\uFF0C\u662F\u8BA9\u53D1\u7535\u91CF\u548C\u7528\u7535\u91CF\u5728\u65F6\u95F4\u4E0A\u5B8C\u5168\u5BF9\u9F50\u3002\u8981\u505A\u5230\u8FD9\u70B9\uFF0C\u5FC5\u987B\u4F9D\u9760\u667A\u80FD\u7535\u8868\u8FDB\u884C\u5B9E\u65F6\u6570\u636E\u4F20\u8F93\u4E0E\u9AD8\u6548\u6574\u5408\uFF0C\u540C\u65F6\u8FD8\u8981\u5BF9\u80FD\u6E90\u8D44\u4EA7\u8FDB\u884C\u4F18\u5316\u63A7\u5236\u3002

[Paragraph Integrity \u2014 Iron Rule]
If the source is one continuous paragraph, the output MUST also be one unbroken paragraph. Never split a paragraph into isolated single sentences with blank lines between them.
Output as flowing academic/engineering prose. Do NOT bold individual sentences as pseudo-headings. Do NOT wrap sentences arbitrarily in blockquotes (>).

[Formatting]
\u2460 Table \u2192 standard Markdown table. Explicit list in source \u2192 ordered/unordered list. Do not create lists from prose.
\u2461 Use **bold** only for genuine technical term emphasis found in the source. Use > only for explicitly quoted speech.
\u2462 Multi-column layout \u2192 complete left column first, then right column.
\u2463 Preserve paragraph breaks: blank line between paragraphs, none within a paragraph.
\u2464 Headings: **bold**; use ## (H2) only when the source has section headings.

FINAL DIRECTIVE: Output only the result in $TARGET_LANGUAGE. No preamble, annotation, or source quote.`
};
function resolvePrompt(template, outputLanguage) {
  const lang = outputLanguage === "auto" ? t("targetLanguageName") : outputLanguage;
  return template.replace(/\$TARGET_LANGUAGE/g, lang);
}
var PaperEaterView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    var _a, _b;
    super(leaf);
    this.modeState = "standard";
    this.currentController = null;
    this.lastResult = "";
    this.lastMarkdownView = null;
    this.plugin = plugin;
    this.modeState = (_b = (_a = plugin.settings) == null ? void 0 : _a.translationMode) != null ? _b : "standard";
  }
  getViewType() {
    return VIEW_TYPE;
  }
  getDisplayText() {
    return t("appName");
  }
  getIcon() {
    return "book-open";
  }
  async onOpen() {
    var _a, _b;
    this.modeState = (_b = (_a = this.plugin.settings) == null ? void 0 : _a.translationMode) != null ? _b : "standard";
    this.buildUI();
  }
  /** Called from settings when the UI language changes. */
  rebuild() {
    var _a, _b;
    this.modeState = (_b = (_a = this.plugin.settings) == null ? void 0 : _a.translationMode) != null ? _b : "standard";
    this.buildUI();
  }
  async onClose() {
    var _a;
    (_a = this.currentController) == null ? void 0 : _a.abort();
  }
  // ── UI 构建 ───────────────────────────────────────────────────────────────
  buildUI() {
    var _a;
    const root = (_a = this.containerEl.children[1]) != null ? _a : this.containerEl;
    root.empty();
    root.addClass("pe-root");
    if (isRTL()) root.setAttribute("dir", "rtl");
    this.buildHeader(root);
    this.outputEl = root.createDiv({ cls: "pe-output pe-output--empty" });
    this.buildFooter(root);
    this.showPlaceholder();
  }
  buildHeader(root) {
    const header = root.createDiv({ cls: "pe-header" });
    header.createDiv({ cls: "pe-logo", text: t("appName") });
    const seg = header.createDiv({ cls: "pe-mode-seg" });
    this.btnStandard = seg.createEl("button", { cls: "pe-seg-btn", text: t("modeStandard") });
    this.btnDeep = seg.createEl("button", { cls: "pe-seg-btn", text: t("modeDeep") });
    this.syncSegBtns();
    this.btnStandard.addEventListener("click", () => this.setMode("standard"));
    this.btnDeep.addEventListener("click", () => this.setMode("deep"));
    this.screenshotBtn = header.createEl("button", {
      cls: "pe-icon-btn",
      title: t("screenshotBtnTitle")
    });
    this.screenshotBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
    this.screenshotBtn.addEventListener("click", () => this.plugin.captureNotePaneAndProcess());
  }
  buildFooter(root) {
    const footer = root.createDiv({ cls: "pe-footer" });
    this.statusEl = footer.createDiv({ cls: "pe-status" });
    this.insertBtn = footer.createEl("button", { cls: "pe-insert-btn pe-hidden", text: t("insertBtn") });
    this.insertBtn.addEventListener("click", () => this.insertCallout());
    this.copyBtn = footer.createEl("button", { cls: "pe-copy-btn pe-hidden", text: t("copyBtn") });
    this.copyBtn.addEventListener("click", () => this.copyResult());
  }
  async setMode(mode) {
    this.modeState = mode;
    this.plugin.settings.translationMode = mode;
    await this.plugin.saveSettings();
    this.syncSegBtns();
  }
  syncSegBtns() {
    this.btnStandard.toggleClass("pe-seg-active", this.modeState === "standard");
    this.btnDeep.toggleClass("pe-seg-active", this.modeState === "deep");
  }
  // ── 占位 & 状态 ───────────────────────────────────────────────────────────
  showPlaceholder() {
    this.outputEl.empty();
    this.outputEl.addClass("pe-output--empty");
    const wrap = this.outputEl.createDiv({ cls: "pe-placeholder" });
    wrap.createDiv({ cls: "pe-placeholder-tip", text: t("placeholderTip") });
    const demo = wrap.createDiv({ cls: "pe-shortcut-demo" });
    demo.createEl("span", { cls: "pe-key pe-key--hero", text: t("placeholderKey") });
    demo.createEl("span", { cls: "pe-demo-plus", text: "+" });
    demo.createEl("span", { cls: "pe-key pe-key--hero", text: t("placeholderAction") });
    wrap.createEl("p", { cls: "pe-placeholder-desc", text: t("placeholderDesc") });
    wrap.createDiv({ cls: "pe-placeholder-divider" });
    wrap.createEl("p", { cls: "pe-sub-hint", text: t("placeholderSubHint") });
    this.hideCopyBtn();
    this.setStatus("");
  }
  setStatus(msg, type = "") {
    this.statusEl.className = "pe-status" + (type ? ` pe-status--${type}` : "");
    this.statusEl.textContent = msg;
  }
  showCopyBtn() {
    this.copyBtn.removeClass("pe-hidden");
    this.insertBtn.removeClass("pe-hidden");
  }
  hideCopyBtn() {
    this.copyBtn.addClass("pe-hidden");
    this.insertBtn.addClass("pe-hidden");
  }
  async copyResult() {
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
  insertCallout() {
    if (!this.lastResult) return;
    let mdView = this.lastMarkdownView;
    if (!mdView || !mdView.containerEl.isConnected) {
      const leaves = this.app.workspace.getLeavesOfType("markdown");
      mdView = leaves.length > 0 ? leaves[0].view : null;
    }
    if (!mdView) {
      new import_obsidian.Notice(t("noticeNoNote"));
      return;
    }
    const editor = mdView.editor;
    const cursor = editor.getCursor();
    const title = t("calloutTitle");
    const bodyLines = this.lastResult.split("\n");
    const calloutLines = [
      `> [!abstract] \u{1F4D6} ${title}`,
      ...bodyLines.map((line) => line.trim() ? `> ${line}` : ">")
    ];
    const calloutBlock = calloutLines.join("\n");
    const lineEnd = { line: cursor.line, ch: editor.getLine(cursor.line).length };
    editor.replaceRange(`
${calloutBlock}
`, lineEnd);
    editor.setCursor({ line: cursor.line + calloutLines.length + 1, ch: 0 });
  }
  // ── 公共入口：校验 API Key，重置 UI，发起流式请求 ─────────────────────
  async prepareAndStream(payload) {
    var _a;
    if (!this.plugin.settings.apiKey) {
      new import_obsidian.Notice(t("noticeNoApiKey"));
      this.setStatus(t("statusNoApiKey"), "error");
      return;
    }
    (_a = this.currentController) == null ? void 0 : _a.abort();
    this.currentController = new AbortController();
    this.lastResult = "";
    this.hideCopyBtn();
    this.outputEl.removeClass("pe-output--empty");
    this.outputEl.empty();
    this.setStatus(t("statusLoading1"), "loading");
    await this.streamSSE(payload, this.currentController.signal);
  }
  // ── 文字入口 ──────────────────────────────────────────────────────────────
  async processText(text, sourceView) {
    if (sourceView) this.lastMarkdownView = sourceView;
    if (!this.outputEl) this.buildUI();
    await this.prepareAndStream({
      system_instruction: {
        parts: [{ text: resolvePrompt(TEXT_PROMPT[this.modeState], this.plugin.settings.outputLanguage) }]
      },
      contents: [{
        role: "user",
        parts: [{ text }]
      }]
    });
  }
  // ── 截图入口 ──────────────────────────────────────────────────────────────
  async processScreenshot(base64) {
    if (!this.outputEl) this.buildUI();
    await this.prepareAndStream({
      contents: [{
        parts: [
          { text: resolvePrompt(IMAGE_PROMPT[this.modeState], this.plugin.settings.outputLanguage) },
          { inline_data: { mime_type: "image/jpeg", data: base64 } }
        ]
      }]
    });
  }
  // ── 剪贴板截图（备用入口） ────────────────────────────────────────────────
  async processClipboardImage() {
    let base64;
    try {
      const { clipboard } = window.require("electron");
      const img = clipboard.readImage();
      if (img.isEmpty()) {
        new import_obsidian.Notice(t("noticeNoImage"));
        return;
      }
      base64 = img.toJPEG(85).toString("base64");
    } catch (e) {
      console.error("[PaperEater] clipboard read error:", e);
      new import_obsidian.Notice(t("noticeClipboardError"));
      return;
    }
    await this.processScreenshot(base64);
  }
  // ── 核心：Gemini SSE 流式请求 ─────────────────────────────────────────────
  async streamSSE(payload, signal) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const { apiKey } = this.plugin.settings;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`;
    let streamEl = null;
    let accumulated = "";
    let firstChunk = true;
    let phaseTimer = null;
    const clearPhase = () => {
      if (phaseTimer) {
        clearTimeout(phaseTimer);
        phaseTimer = null;
      }
    };
    try {
      phaseTimer = setTimeout(() => this.setStatus(t("statusLoading2"), "loading"), 3e3);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal
      });
      clearPhase();
      if (!response.ok) {
        const body = await response.text();
        if (response.status === 429) {
          const wait = parseInt((_a = response.headers.get("Retry-After")) != null ? _a : "60", 10) || 60;
          this.setStatus(t("statusRateLimit").replace("{wait}", String(wait)), "error");
          return;
        }
        let errMsg = `API ${response.status}`;
        try {
          errMsg = (_c = (_b = JSON.parse(body).error) == null ? void 0 : _b.message) != null ? _c : errMsg;
        } catch (e) {
        }
        throw new Error(errMsg);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = (_d = lines.pop()) != null ? _d : "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;
          let parsed;
          try {
            parsed = JSON.parse(jsonStr);
          } catch (e) {
            continue;
          }
          const chunk = (_i = (_h = (_g = (_f = (_e = parsed == null ? void 0 : parsed.candidates) == null ? void 0 : _e[0]) == null ? void 0 : _f.content) == null ? void 0 : _g.parts) == null ? void 0 : _h[0]) == null ? void 0 : _i.text;
          if (!chunk) continue;
          if (firstChunk) {
            firstChunk = false;
            this.setStatus(t("statusLoading3"), "loading");
            this.outputEl.empty();
            streamEl = this.outputEl.createDiv({ cls: "pe-stream-text" });
          }
          accumulated += chunk;
          streamEl.insertAdjacentText("beforeend", chunk);
          this.outputEl.scrollTop = this.outputEl.scrollHeight;
        }
      }
      if (!firstChunk && accumulated.trim()) {
        this.lastResult = accumulated.trim();
        this.outputEl.empty();
        await import_obsidian.MarkdownRenderer.render(this.app, this.lastResult, this.outputEl, "", this);
        this.setStatus(t("statusDone"), "done");
        this.showCopyBtn();
      } else if (firstChunk) {
        this.setStatus(t("statusNoContent"), "error");
        console.error("[PaperEater] stream ended with no content");
      }
    } catch (err) {
      clearPhase();
      const e = err;
      if (e.name === "AbortError") {
        if (firstChunk) this.showPlaceholder();
        else this.setStatus(t("statusAborted"), "");
        return;
      }
      console.error("[PaperEater] stream error:", e);
      this.setStatus(t("statusError") + e.message, "error");
      if (firstChunk) {
        this.outputEl.empty();
        this.outputEl.createDiv({ cls: "pe-error-box", text: `\u26A0\uFE0F ${e.message}` });
      }
    } finally {
      clearPhase();
      this.currentController = null;
    }
  }
};

// main.ts
var DEFAULT_SETTINGS = {
  apiKey: "",
  translationMode: "standard",
  outputLanguage: "auto",
  uiLanguage: "auto"
};
function sanitizePdfText(raw) {
  const PDF_ARTIFACTS = /\b(SCROLL_LOCK|PAGE_LEFT|PAGE_RIGHT|SCROLL_UP|SCROLL_DOWN|PAGE_UP|PAGE_DOWN|NUM_LOCK|CAPS_LOCK|PRINT_SCREEN|INSERT|PAUSE|BREAK)\b/gi;
  return raw.replace(PDF_ARTIFACTS, "").replace(/\r\n/g, "\n").split(/\n{2,}/).map((para) => para.replace(/\n/g, " ").replace(/[ \t]{2,}/g, " ").trim()).filter((para) => para.length > 0).join("\n\n").trim();
}
var PaperEaterPlugin = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
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
        if (!(raw == null ? void 0 : raw.trim())) {
          new import_obsidian2.Notice(t("noticeNoText"));
          return;
        }
        const view = await this.activateView();
        view == null ? void 0 : view.processText(sanitizePdfText(raw), ctx);
      }
    });
    this.addCommand({
      id: "capture-note-pane",
      name: t("cmdCapture"),
      callback: () => this.captureNotePaneAndProcess()
    });
    this.addSettingTab(new PaperEaterSettingTab(this.app, this));
    this.viewfinder = new Viewfinder(this);
    this.viewfinder.install();
    this.app.workspace.onLayoutReady(() => {
      this.activateView();
    });
  }
  onunload() {
    this.viewfinder.uninstall();
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);
  }
  async activateView() {
    var _a;
    const { workspace } = this.app;
    let leaf = (_a = workspace.getLeavesOfType(VIEW_TYPE)[0]) != null ? _a : null;
    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      await (leaf == null ? void 0 : leaf.setViewState({ type: VIEW_TYPE, active: true }));
    }
    if (leaf) {
      workspace.revealLeaf(leaf);
      return leaf.view;
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
  async captureArea(x, y, w, h) {
    const remote = window.require("@electron/remote");
    const win = remote.getCurrentWindow();
    const full = await win.webContents.capturePage();
    const scale = window.devicePixelRatio || 1;
    return full.crop({
      x: Math.round(x * scale),
      y: Math.round(y * scale),
      width: Math.max(1, Math.round(w * scale)),
      height: Math.max(1, Math.round(h * scale))
    }).toJPEG(85).toString("base64");
  }
  // 截取区域后自动开启侧边栏并发送给 Gemini
  async captureAndProcess(x, y, w, h) {
    let base64;
    try {
      base64 = await this.captureArea(x, y, w, h);
    } catch (e) {
      console.error("[PaperEater] captureArea error:", e);
      new import_obsidian2.Notice(t("noticeCaptureError") + e.message);
      return;
    }
    const view = await this.activateView();
    view == null ? void 0 : view.processScreenshot(base64);
  }
  // 截取当前活跃笔记编辑区（左侧主内容区）
  async captureNotePaneAndProcess() {
    var _a;
    const el = (_a = document.querySelector(".workspace-leaf.mod-active .view-content")) != null ? _a : document.querySelector(".workspace-split.mod-left-split");
    if (!el) {
      new import_obsidian2.Notice(t("noticeNoNote"));
      return;
    }
    const r = el.getBoundingClientRect();
    await this.captureAndProcess(r.left, r.top, r.width, r.height);
  }
};
var Viewfinder = class {
  constructor(plugin) {
    this.isAltHeld = false;
    this.isSelecting = false;
    this.startX = 0;
    this.startY = 0;
    this.overlay = null;
    this.selBox = null;
    this.hint = null;
    // 绑定 this 后的引用，用于 removeEventListener
    this.onKeyDown = this._onKeyDown.bind(this);
    this.onKeyUp = this._onKeyUp.bind(this);
    this.onMouseDown = this._onMouseDown.bind(this);
    this.plugin = plugin;
  }
  install() {
    document.addEventListener("keydown", this.onKeyDown, true);
    document.addEventListener("keyup", this.onKeyUp, true);
    document.addEventListener("mousedown", this.onMouseDown, true);
  }
  uninstall() {
    document.removeEventListener("keydown", this.onKeyDown, true);
    document.removeEventListener("keyup", this.onKeyUp, true);
    document.removeEventListener("mousedown", this.onMouseDown, true);
    this.cleanup();
  }
  // ── 键盘事件 ────────────────────────────────────────────────────────────
  _onKeyDown(e) {
    if (e.key !== "Alt" || this.isAltHeld) return;
    this.isAltHeld = true;
    document.body.style.cursor = "crosshair";
    this.showHint();
  }
  _onKeyUp(e) {
    if (e.key !== "Alt") return;
    this.isAltHeld = false;
    if (!this.isSelecting) this.cleanup();
  }
  // 按住 Alt 时右下角显示小提示
  showHint() {
    if (this.hint) return;
    this.hint = document.createElement("div");
    Object.assign(this.hint.style, {
      position: "fixed",
      right: "16px",
      bottom: "16px",
      background: "rgba(184,92,78,0.92)",
      color: "#fff",
      fontSize: "12px",
      padding: "5px 10px",
      borderRadius: "5px",
      zIndex: "99998",
      pointerEvents: "none",
      userSelect: "none"
    });
    this.hint.textContent = t("viewfinderHint");
    document.body.appendChild(this.hint);
  }
  // ── 鼠标事件 ────────────────────────────────────────────────────────────
  _onMouseDown(e) {
    if (!this.isAltHeld || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    this.isSelecting = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.overlay = document.createElement("div");
    Object.assign(this.overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "99999",
      cursor: "crosshair",
      userSelect: "none"
    });
    this.selBox = document.createElement("div");
    Object.assign(this.selBox.style, {
      position: "fixed",
      display: "none",
      border: "2px solid #B85C4E",
      background: "rgba(184,92,78,0.08)",
      // dim 未选区域：box-shadow 向外扩散覆盖整个视口
      boxShadow: "0 0 0 9999px rgba(0,0,0,0.25)",
      pointerEvents: "none"
    });
    this.overlay.appendChild(this.selBox);
    document.body.appendChild(this.overlay);
    const onMove = (ev) => this.onMouseMove(ev);
    const onUp = (ev) => {
      var _a, _b;
      (_a = this.overlay) == null ? void 0 : _a.removeEventListener("mousemove", onMove);
      (_b = this.overlay) == null ? void 0 : _b.removeEventListener("mouseup", onUp);
      this.onMouseUp(ev);
    };
    this.overlay.addEventListener("mousemove", onMove);
    this.overlay.addEventListener("mouseup", onUp);
  }
  onMouseMove(e) {
    if (!this.selBox) return;
    const x = Math.min(e.clientX, this.startX);
    const y = Math.min(e.clientY, this.startY);
    const w = Math.abs(e.clientX - this.startX);
    const h = Math.abs(e.clientY - this.startY);
    if (w > 4 || h > 4) this.selBox.style.display = "block";
    Object.assign(this.selBox.style, {
      left: `${x}px`,
      top: `${y}px`,
      width: `${w}px`,
      height: `${h}px`
    });
  }
  async onMouseUp(e) {
    const x = Math.min(e.clientX, this.startX);
    const y = Math.min(e.clientY, this.startY);
    const w = Math.abs(e.clientX - this.startX);
    const h = Math.abs(e.clientY - this.startY);
    this.cleanup();
    if (w < 20 || h < 20) return;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
    await this.plugin.captureAndProcess(x, y, w, h);
  }
  cleanup() {
    var _a, _b;
    this.isSelecting = false;
    this.isAltHeld = false;
    document.body.style.cursor = "";
    (_a = this.overlay) == null ? void 0 : _a.remove();
    this.overlay = null;
    this.selBox = null;
    (_b = this.hint) == null ? void 0 : _b.remove();
    this.hint = null;
  }
};
var PaperEaterSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    if (isRTL()) containerEl.setAttribute("dir", "rtl");
    containerEl.createEl("h2", { text: t("settingsTitle") });
    new import_obsidian2.Setting(containerEl).setName(t("settingsApiKeyName")).setDesc(t("settingsApiKeyDesc")).addText((text) => {
      text.inputEl.type = "password";
      text.setPlaceholder("AIza...").setValue(this.plugin.settings.apiKey).onChange(async (value) => {
        this.plugin.settings.apiKey = value.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("settingsModeName")).setDesc(t("settingsModeDesc")).addDropdown(
      (drop) => drop.addOption("standard", t("settingsModeOptStandard")).addOption("deep", t("settingsModeOptDeep")).setValue(this.plugin.settings.translationMode).onChange(async (value) => {
        this.plugin.settings.translationMode = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("settingUiLangTitle")).setDesc(t("settingUiLangDesc")).addDropdown((drop) => {
      const UI_LANG_OPTIONS = [
        ["auto", t("settingUiLangAuto")],
        ["zh", "\u7B80\u4F53\u4E2D\u6587"],
        ["en", "English"],
        ["de", "Deutsch"],
        ["es", "Espa\xF1ol"],
        ["fr", "Fran\xE7ais"],
        ["ja", "\u65E5\u672C\u8A9E"],
        ["ko", "\uD55C\uAD6D\uC5B4"],
        ["pt", "Portugu\xEAs"],
        ["ru", "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"],
        ["ar", "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"]
      ];
      for (const [val, label] of UI_LANG_OPTIONS) drop.addOption(val, label);
      return drop.setValue(this.plugin.settings.uiLanguage).onChange(async (value) => {
        this.plugin.settings.uiLanguage = value;
        await this.plugin.saveSettings();
        setLangOverride(value === "auto" ? null : value);
        this.app.workspace.getLeavesOfType(VIEW_TYPE).forEach((leaf) => {
          leaf.view.rebuild();
        });
      });
    });
    new import_obsidian2.Setting(containerEl).setName(t("settingOutputLangTitle")).setDesc(t("settingOutputLangDesc")).addDropdown((drop) => {
      drop.addOption("auto", t("settingOutputLangAuto"));
      const OUTPUT_LANGUAGES = [
        "\u7B80\u4F53\u4E2D\u6587",
        "\u7E41\u9AD4\u4E2D\u6587",
        "English",
        "Deutsch",
        "Espa\xF1ol",
        "Fran\xE7ais",
        "Italiano",
        "\u65E5\u672C\u8A9E",
        "\uD55C\uAD6D\uC5B4",
        "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
        "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
        "Nederlands",
        "Portugu\xEAs",
        "Svenska",
        "Polski",
        "T\xFCrk\xE7e",
        "Bahasa Indonesia",
        "Ti\u1EBFng Vi\u1EC7t",
        "\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22",
        "\u0939\u093F\u0928\u094D\u0926\u0940",
        "Dansk",
        "Norsk",
        "Suomi",
        "\u010Ce\u0161tina",
        "Magyar",
        "Rom\xE2n\u0103",
        "Catal\xE0",
        "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
        "\u05E2\u05D1\u05E8\u05D9\u05EA"
      ];
      for (const lang of OUTPUT_LANGUAGES) drop.addOption(lang, lang);
      return drop.setValue(this.plugin.settings.outputLanguage).onChange(async (value) => {
        this.plugin.settings.outputLanguage = value;
        await this.plugin.saveSettings();
      });
    });
    containerEl.createEl("p", {
      text: t("settingsShortcutHint"),
      cls: "setting-item-description"
    });
  }
};
