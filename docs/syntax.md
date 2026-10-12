# Simple Diagram Syntax Guide

**English** | [한국어](syntax.ko.md)

Write one box per line inside a ` ```diagram ` code block, and it renders as a top-to-bottom flow diagram connected by arrows.

> [!tip] Open this file in Obsidian
> Each example shows the **source** (a `markdown` block) followed by the **result** (a `diagram` block). With the plugin enabled, the results render live.

---

## 1. Basics: boxes and arrows

One line = one box. Boxes are stacked top to bottom in the order you write them, and arrows are inserted between them automatically.

````markdown
```diagram
Client
API Server
Database
```
````

```diagram
Client
API Server
Database
```

---

## 2. Title and description: `|`

Text left of `|` is the **bold title**; text to the right is the muted **description**.
Use `|` more than once to add more description lines.

````markdown
```diagram
NestJS API | Auth · Upload · Issue Job ID
Python Worker | Classify PDF | Text extraction / OCR
```
````

```diagram
NestJS API | Auth · Upload · Issue Job ID
Python Worker | Classify PDF | Text extraction / OCR
```

### Adding descriptions with indentation

A line indented **deeper than the box line above it** becomes another description line for that box. Handy for long descriptions.

````markdown
```diagram
Validate & Store
  Schema validation · Source cross-check
  Deduplication · Result lookup
```
````

```diagram
Validate & Store
  Schema validation · Source cross-check
  Deduplication · Result lookup
```

---

## 3. Colors: `[color]`

Put `[color]` at the start of a line to give the box a colored border and a light tinted background.

| Name | Notes |
| --- | --- |
| `red` `orange` `yellow` `green` `cyan` `blue` `purple` `pink` | Obsidian theme colors |
| `gray` | Gray border + secondary background |
| `accent` | Current theme's accent color |
| `plain` | No border or background (text only) |

````markdown
```diagram
[blue] Redis + BullMQ | Queue · Retries
[green] Ollama | LLM inference
[red] Failure handling | Alert when retries are exhausted
```
````

```diagram
[blue] Redis + BullMQ | Queue · Retries
[green] Ollama | LLM inference
[red] Failure handling | Alert when retries are exhausted
```

### Borderless box: `[plain]`

Use it for steps that don't need a box around them, such as a start or end point.

````markdown
```diagram
[plain] Field client | Bulk upload of 10–50 PDFs
NestJS API | Auth · Upload · Issue Job ID
```
````

```diagram
[plain] Field client | Bulk upload of 10–50 PDFs
NestJS API | Auth · Upload · Issue Job ID
```

> [!note]
> Names not in the list (e.g. `[foo]`) are not treated as colors; they are shown as part of the title text.

---

## 4. Side by side: `;;`

Separate boxes with `;;` on one line to place them next to each other in the same step. Useful for parallel work.

````markdown
```diagram
[blue] Queue
[orange] Worker A | Text PDFs ;; [purple] Worker B | Scanned PDFs (OCR)
[green] Store results
```
````

```diagram
[blue] Queue
[orange] Worker A | Text PDFs ;; [purple] Worker B | Scanned PDFs (OCR)
[green] Store results
```

---

## 5. Arrow labels and dashed arrows

An arrow line placed **between** two box lines applies to the arrow between them.

| Syntax | Result |
| --- | --- |
| `-> label` or `=> label` | Solid arrow with a label |
| `--> label` or `..> label` | Dashed arrow with a label |
| `-->` (no label) | Dashed arrow without a label |

````markdown
```diagram
Upload request
-> enqueue
[blue] Queue
--> async
Worker
-->
Notification
```
````

```diagram
Upload request
-> enqueue
[blue] Queue
--> async
Worker
-->
Notification
```

> [!note]
> Arrow lines before the first box or after the last box are ignored.

---

## 6. Diagram title: `title:`

Shows a bold heading above the diagram frame. It can go anywhere in the block.

````markdown
```diagram
title: Processing pipeline
Input
Output
```
````

```diagram
title: Processing pipeline
Input
Output
```

---

## 7. Horizontal layout: `direction: right`

Changes the flow to left-to-right. `right`, `lr`, and `horizontal` all work (the default is vertical, `down`).
In horizontal mode, boxes grouped with `;;` stack vertically, and arrow labels appear above the arrow.

````markdown
```diagram
direction: right
Client
-> HTTP
[blue] API
-> job
Queue
[green] Worker | Process
```
````

```diagram
direction: right
Client
-> HTTP
[blue] API
-> job
Queue
[green] Worker | Process
```

> [!tip]
> If the boxes don't fit the width, the diagram scrolls horizontally. Horizontal layouts read best with 4–5 boxes or fewer.

---

## 8. Comments

Lines starting with `%%` or `//`, and blank lines, are ignored.

````markdown
```diagram
%% step 1
Input
// step 2
Output
```
````

---

## Full example: recommended architecture

````markdown
```diagram
title: 1. Recommended architecture
[plain] Field client | Bulk upload of 10–50 PDFs
NestJS API | Auth · Upload · Issue Batch ID / Job ID
[blue] Redis + BullMQ | Queue · Retries · Concurrency limits · Priorities
Python Worker | Classify PDF → Text extraction / OCR → Inference request
[green] Ollama · RX 7900 XTX 24GB | LLM inference — concurrency 1 to start
Validate & store in PostgreSQL | Schema validation · Source cross-check · Deduplication · Result lookup
```
````

```diagram
title: 1. Recommended architecture
[plain] Field client | Bulk upload of 10–50 PDFs
NestJS API | Auth · Upload · Issue Batch ID / Job ID
[blue] Redis + BullMQ | Queue · Retries · Concurrency limits · Priorities
Python Worker | Classify PDF → Text extraction / OCR → Inference request
[green] Ollama · RX 7900 XTX 24GB | LLM inference — concurrency 1 to start
Validate & store in PostgreSQL | Schema validation · Source cross-check · Deduplication · Result lookup
```

---

## Quick reference

| Syntax | Meaning |
| --- | --- |
| `Title` | One box |
| `Title \| desc \| desc2` | Title plus description lines |
| (deeper-indented line) | Adds a description line to the box above |
| `[blue] Title` | Colored box |
| `[plain] Title` | Borderless box |
| `A ;; B` | Side by side in the same step |
| `-> label` / `=> label` | Solid arrow label |
| `--> label` / `..> label` | Dashed arrow (+ label) |
| `title: ...` | Diagram title |
| `direction: right` | Horizontal layout |
| `%% ...` / `// ...` | Comment |

### Good to know

- Text inside boxes is rendered as **plain text**; Markdown (bold, links, etc.) is not applied.
- If there are no boxes, the error message `diagram: no nodes to display.` is shown instead of the diagram.
- Colors follow your Obsidian theme, so diagrams adapt to light and dark mode automatically.
