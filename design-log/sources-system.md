# Sources System — Design Log

## Problem

Stories need a structured way to manage primary/archival materials (images, PDFs,
audio, video, links, documents). The existing mechanisms are:

- `resources/index.{locale}.md` — an unstructured markdown page (editorial reading list)
- `source_url` / `source_name` / `source_author` in frontmatter — loose, untyped fields

There is no way to:
- Attach a source to a specific annotation, line, or word in the story text
- Browse sources as a typed, filterable collection
- Distinguish between "primary archival material" and "editorial reading list"

## Decision

Introduce `Source` as a first-class entity in the content pipeline. Sources coexist
with the existing Resources section (editorial reading lists stay as-is).

## Source Entity

Stored as `content/sources/{id}.json`:

```json
{
  "id": "mel-kaye-photo-1952",
  "type": "image",
  "title": "Photo of Mel Kaye, 1952",
  "url": "https://...",
  "description": "...",
  "author": "Librascope Archives",
  "date": "1952",
  "credit": "Librascope Corporation",
  "license": "public-domain",
  "tags": ["mel-kaye", "librascope"]
}
```

**Types:** `image | pdf | audio | video | link | text | archive | other`
**Licenses:** `public-domain | cc-by | cc-by-sa | fair-use | all-rights-reserved | unknown`

## Attachment Mechanisms

Three levels of attachment, matching how annotations and glossary terms work:

| Level | Mechanism |
|-------|-----------|
| Story | `"sources": ["id1", "id2"]` in `story.json` |
| Article / Annotation / Document | `sources: [id1, id2]` in frontmatter |
| Inline (word/line) | `[label](sources/id)` markdown link syntax |

Unattached sources: JSON files in `content/sources/` with no references anywhere.
Used as a staging area for work in progress.

## Embedded Image Figures

A source of type `image` can be embedded directly as a figure, replacing the raw
S3 URL with a source ID reference:

```markdown
<figure>
![Mel Kaye, 1952](sources/mel-kaye-photo-1952)

<figcaption>Mel Kaye, 1952</figcaption>
</figure>
```

The pipeline resolves the ID to the actual URL at build time:

1. The loader (`getStoryArticle`, `getCodex`, `getStoryDocument`) scans the raw
   markdown for `![...](sources/id)` patterns before processing.
2. It loads the matching source JSON files directly (without going through
   `getStorySources`, to avoid circular imports).
3. The sources map is passed to `processMarkdown` → `MarkdownProcessOptions.sources`.
4. `rehypeFigureImages` converts the markdown image syntax to an `<img>` node
   (since images inside `<figure>` HTML blocks are raw text until this plugin runs).
5. `rehypeSourceImages` (new plugin, runs after `rehypeFigureImages`) scans all
   `img` nodes, detects `src^="sources/"`, and replaces `src` with the source's URL.
   It also writes `data-source-id`, `data-source-author`, `data-source-credit`,
   `data-source-license` onto the element.

The result in the built HTML is a normal `<img>` pointing to the real URL, with
source metadata available as `data-*` attributes for future attribution display.

### Why not resolve at render time?

Resolving at SSR/SSG build time (in the pipeline) is preferred over client-side
resolution because:
- Images appear on first paint with no loading flicker
- No client-side context or fetch needed
- The resolved URL participates in Next.js image optimization

## Inline Rendering: Popover

Inline source references (`[label](sources/id)`) render as a popover trigger,
identical UX to annotation and glossary popovers. Clicking opens a `SourcePopover`
showing type badge, title, image preview (for image type), description, author, date,
credit, license, and a link to the original URL.

This is consistent with the existing popover system in `PopoverProvider`.

## Content Pipeline Changes

- New types: `Source`, `SourceType`, `SourceLicense` in `types.ts`
- New loader: `libs/content-pipeline/src/loaders/sources.ts`
  - `getSource(id)`, `getAllSources()`, `getSourcesByIds(ids[])`
  - `getStorySources(storySlug)` — aggregates across story.json + all frontmatter
- New remark plugin: `remark-source-links.ts`
  - Pattern: `[label](sources/id)` → `data-link-type="source"` + `data-link-target="id"`
- Extend `ContentMetadata` and `StoryConfig` with `sources?: string[]`

## UI Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `SourceBadge` | `libs/ui/src/content/sources/` | Type icon + label |
| `SourcePopover` | `libs/ui/src/content/sources/` | Inline popover panel |
| `SourceCard` | `libs/ui/src/content/sources/` | Card for sources list pages |

`PopoverProvider` extended with `sources`, `fetchSource`, `loadSource`.
`AnnotationAwareLink` extended with a `source` case — no separate `ContentRenderer` change needed,
since `AnnotationAwareLink` already handles all `data-link-type` values as the `a` component override.

## Routes

| Route | Content |
|-------|---------|
| `/[locale]/stories/[storySlug]/sources` | Sources attached to a story, grouped by type; 404 if no sources exist |
| `/[locale]/sources` | Global sources browser, all `content/sources/*.json` files, grouped by type |

The global browser shows all sources regardless of attachment status. Filtering and an
explicit "unattached" section are deferred — the current implementation groups by type only.

## Relationship to Existing Resources Pages

Resources pages (`/stories/[slug]/resources`) are editorial reading lists — curated
links to web articles, academic papers, discussions. They stay as markdown and are
not migrated into this system. Sources is a parallel concept for archival/primary
materials. Both sections can coexist in a story's navigation.

## Migration of Legacy Fields

The `source_url`, `source_name`, `source_author` frontmatter fields in existing
glossary entries and annotations are not migrated automatically. They can be
converted to proper Source entities incrementally by content editors.
