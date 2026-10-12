# Simple Diagram

ChatGPT-style simple flow diagrams for Obsidian.

Write plain text in a ` ```diagram ` code block and get clean box-and-arrow flow diagrams that follow your Obsidian theme (light and dark).

````markdown
```diagram
title: 1. Recommended architecture
[plain] Field client | Bulk upload of 10–50 PDFs
NestJS API | Auth · Upload · Issue Batch ID / Job ID
[blue] Redis + BullMQ | Queue · Retries · Concurrency limits · Priorities
Python Worker | Classify PDF → Text extraction / OCR → Inference request
[green] Ollama · RX 7900 XTX 24GB | LLM inference — concurrency 1 to start
Validate & store in PostgreSQL | Schema validation · Source cross-check · Deduplication
```
````

## Features

- One line per box, with arrows inserted automatically
- Bold title + muted description lines (`Title | description`)
- Theme-aware accent colors and borderless boxes
- Parallel steps side by side
- Solid or dashed arrows with optional labels
- Vertical (default) or horizontal layout
- Plain JavaScript, no build step; works on desktop and mobile

## Installation

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from this repository (or the latest release).
2. Copy them into `<your vault>/.obsidian/plugins/simple-diagram/`.
3. In Obsidian, open **Settings → Community plugins**, reload the list if needed, and enable **Simple Diagram**.

## Syntax at a glance

| Syntax | Meaning |
| --- | --- |
| `Title` | One box |
| `Title \| desc \| desc2` | Title plus description lines |
| (deeper-indented line) | Adds a description line to the box above |
| `[blue] Title` | Colored box: `red` `orange` `yellow` `green` `cyan` `blue` `purple` `pink` `gray` `accent` |
| `[plain] Title` | Borderless box |
| `A ;; B` | Side by side in the same step |
| `-> label` / `=> label` | Solid arrow label |
| `--> label` / `..> label` | Dashed arrow (label optional) |
| `title: ...` | Diagram title |
| `direction: right` | Horizontal layout (default is `down`) |
| `%% ...` / `// ...` | Comment |

Full guide with examples: **[English](docs/syntax.md)** | **[한국어](docs/syntax.ko.md)**

> Tip: copy a guide into your vault. With the plugin enabled, every example renders live next to its source.

## Development

`main.js` is plain CommonJS and is loaded by Obsidian as-is. To preview the renderer without Obsidian, serve the repository folder with any static server and open `demo.html`:

```bash
python -m http.server 8765
```

Then visit `http://localhost:8765/demo.html`.

## License

[MIT](LICENSE) © 2026 Joseph Han
