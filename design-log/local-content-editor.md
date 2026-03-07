# Local Content Editor

A local-only webapp for editing the project's markdown and JSON content files. Runs on localhost during development, reads/writes directly to the `content/` directory.

## Why Local, Not Firebase

- Zero migration — works with existing file structure and content pipeline
- Git remains the source of truth (version control, diffs, PRs)
- remark/rehype pipeline, source templates, HAST generation all stay untouched
- No ongoing sync/hosting cost

## Architecture

### Separate app: `apps/editor`

- Own dev server (Vite + React), runs alongside `pnpm dev` on a different port
- Imports `@mels-loop/content-loaders` for file discovery and reading
- Imports `@mels-loop/content-pipeline` for live markdown preview
- Local Express/Fastify API layer for filesystem writes (browser can't write files directly)

### UI: Reuse `@mels-loop/ui`

No new component library. The existing package covers forms, layout, and chrome:

| Need | Existing Primitive |
|---|---|
| Buttons, actions | `Button`, `IconButton` |
| Form fields | `TextField`, `Select` |
| Labels, headings | `Text` |
| Content cards | `Card`, `CardHeader`, `CardBody` |
| Collapsible sections | `Accordion` |
| Toggles, mode switches | `ToggleGroup` |
| Tooltips | `Tooltip` |
| Layout | `Container`, `Grid` |
| Loading states | `Loader` |
| Tabs | `Tabs` (if needed) |

Editor-specific additions (not part of the design system):

| Widget | Approach |
|---|---|
| Markdown editor | CodeMirror 6 — lightweight, extensible, good markdown mode |
| File tree | Custom component, or use a lightweight tree lib |
| Split pane (en/he side-by-side) | `react-resizable-panels` or CSS-only |
| Live preview | Render through content-pipeline, display as HTML |

### Why CodeMirror over Monaco

- Much smaller bundle (~100KB vs ~5MB)
- Better markdown-specific extensions
- Easier to customize (themes via CSS, matches `--ml-*` tokens)
- Monaco is overkill for markdown/JSON editing

## Content Types to Support

| Type | Files | Edit Mode |
|---|---|---|
| Sources | `index.json` + `index.{locale}.json` | JSON form (structured fields) |
| Articles | `index.{locale}.md` | Markdown editor + preview |
| Codex entries | `index.{locale}.md` | Markdown editor + preview |
| Glossary | `index.{locale}.json` | JSON form |
| Posts | `index.{locale}.md` | Markdown editor + preview |
| Pages | `index.{locale}.md` | Markdown editor + preview |
| Story config | `story.json` | JSON form |

## Core Features

### 1. File Browser (sidebar)

- Tree view of `content/` directory
- Grouped by content type (stories, sources, glossary, posts, pages)
- Show locale completeness (icon if `en` or `he` is missing)
- Click to open in editor pane

### 2. JSON Editor (sources, glossary, story config)

- Form-based, not raw JSON
- Fields derived from content type schema
- Validation against expected shape
- Save writes JSON back to disk (formatted with existing prettier config)

### 3. Markdown Editor (articles, codex, posts, pages)

- CodeMirror 6 with markdown syntax highlighting
- Source reference autocomplete: typing `{{sources/` suggests from `content/sources/` IDs
- Media insert: browse `public/media/`, insert as markdown image
- Frontmatter displayed as form fields above the editor

### 4. Bilingual Split View

- Side-by-side `en` | `he` for the same content item
- Both editors visible, independently scrollable
- RTL rendering for Hebrew pane
- Visual indicator when one locale is missing (create from template)

### 5. Live Preview

- Renders markdown through the actual `content-pipeline` (remark/rehype)
- Shows resolved source references, images, glossary tooltips
- Toggleable — editor-only, preview-only, or split

### 6. Media Browser

- Grid view of `public/media/` (images, documents, covers)
- Thumbnail previews for images
- Click to copy markdown reference or insert at cursor
- Drag-and-drop from browser into editor

## API Layer

Thin local server (Express or Fastify) for filesystem operations:

```
GET    /api/tree                  — content directory tree
GET    /api/content/:path         — read file
PUT    /api/content/:path         — write file
POST   /api/content/:path         — create new content item (from template)
DELETE /api/content/:path         — delete file
GET    /api/media                 — list media files
POST   /api/media                 — upload media file
GET    /api/preview               — render markdown via content-pipeline
```

Safety: only serves files under `content/` and `public/media/`. No writes outside those directories.

## Tech Stack

| Layer | Choice |
|---|---|
| Bundler | Vite |
| UI framework | React |
| Components | `@mels-loop/ui` |
| Markdown editor | CodeMirror 6 (`@codemirror/lang-markdown`) |
| API server | Express (simple, familiar) |
| Preview renderer | `@mels-loop/content-pipeline` |
| File watching | `chokidar` (auto-refresh tree on external changes) |
| Styling | CSS Modules + `--ml-*` tokens (same as main app) |

## Estimated Effort

| Feature | Days |
|---|---|
| Project setup (Vite, API server, monorepo wiring) | 1 |
| File browser / tree sidebar | 2 |
| JSON form editor (sources, glossary) | 2-3 |
| Markdown editor (CodeMirror, frontmatter) | 3-4 |
| Bilingual split view | 1-2 |
| Live preview (pipeline integration) | 2 |
| Media browser | 1-2 |
| Source reference autocomplete | 1 |
| Polish, testing | 2 |
| **Total** | **~2-3 weeks** |

## Open Questions

- Should the editor support creating new stories (full directory scaffolding)?
- Do we want git integration (commit/push from the UI) or keep that in the terminal?
- Should the preview match the production site's styles exactly, or is a clean preview sufficient?
- File watching: auto-reload when files change externally (e.g., git pull), or manual refresh?
