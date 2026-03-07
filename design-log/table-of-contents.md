# Table of Contents

## Context

Mel's Loop is a hacking folklore anthology — a book of minibooks. Each story is a minibook (a chapter): it has a codex (the primary text), and may have articles, documents, and sources around it. The entire site is the book, organized into parts that group these minibooks.

The book's structure is fluid — it could be organized by theme, by format, or as a linear reading experience. The same stories, arranged differently depending on editorial intent. Section names are not yet decided. The structure will evolve as content is collected.

## The Book Metaphor

```
Mel's Loop — Hacking Folklore Anthology (the book)
│
├── Introduction
│
├── The Story of Mel                        ← minibook
│   ├── Introduction                        ← part
│   │   ├── The Story of Mel (codex)
│   │   └── Photo of Mel Kaye, 1952 (source)
│   ├── Chapter 1: The Programmer           ← part
│   │   ├── Preface (article)
│   │   └── Mel Kaye — A Curriculum Vitae (article)
│   ├── Chapter 2: The Machine              ← part
│   │   └── Mel's Hack — The Missing Bits (article)
│   ├── Appendix                            ← part
│   │   └── Blackjack Game Writeup (document)
│   └── List of Figures                     ← generated page
│
├── Other Stories                           ← part
│   ├── Some AI Koans (minibook)
│   ├── The 500-Mile Email (minibook)
│   ├── A Story About Magic (minibook)
│   └── ...
│
├── Glossary                               ← standalone page
└── Appendix: Sources                      ← part
```

## Two-Level Model

The TOC operates at two levels, using the same pattern:

1. **Story level** — `contents` in `story.json` defines the minibook's internal structure
2. **Book level** — `anthology.json` composes minibooks into the full anthology

The story-level model is the foundation. Once it works, the anthology model composes these minibooks together.

---

## Story-Level Contents

### The `contents` field in `story.json`

A `contents` array defines the minibook's editorial structure — what's included, in what order, grouped into named parts.

`contents` replaces the `sections`, `articles`, and `documents` fields as the source of truth for story structure. Sources remain a system-level feature — the Sources tab in StorySections is always present (with filtering) if the story has sources, independent of `contents`.

### Entry format

Every contents entry is an object with a `type` field. Four entry types:

| Type | Fields | Resolves from |
|---|---|---|
| `part` | `ref`, `children` | Title from `parts.{ref}` in messages. Children are entries. |
| `page` | `ref`, optional `figure` | Story content folder (`content/stories/{slug}/{ref}/`). Title from frontmatter. |
| `source` | `ref`, optional `figure` | Global sources (`content/sources/{ref}/`). Title from source messages. |
| `generated` | `ref` | Built from contents data. Title from `generated.{ref}` in messages. |

### Parts

Parts are named groups — the minibook's chapter concept. They use book-anatomy vocabulary for their `ref` keys:

- `introduction`, `prologue` — opening
- `chapter1`, `chapter2`, `chapter3` — main body
- `epilogue`, `appendix`, `colophon` — closing

The `ref` maps to a message key under `parts` (e.g. `ref: "chapter1"` → `parts.chapter1` in messages). The editor gives each part a locale-specific title via messages.

### Messages

Each story carries its own messages folder for all locale-specific strings — the story's metadata (`title`, `abstract`), part names, and generated page titles. This makes `story.json` purely structural, with no inline translations.

```
content/stories/the-story-of-mel/
├── story.json
├── messages/
│   ├── en.json
│   └── he.json
├── codex/
├── articles/
└── ...
```

```json
// messages/en.json
{
  "story": {
    "title": "The Story of Mel",
    "abstract": "A Comprehensive Guide to The Story of Mel, a Programmer"
  },
  "parts": {
    "introduction": "The Poem",
    "chapter1": "The Programmer",
    "chapter2": "The Machine",
    "appendix": "The Blackjack Program"
  },
  "generated": {
    "listOfFigures": "List of Figures"
  }
}
```

```json
// messages/he.json
{
  "story": {
    "title": "הסיפור על מל",
    "abstract": "מדריך מקיף לסיפור על מל"
  },
  "parts": {
    "introduction": "השיר",
    "chapter1": "המתכנת",
    "chapter2": "המכונה",
    "appendix": "תוכנית הבלאק ג׳ק"
  },
  "generated": {
    "listOfFigures": "רשימת איורים"
  }
}
```

Message keys use dot-notation nesting, resolved via the same pattern as `dictGet(dict, 'nav.home')` in the app-level dictionaries. All locale-specific strings for a story live in one place per locale.

Message values are strings by default (title only). In the future, they can be objects with richer metadata — see [Layer 2: Presentation](#layer-2-presentation-near-future) in the Roadmap.

Non-string fields (`cover`, `thumbnail`, `sources`) remain in `story.json` — they're structural, not locale-dependent. Only human-readable text moves to messages.

### Figure handling

Some entries contribute figures to the book. Two levels:

1. **Standalone figures** — source entries placed in `contents`. Whether a source is a figure is determined by its `type` field in `index.json` (e.g. `"type": "image"` → figure by default).
2. **Inline figures** — images embedded inside a content piece (e.g. photos within an article). Discovered by the renderer at build time. A page entry's rendered content may contain figures even if the entry itself isn't marked as one.

The `figure` property can be set on **any entry type** to override the default behavior:

- `{ "type": "source", "ref": "some-pdf-diagram", "figure": true }` — force a non-image source to be a figure
- `{ "type": "source", "ref": "decorative-image", "figure": false }` — exclude an image source from the figure list
- `{ "type": "page", "ref": "articles/mel-kaye-cv", "figure": false }` — exclude this page's inline figures from the list

Figure numbering flows sequentially through the `contents` tree — standalone and inline figures interleaved by position.

At build time, if a `generated` entry of type `listOfFigures` is present, the system walks the resolved `contents` tree and assembles the full figure list: standalone source figures + inline figures discovered by the renderer, in tree order, respecting `figure` overrides. The generated list is locale-specific.

### Generated pages

Some entries don't correspond to content folders — they're directives to generate a page from the `contents` data itself.

A generated page only exists if the editor places it in `contents`. Not every minibook needs a "List of Figures" — it's an editorial choice. Generated pages are resolved per locale.

### Validation

Missing content is handled with build-time warnings. If a `contents` entry references a page or source that doesn't exist, the build logs a warning but doesn't fail. The entry is skipped from the resolved tree. This supports work-in-progress states — e.g. structure defined before all translations are complete.

### Example: The Story of Mel

```json
{
  "slug": "the-story-of-mel",
  "title": "story.title",
  "abstract": "story.abstract",
  "cover": "/media/images/mel-kaye-portrait-1951.jpg",
  "sources": ["mel-kaye-photo-1952", "ucla-yearbook-1951", "..."],
  "contents": [
    {
      "type": "part",
      "ref": "introduction",
      "children": [
        { "type": "page", "ref": "codex" },
        { "type": "source", "ref": "mel-kaye-photo-1952" }
      ]
    },
    {
      "type": "part",
      "ref": "chapter1",
      "children": [
        { "type": "page", "ref": "articles/preface" },
        { "type": "page", "ref": "articles/mel-kaye-cv" },
        { "type": "source", "ref": "ucla-yearbook-1951" },
        { "type": "source", "ref": "librazette-jul-1956-meeting" }
      ]
    },
    {
      "type": "part",
      "ref": "chapter2",
      "children": [
        { "type": "page", "ref": "articles/mels-hack-the-missing-bits" },
        { "type": "source", "ref": "rpc-4000-instruction-format" },
        { "type": "source", "ref": "rpc-4000-features-manual", "figure": true }
      ]
    },
    {
      "type": "part",
      "ref": "appendix",
      "children": [
        { "type": "page", "ref": "documents/blackjack-writeup" },
        { "type": "source", "ref": "mel-kaye-blackjack-writeup" }
      ]
    },
    { "type": "generated", "ref": "listOfFigures" }
  ]
}
```

### What lives where

| Concern | Where it lives |
|---|---|
| Reading order and editorial grouping | `contents` in `story.json` |
| All locale-specific strings (titles, abstracts, part names) | `messages/{locale}.json` |
| Story structural metadata (cover, thumbnail, avatar) | `story.json` |
| Source assignments | `sources` in `story.json` |
| Sources tab (filtering, display) | System feature — always present if story has sources |
| Figure numbering (standalone) | Derived from `contents` order + source `type` |
| Figure numbering (inline) | Discovered by renderer, ordered by position in `contents` |
| Generated views (list of figures, etc.) | `generated` entries in `contents` |

### Alternative structures for The Story of Mel

The same content, organized differently. Each version is a valid `contents` model — the editor chooses which structure best serves the reading experience.

**Option A: By content type** — parts mirror traditional content categories:

```json
{
  "contents": [
    {
      "type": "part", "ref": "introduction",
      "children": [{ "type": "page", "ref": "codex" }]
    },
    {
      "type": "part", "ref": "chapter1",
      "children": [
        { "type": "page", "ref": "articles/preface" },
        { "type": "page", "ref": "articles/mel-kaye-cv" },
        { "type": "page", "ref": "articles/mels-hack-the-missing-bits" }
      ]
    },
    {
      "type": "part", "ref": "appendix",
      "children": [{ "type": "page", "ref": "documents/blackjack-writeup" }]
    }
  ]
}
```

Messages for Option A:
```json
{ "parts": { "introduction": "The Poem", "chapter1": "Articles", "appendix": "Documents" } }
```

**Option B: By narrative arc** — parts follow the story's themes:

```json
{
  "contents": [
    {
      "type": "part", "ref": "introduction",
      "children": [
        { "type": "page", "ref": "codex" },
        { "type": "page", "ref": "articles/preface" },
        { "type": "source", "ref": "story-of-mel-original-usenet" }
      ]
    },
    {
      "type": "part", "ref": "chapter1",
      "children": [
        { "type": "page", "ref": "articles/mel-kaye-cv" },
        { "type": "source", "ref": "mel-kaye-photo-1952" },
        { "type": "source", "ref": "ucla-yearbook-1951" },
        { "type": "source", "ref": "librazette-jul-1956-meeting" }
      ]
    },
    {
      "type": "part", "ref": "chapter2",
      "children": [
        { "type": "page", "ref": "articles/mels-hack-the-missing-bits" },
        { "type": "source", "ref": "rpc-4000-instruction-format" },
        { "type": "source", "ref": "rpc-4000-branch-control-unit" },
        { "type": "source", "ref": "rpc-4000-features-manual", "figure": true }
      ]
    },
    {
      "type": "part", "ref": "appendix",
      "children": [
        { "type": "page", "ref": "documents/blackjack-writeup" },
        { "type": "source", "ref": "mel-kaye-blackjack-writeup" }
      ]
    },
    { "type": "generated", "ref": "listOfFigures" }
  ]
}
```

Messages for Option B:
```json
{
  "parts": {
    "introduction": "The Poem",
    "chapter1": "The Programmer",
    "chapter2": "The Machine",
    "appendix": "The Blackjack Program"
  },
  "generated": { "listOfFigures": "List of Figures" }
}
```

**Option C: Flat** — no parts, just a curated sequence of pages and sources:

```json
{
  "contents": [
    { "type": "page", "ref": "codex" },
    { "type": "page", "ref": "articles/preface" },
    { "type": "source", "ref": "mel-kaye-photo-1952" },
    { "type": "page", "ref": "articles/mel-kaye-cv" },
    { "type": "source", "ref": "ucla-yearbook-1951" },
    { "type": "page", "ref": "articles/mels-hack-the-missing-bits" },
    { "type": "source", "ref": "rpc-4000-instruction-format" },
    { "type": "page", "ref": "documents/blackjack-writeup" }
  ]
}
```

No parts → no message keys needed for the contents model. Entry titles come from frontmatter and source messages.

**Option D: Minimal** — just the essential reading:

```json
{
  "contents": [
    { "type": "page", "ref": "codex" },
    { "type": "page", "ref": "articles/preface" },
    { "type": "page", "ref": "articles/mel-kaye-cv" },
    { "type": "page", "ref": "articles/mels-hack-the-missing-bits" }
  ]
}
```

Same content folder, four different books. The `contents` model is the editorial lens.

### Resolver

The `contents` model is locale-independent — it defines structure. Resolution is per-locale:

1. Load `messages/{locale}.json` for the story
2. Walk the `contents` tree, resolve each part's `ref` via `parts.{ref}` in messages
3. Resolve each page entry to a title (from the content file's frontmatter) and href
4. Resolve each source entry to a title (from the source's locale messages) and href
5. Resolve each generated entry's title via `generated.{ref}` in messages
6. Log warnings for missing content, skip from resolved tree

```typescript
// Resolve the story's contents to display-ready data for a given locale
function getStoryContents(slug: string, locale: string): Promise<ResolvedContentsEntry[]>;

// Collect all figures (standalone + inline) in contents order for a given locale
function getStoryFigures(slug: string, locale: string): Promise<ResolvedFigure[]>;

// Load a story's messages for a given locale
function getStoryMessages(slug: string, locale: string): Promise<Record<string, unknown>>;
```

---

## Book-Level Contents (Anthology)

### Vocabulary alignment

The book level uses the **same four entry types** as the story level — `part`, `page`, `source`, `generated`. The only addition is that `page` entries at the book level can reference a story (a minibook), not just a standalone page.

This means one vocabulary for the entire system. The same resolver logic, the same message key patterns, the same validation rules apply at both levels.

### `anthology.json`

A single file defines the book's structure, separate from the stories themselves. Stories don't know where they sit in the book — the anthology is an editorial layer on top.

```
content/anthology.json
```

```json
{
  "title": "book.title",
  "contents": [
    { "type": "page", "ref": "introduction" },
    { "type": "page", "ref": "stories/the-story-of-mel" },
    {
      "type": "part",
      "ref": "chapter1",
      "children": [
        { "type": "page", "ref": "stories/some-ai-koans" },
        { "type": "page", "ref": "stories/the-500-mile-email" },
        { "type": "page", "ref": "stories/a-story-about-magic" },
        { "type": "page", "ref": "stories/always-mount-a-scratch-monkey" },
        { "type": "page", "ref": "stories/tv-typewriters" },
        { "type": "page", "ref": "stories/the-lenna-story" }
      ]
    },
    { "type": "page", "ref": "glossary" },
    {
      "type": "part",
      "ref": "appendix",
      "children": [
        { "type": "generated", "ref": "sourceIndex" }
      ]
    }
  ]
}
```

The `stories/` prefix in `ref` distinguishes story-pages from standalone pages. The resolver knows that `stories/the-story-of-mel` loads from `content/stories/the-story-of-mel/story.json` (and its internal `contents` form the deepest level), while `introduction` loads from `content/pages/introduction/`.

The anthology follows the same pattern as stories — config file + `messages/` folder side by side:

```
content/
├── anthology.json
├── messages/
│   ├── en.json
│   └── he.json
├── stories/
│   └── ...
```

```json
// content/messages/en.json
{
  "book": {
    "title": "Mel's Loop — Hacking Folklore Anthology"
  },
  "parts": {
    "chapter1": "Other Stories",
    "appendix": "Appendix"
  },
  "generated": {
    "sourceIndex": "Source Index"
  }
}
```

### Entry types (same as story level)

| Type | Fields | Resolves from |
|---|---|---|
| `part` | `ref`, `children` | Title from `parts.{ref}` in anthology messages. Children are entries. |
| `page` | `ref`, optional `figure` | `stories/{slug}` → story's `story.json` + internal `contents`. `{slug}` → `content/pages/{slug}/`. |
| `source` | `ref`, optional `figure` | Global sources (`content/sources/{ref}/`). |
| `generated` | `ref` | Built from contents data. Title from `generated.{ref}` in anthology messages. |

### Why this over `parent`/`order`

- **One file, full picture.** The entire book structure is visible at a glance.
- **Stories stay clean.** No `parent` or `order` fields polluting story configs.
- **Easy to reorganize.** Move a story between parts = move one line in one file.
- **Parts are lightweight.** Just a ref + children array. No directory, no codex, no slug.
- **Supports mixed content.** Stories, pages, sources — all in one ordered sequence.
- **Same vocabulary at both levels.** `part`/`page`/`source`/`generated` — no new concepts to learn.
- **Multiple structures possible.** Could support multiple anthology files in the future.

### What stories know vs. what the anthology knows

| Concern | Where it lives |
|---|---|
| Story content (codex, text) | `content/stories/{slug}/codex/` |
| Story metadata keys (title, abstract) | `story.json` (keys) → `messages/{locale}.json` (strings) |
| Story structural metadata (cover, thumbnail, avatar) | `content/stories/{slug}/story.json` |
| Story internal structure | `contents` in `content/stories/{slug}/story.json` |
| Position in the book | `content/anthology.json` |
| Thematic grouping | `content/anthology.json` (parts) |

---

## Site TOC — The `/contents` Page

A dedicated page rendering the full anthology tree. Three levels:

1. **Top-level entries** — pages, parts (from `anthology.json`)
2. **Part children** — stories and pages within a part (from `anthology.json`)
3. **Story contents** — parts and entries within a story (from `story.json` `contents`)

```
Mel's Loop — Hacking Folklore Anthology

  Introduction

  The Story of Mel
   The Poem
     · The Story of Mel, a Programmer (codex)
     · Photo of Mel Kaye, 1952
   The Programmer
     · Preface
     · Mel Kaye — A Curriculum Vitae
   The Machine
     · Mel's Hack — The Missing Bits
     · RPC-4000 Instruction Format
   The Blackjack Program
     · Blackjack Game Writeup
   List of Figures

  Other Stories
     · Some AI Koans
     · The 500-Mile Email
     · A Story About Magic
     · Always Mount a Scratch Monkey
     · TV Typewriters
     · The Lenna Story

  Glossary

  Sources
```

## StorySections and Asides

With `contents` driving structure, the story-level UI simplifies:

**StorySections** (tab navigation) offers two views:
- **Contents** — the minibook's reading structure
- **Sources** — always present if the story has sources (system feature, with type filtering and search)

Sources remain a system-level concern — not part of the editorial `contents` model. The Sources tab, its filtering UI, and the source data model are unchanged.

**Asides** (sidebar) renders the resolved `contents` tree as a navigable TOC — parts as groups, pages and sources as links. This replaces the current per-section item lists. The Asides component receives the resolved contents model and renders it as a nested list matching the `contents` structure. When `contents` is absent, Asides falls back to the current section-based rendering (backwards compatible during migration).

The `StoryTableOfContents` component is shared between the Asides sidebar and the `/contents` page — same data, different layout context.

## Loader

```typescript
// Story-level
function getStoryContents(slug: string, locale: string): Promise<ResolvedContentsEntry[]>;
function getStoryFigures(slug: string, locale: string): Promise<ResolvedFigure[]>;
function getStoryMessages(slug: string, locale: string): Promise<Record<string, unknown>>;

// Book-level
function getAnthology(): Promise<AnthologyConfig>;
function getResolvedToc(locale: string): Promise<ResolvedTocEntry[]>;
function getStoryBreadcrumbs(slug: string, locale: string): Promise<{ title: string; href: string }[]>;
```

## Open Decisions

- **Part names**: not yet decided. Current placeholder is "Other Stories."
- **Part pages**: do parts get their own route (`/stories/part-slug`), or are they only visible in the `/contents` tree?
- **Stories not in the anthology**: stories that exist in `content/stories/` but aren't listed in `anthology.json` — hidden? Accessible by direct URL but not in the TOC?
- **Within-page TOC**: for long texts with `##` headings — a sidebar/sticky nav with anchor links. Independent of the contents model, can be added later.
- **Mobile**: how does the `/contents` tree collapse on small screens?
- **Nesting depth**: can parts contain sub-parts, or is one level enough for a minibook?
- **Avatar strings**: `avatar.alt` and `avatar.initials` in `story.json` are locale-dependent — should they move to messages too?

## Roadmap: Structure → Presentation → Rendering

The contents model evolves in three layers. Each builds on the previous, and each can ship independently.

### Layer 1: Structure (current design)

The `contents` field in `story.json` defines **what's in the book and in what order**. Entry types (`part`, `page`, `source`, `generated`) describe the editorial structure. Messages provide locale strings. The resolver walks the tree and produces display-ready data.

This is the foundation — ship it first. It replaces `sections`/`articles`/`documents` fields, drives the Asides sidebar and the `/contents` page, and enables generated pages like List of Figures.

### Layer 2: Presentation (near future)

Parts may need more than a title. A chapter might have a subtitle, an abstract, an epigraph. Different part types (`introduction` vs `chapter1` vs `appendix`) might render with different templates — an introduction might show a large hero image, a chapter might have a numbered heading, an appendix might use a compact list layout.

This layer extends the messages model to support structured metadata per part:

```json
{
  "parts": {
    "introduction": "The Poem",
    "chapter1": {
      "title": "The Programmer",
      "subtitle": "Who was Mel Kaye?",
      "abstract": "A biographical exploration..."
    },
    "appendix": "The Blackjack Program"
  }
}
```

Message values can be a string (title only) or an object (title + metadata). The resolver handles both — string values are shorthand for `{ "title": "..." }`.

Part `ref` keys (`introduction`, `chapter1`, `appendix`) map to rendering templates. The system provides default templates per key family, with story-level overrides possible. This is a presentation concern — no changes to `story.json` structure, only richer messages and template logic.

**Numbering and pagination** — should parts and entries render with Roman numerals, Arabic numbers, or no numbering at all? This is a renderer decision, not a structural one. The contents model provides order; the presentation layer decides how to label that order. Options include: no numbering, numbering only for parts, numbering for all entries, or per-level numbering styles (Roman for parts, Arabic for entries).

### Layer 3: Contents-driven rendering (future)

Today, the App Router defines routes per content type (`/articles/[slug]`, `/documents/[slug]`). The contents model is a navigation overlay on top of these routes.

In the future, the contents model could **drive** page generation directly. A minibook becomes a single rendered artifact — pages flow from the `contents` tree, not from filesystem conventions. The router serves the book; the contents model defines the book.

This is the most ambitious layer. It may involve:
- A book renderer that walks the contents tree and produces a sequential reading experience
- Page-level transitions (next/previous) derived from contents order
- Print/export layouts generated from the same model
- Table of contents as an interactive navigation overlay on the rendered book

This layer is speculative — it depends on how the reading experience evolves. The structure and presentation layers are designed to support it without blocking it.

### Dictionary

The Dictionary is a minibook parallel to The Story of Mel — a story with parts from A to Z, each containing word entries. It lives in the anthology as another `page` entry referencing `stories/dictionary`. Its internal `contents` uses parts (`partA`, `partB`, ...) with page entries for each word. Not yet designed — the contents model should support it naturally once story-level contents is working.

---

## Implementation Plan

See [table-of-contents-implementation.md](table-of-contents-implementation.md) for the full implementation plan (6 phases).
