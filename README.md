# PaperEater

**An AI-powered reading companion that simplifies complex texts into plain language.**

PaperEater is an [Obsidian](https://obsidian.md) plugin that uses the Gemini API to rewrite dense academic papers, technical documents, and foreign-language content into clear, readable prose — without losing the original meaning.

## Features

- **Text rewrite** — Select any text in your note and rewrite it instantly via the command palette or keyboard shortcut
- **Screenshot capture** — Hold `Alt / Option` and drag to select any region of the screen; PaperEater OCRs and rewrites it automatically
- **Two modes** — *Standard* for faithful translation, *Deep* for plain-language simplification
- **Streaming output** — Results appear token by token as Gemini generates them
- **Insert to note** — Push the result into your active note as a formatted callout block
- **Multi-language UI** — Supports 10 interface languages; output language is configurable independently

## Requirements

- Obsidian 1.4.0 or later
- A [Google Gemini API key](https://aistudio.google.com/apikey) (free tier available)

## Installation

### From the Obsidian Community Plugins browser

1. Open **Settings → Community plugins → Browse**
2. Search for **PaperEater**
3. Click **Install**, then **Enable**

### Manual installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](../../releases/latest)
2. Copy them into `<your vault>/.obsidian/plugins/papereater/`
3. Reload Obsidian and enable the plugin under **Settings → Community plugins**

## Setup

1. Go to **Settings → PaperEater**
2. Paste your Gemini API key into the **API Key** field
3. Choose your preferred **output language** (defaults to your Obsidian UI language)

## Usage

| Action | How |
|--------|-----|
| Rewrite selected text | Select text → open Command Palette → **PaperEater: Rewrite selection** |
| Screenshot capture | Hold `Alt / Option`, drag to select a screen region |
| Capture active note pane | Click the camera icon in the PaperEater sidebar, or use **PaperEater: Capture note pane** |
| Insert result into note | Click **Insert** in the sidebar footer |
| Copy result | Click **Copy** in the sidebar footer |

## License

[MIT](LICENSE)
