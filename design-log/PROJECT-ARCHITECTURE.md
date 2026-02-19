# Mel's Loop — Project Architecture

A comprehensive technical document describing how the Mel's Loop project works, from content authoring to rendered pages.

---

## 1. What Is Mel's Loop?

Mel's Loop is a web application that presents "The Story of Mel" — a classic piece of hacker folklore — as a richly annotated, bilingual (English/Hebrew) digital document. The site transforms markdown files into interactive HTML pages where readers can explore annotations, glossary terms, and supplementary content through inline popovers.

**URL:** https://melsloop.com
**Version:** 1.2.3

---

## 2. Technology Stack

- **Framework:** Next.js 13.0.6 (Pages Router, static generation)
- **UI:** React 18.2.0 with Radix UI primitives
- **Language:** TypeScript 4.9.3
- **Styling:** Stylable (Wix) for theming/component CSS + Stitches for animations
- **Markdown:** simple-markdown (parser) + gray-matter (frontmatter)
- **i18n:** Next.js built-in i18n with custom translation context
- **Testing:** Playwright (E2E), Vitest (unit)
- **CI/CD:** CircleCI
- **External Services:** SendGrid (email), Google reCAPTCHA, Axiom (logging), Google Analytics

---

## 3. Content System

### 3.1 Content Organization

All content lives in `public/content/` as markdown files organized by type:

```
public/content/
├── about/                    # About section pages
│   └── index.en.md / index.he.md
├── contact/                  # Contact page content
├── contribute/               # Contribution guidelines
├── demo/                     # Demo pages (dev only)
├── docs/                     # Documentation hub
│   └── the-story-of-mel/    # Main document
│       ├── index.en.md       # Document root
│       ├── annotations/      # ~40 annotation files
│       │   ├── mel-kaye-bio/
│       │   │   └── index.en.md / index.he.md
│       │   ├── real-computers/
│       │   ├── drum-memory/
│       │   └── ...
│       ├── codex/            # Codex (reference) pages
│       │   └── pages/
│       └── pages/            # Story sub-pages
│           ├── preface/
│           ├── resources/
│           ├── mels-hack-the-missing-bits/
│           └── blackjack-writeup/
├── glossary/                 # ~35 glossary terms
│   ├── lgp-30/
│   ├── royal-mcbee/
│   └── ...
└── posts/                    # Blog posts
    ├── welcome/
    └── ...
```

Each content item is a directory containing locale-specific markdown files: `index.en.md` and `index.he.md`.

### 3.2 Markdown File Format

Content files use YAML frontmatter followed by standard markdown with custom extensions:

```markdown
---
title: "Mel Kaye — A Brief Biography"
abstract: "Short description of the content"
author: "Author Name"
date: "2022-01-15"
parse_mode: "normal"
glossary_key: "TERM_KEY"
source_url: "https://example.com"
source_name: "Source Name"
source_author: "Source Author"
figures:
  auto: true
  base: 1
  template: "[[FIGURE_ABBR]] %index%"
---

# Content Title

Regular markdown content with **bold**, *italic*, [links](url), images, code blocks, etc.

This has an annotation reference[^](annotations/mel-kaye-bio) that opens a popover.

This has a glossary term[^](glossary/lgp-30) that also opens a popover.

/// This is a comment (triple-slash), stripped during parsing.

<div data-parse-mode="verse">
Lines in verse mode
preserve their line breaks
like poetry or code
</div>
```

### 3.3 Content Types

Defined in `src/consts.ts` as `CONTENT_TYPES`:

| Type | Directory | Purpose |
|------|-----------|---------|
| DOCS | `docs/` | Main documentation (The Story of Mel) |
| GLOSSARY | `glossary/` | Technical term definitions |
| ANNOTATION | `annotations/` | Inline annotations for documents |
| POSTS | `posts/` | Blog posts |
| ABOUT | `about/` | About section pages |
| CONTACT | `contact/` | Contact page content |
| CONTRIBUTE | `contribute/` | Contribution guidelines |
| CODEX | `codex/` | Reference/codex pages within docs |
| DEMO | `demo/` | Demo pages (development only) |

---

## 4. Content Processing Pipeline

The pipeline transforms markdown files into interactive React components through several stages:

```
Markdown File (.md)
       │
       ▼
[1] gray-matter ──► Frontmatter (IPageMetaData) + Raw Markdown
       │
       ▼
[2] simple-markdown ──► AST (ParsedNode[])
       │
       ▼
[3] processParseTree() ──► ML Node Tree (IMLParsedNode[])
       │  - Text merging/breaking by parse mode
       │  - Inline promotion in blockquotes
       │  - Figure detection and auto-captioning
       │  - Link definition resolution
       │  - Element ID processing
       │  - Anchor link resolution
       │
       ▼
[4] Node Processors ──► Annotated Node Tree
       │  - Popover link marking (annotations/glossary)
       │  - Sequential numbering
       │
       ▼
[5] JSON.stringify() ──► Serialized Props (string)
       │
       ▼
[6] getStaticProps ──► Page Props
       │
       ▼
[7] Browser: JSON.parse() ──► Deserialized Node Tree
       │
       ▼
[8] ContentComponent ──► React Elements
       │  - Recursive rendering per node type
       │  - Popover components for annotations
       │  - Lazy-loaded dynamic content
       │
       ▼
   Interactive HTML Page
```

### 4.1 Stage 1-2: Parsing

**Entry point:** `src/lib/markdown-driver.ts` → `loadContentFolder()`

- `gray-matter` extracts YAML frontmatter into `IPageMetaData`
- `simple-markdown` parses the markdown body into an AST
- Custom parser rules handle: triple-slash comments (`///`), HTML blocks with attributes, self-closing HTML tags

### 4.2 Stage 3: AST to ML Node Conversion

**Core logic:** `src/lib/content-utils.ts` (1,257 lines)

The `processParseTree()` function converts the raw AST into a richer `IMLParsedNode[]` tree with these transformations:

- **Parse modes:** NORMAL mode merges text runs and strips newlines. VERSE mode preserves line breaks (for poetry/code display)
- **Figure promotion:** Paragraphs containing only an image are promoted to FIGURE nodes with auto-generated captions
- **Inline promotion:** Inline elements inside blockquotes are lifted out of wrapper paragraphs
- **Link definitions:** Reference-style markdown links (`[text][ref]`) are resolved to their defined URLs
- **Element IDs:** HTML elements with `id` attributes are indexed for cross-referencing
- **Anchor links:** Internal `#anchor` links are resolved to display text (e.g., "Fig. 3")

### 4.3 Stage 4: Node Processors

**Key processor:** `createPopoverLinksMappingFilter()`

- Scans all LINK nodes for annotation/glossary URLs (detected via regex: `/annotations?\//i`, `/glossary\//i`)
- Marks matching links with `displayType: NODE_DISPLAY_TYPES.POPOVER`
- Sets `linkType` to `DynamicContentTypes.Annotation` or `DynamicContentTypes.Glossary`
- Assigns sequential `sequence` numbers for inline numbering

### 4.4 Node Types

**AST types (`ASTNODE_TYPES`):** paragraph, link, image, text, strong, em, list, code, codeBlock, blockQuote, heading, HTML, comment, newline, hr, table

**ML types (`MLNODE_TYPES`):** All AST types plus: FIGURE, FIGCAPTION, HR, CITE, TR, TD, TH, TBODY, LINE, DEL, U, SUP, SUB

### 4.5 The IMLParsedNode Interface

```typescript
interface IMLParsedNode {
  type: MLNODE_TYPES;              // Node type
  key: string;                     // Unique key (e.g., "ast-12345")
  line: number;                    // Source line number
  children?: IMLParsedNode[];      // Child nodes
  text?: string;                   // Leaf text content
  target?: string;                 // Link URL
  level?: number;                  // Heading level (1-6)
  ordered?: boolean;               // List ordering
  sequence?: number;               // Annotation/figure number
  displayType?: NODE_DISPLAY_TYPES; // POPOVER or NORMAL
  linkType?: DynamicContentTypes;  // Annotation, Glossary, or None
  elementId?: string;              // HTML element ID
  attributes?: Map<string, string>; // HTML attributes
}
```

---

## 5. Pages and Routing

### 5.1 Application Shell

**`_app.tsx`**: Wraps all pages with `AppContext`, handles router context, applies global font styles via styled-jsx.

**`_document.tsx`**: Custom HTML document that loads font-face links, manages theme from cookies, injects configuration script, applies theme class to root element.

### 5.2 Static Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.tsx` | Homepage — displays "The Story of Mel" with sticky featured section (Mel's CV link, avatar) |
| `/about` | `about.tsx` | About section landing |
| `/docs` | `docs.tsx` | Documentation hub — lists all doc sections as clickable buttons |
| `/posts` | `posts.tsx` | Blog listing — reverse chronological, shows title/date/author |
| `/glossary` | `glossary.tsx` | Glossary index — lists all terms |
| `/contact` | `contact.tsx` | Contact form with reCAPTCHA |
| `/contribute` | `contribute.tsx` | Contribution guidelines |
| `/404` | `404.tsx` | Not found page |

### 5.3 Dynamic Routes

| Route | File | Description |
|-------|------|-------------|
| `/about/[id]` | `about/[id].tsx` | Individual about pages |
| `/posts/[id]` | `posts/[id].tsx` | Individual blog post with back navigation |
| `/glossary/[id]` | `glossary/[id].tsx` | Glossary term detail with source/bibliography |
| `/docs/[id]` | `docs/[id]/index.tsx` | Documentation section |
| `/docs/[id]/pages` | `docs/[id]/pages/index.tsx` | Pages hub within a doc section |
| `/docs/[id]/pages/[pageId]` | `docs/[id]/pages/[pageId]/index.tsx` | Individual doc page |
| `/docs/[id]/codex` | `docs/[id]/codex/index.tsx` | Codex hub within a doc section |
| `/docs/[id]/codex/pages/[pageId]` | `docs/[id]/codex/pages/[pageId]/index.tsx` | Individual codex page |
| `/docs/[id]/resources` | `docs/[id]/resources/index.tsx` | Resources section |
| `/demo/[id]` | `demo/[id].tsx` | Demo pages (dev only, returns 404 in production) |
| `/contact/[id]` | `contact/[id].tsx` | Contact sub-pages |
| `/contribute/[id]` | `contribute/[id].tsx` | Contribute sub-pages |

### 5.4 URL Redirects

Legacy URLs are permanently redirected:
- `/docs/preface` → `/docs/the-story-of-mel/pages/preface`
- `/docs/mels-hack-the-missing-bits` → `/docs/the-story-of-mel/pages/mels-hack-the-missing-bits`
- `/docs/resources` → `/docs/the-story-of-mel/pages/resources`
- `/docs/blackjack-writeup` → `/docs/the-story-of-mel/pages/blackjack-writeup`

### 5.5 API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ping` | GET | Health check (returns "pong") |
| `/api/content` | GET | Fetch annotation/glossary content by type, locale, and optional document path |
| `/api/sendgrid` | POST | Send contact form email via SendGrid (validates input, max lengths) |
| `/api/captcha` | POST | Validate reCAPTCHA v3 token with Google |

The `/api/content` endpoint is critical — it serves annotation and glossary content to popovers at runtime. It supports document-scoped annotation lookup (walks up the folder hierarchy to find an `annotations/` directory) and caches responses to temp files.

---

## 6. Component Architecture

### 6.1 Component Inventory (~64 components)

**Layout & Navigation:**
- `Layout` — Main wrapper providing theme/locale contexts
- `Header` — Logo and navigation trigger
- `TopBar` — Desktop bar (header + menu + locale selector)
- `Footer` — Site footer
- `Page` — Content area wrapper
- `Menu` — Desktop navigation (Radix NavigationMenu)
- `MobileMenu` — Mobile burger menu (react-burger-menu)
- `MenuProvider` — Switches between desktop/mobile based on viewport (1024px breakpoint)
- `LocaleSelector` — Language switcher
- `ThemeSelector` — Light/dark toggle
- `ScrollBar` — Custom scroll area (Radix ScrollArea)

**Content Rendering (the core system):**
- `ContentIterator` — Recursively renders an array of parsed nodes
- `ContentComponent` — Central dispatcher mapping `MLNODE_TYPES` to React components
- `LinkSelector` — Routes between regular links, annotation links, and glossary term links
- `Paragraph`, `Heading`, `Line`, `BlockQuote`, `CodeBlock`, `Table`, `ListItem` — Block components
- `CustomImage`, `Figure` — Image and figure rendering
- `AnnotationLink` — Numbered inline annotation trigger (renders `[01]`, `[02]`, etc. via CSS pseudo-elements)
- `TermLink` — Glossary term trigger
- `GenericPage` — Reusable page wrapper for standard content pages

**Dynamic Content:**
- `DynamicContentViewer` — Renders fetched annotation/glossary content in a scrollable area
- `DynamicContentBrowser` — Browse/search dynamic content
- `DynamicContentToolbar` — Toolbar for content interactions

**Interactive:**
- `Popover` — Radix UI Popover wrapper for annotations/glossary
- `PopoverToolbar` — Toolbar within popovers
- `PopoverCloseButton` — Close button
- `Note` — Displays notes/annotations with type ("note" or "ref")

**Radix Primitives (wrapped):**
- `NavigationMenu` — Styled with Stitches animations
- `Popover` — ForwardRef wrapper
- `Tooltip` — ForwardRef wrapper
- `ScrollArea` — ForwardRef wrapper
- `ToggleGroup` — ForwardRef wrapper
- `createCompRef` — Utility for creating forwardRef wrappers

**Form System:**
- `Form` — Main form with field validation
- `Field` — Individual field with validation states (INITIAL, EDITED, VALID, INVALID)
- `ContactForm` — Contact form wrapper
- `Captcha` — Google reCAPTCHA wrapper
- `useFormField` — Hook for field state
- `validations.ts` — Validation rules

**UI Components:**
- `Button` — Versatile button (links, callbacks, icons)
- `TimeFormat` — Date/time display (uses date-fns)
- `LoadingIndicator` — Animated spinner

### 6.2 Content Rendering Flow

```
Layout
└── ScrollArea (Radix)
    ├── TopBar
    │   ├── Header (logo)
    │   ├── MenuProvider → Menu (desktop) | MobileMenu (mobile)
    │   └── LocaleSelector
    ├── Page
    │   └── ContentIterator (recursive)
    │       └── ContentComponent (dispatcher)
    │           ├── Paragraph → children via ContentComponent
    │           ├── Heading → children via ContentComponent
    │           ├── LinkSelector
    │           │   ├── Regular link → <a> or Next.js <Link>
    │           │   └── Popover link → Popover (Radix)
    │           │       ├── Trigger: AnnotationLink or TermLink
    │           │       └── Content: DynamicContentViewer
    │           │           └── (fetches from /api/content)
    │           ├── Figure → CustomImage + Figcaption
    │           ├── Table → TR → TD/TH
    │           ├── CodeBlock, BlockQuote, etc.
    │           └── Inline: strong, em, code, del, u, sup, sub
    └── Footer
```

### 6.3 The Annotation Popover Flow

1. During content processing, annotation links are marked with `displayType: POPOVER` and `linkType: Annotation`
2. `LinkSelector` detects the popover display type and wraps the link in a Radix `Popover`
3. The trigger renders as `AnnotationLink` showing a bracketed number (e.g., `[03]`)
4. On click, `DynamicContentViewer` calls `DynamicContentServer.getItems()`
5. The server checks its in-memory cache; on miss, fetches from `/api/content?type=annotation&locale=en&document=...`
6. The API loads and parses the annotation markdown file, returning parsed nodes
7. The viewer renders the annotation content in a scrollable `Note` component

---

## 7. Styling System

### 7.1 Stylable CSS (Primary)

Stylable is a CSS preprocessor by Wix providing namespaced, typed CSS with mixins and design tokens.

**Theme structure:**
```
src/theme/
├── common/
│   ├── colors.st.css      # Color palette (19 colors + shadows)
│   ├── typography.st.css   # Font stacks, heading styles
│   ├── globals.st.css      # HTML resets
│   ├── mixins.st.css       # Reusable style mixins
│   └── assets.st.css       # Logo assets
├── light/
│   ├── vars.st.css         # Light theme color variables
│   └── style.st.css        # Light theme mixin applications
└── dark/
    ├── vars.st.css          # Dark theme color variables
    └── style.st.css         # Dark theme mixin applications
```

**Component styling pattern:** Each component has two `.st.css` files:
- `component.st.css` — Structure and layout
- `component-mixin.st.css` — Themeable variables exposed as mixin parameters

Themes apply mixins to all components via scoped namespace blocks:
```css
@st-scope .root {
  Layout { -st-mixin: LayoutMixin(BgColor value(LAYOUT_BG_COLOR)); }
  Button { -st-mixin: ButtonMixin(...); }
}
```

### 7.2 Stitches (Secondary)

Used for Radix UI component animations (enter/exit transitions, slide animations) and complex responsive styles. Stitches is applied to the Radix primitive wrappers in `src/components/radix-primitives/`.

### 7.3 Fonts

- **Latin text:** Roboto Slab (weights: 300, 500, 700)
- **Hebrew text:** Assistant (weights: 300, 500, 700)
- Loaded via font-face links in `_document.tsx`

---

## 8. State Management

All state is managed via React Context (no external state library):

### 8.1 ThemeContext
- Manages light/dark theme
- Persists to cookies via `js-cookie`
- Updates DOM classList on root element
- API: `theme`, `isDarkTheme`, `setTheme()`, `toggleTheme()`

### 8.2 LocaleContext
- Provides `translate(key)` function for i18n
- Manages locale (en/he), text direction (ltr/rtl)
- Provides site/page metadata (title, subtitle, page name, section name)
- Spawns sub-contexts: `LocaleMetaContext`, `LocalePageContext`

### 8.3 PageContext
- Provides `DynamicContentServer` instance for annotation/glossary fetching
- Stores current document path

### 8.4 PopoverContext
- Manages toolbar items within popovers
- API: `toolbar`, `addToolbarItems()`, `removeToolbarItems()`

### 8.5 DynamicContentContext
- Stack-based navigation context for nested dynamic content
- Tracks current node/page with unique key-based deduplication

---

## 9. Internationalization (i18n)

### 9.1 Configuration

Next.js i18n routing with two locales:
- `en` (English, LTR) — default
- `he` (Hebrew, RTL)

### 9.2 Translation Files

```
src/locales/
├── common/
│   └── locales.json         # Shared locale labels
├── en/
│   ├── site.json            # UI strings
│   ├── authors.json         # Author names
│   ├── glossary.json        # Glossary term translations
│   └── content.json         # Content strings
├── he/
│   └── (same structure)
└── keymap/
    ├── types.ts             # IComponentKeyProps interface
    ├── pages.ts             # Page-specific locale keys
    └── common.ts            # Shared key mappings
```

### 9.3 Translation Function

```typescript
translate(key: string, lang?: string): string
```
- Looks up key in current locale
- Falls back to reference locale
- Returns `%KEY%` wrapped string if not found (visible in debug mode)
- Keys are UPPERCASED_WITH_UNDERSCORES

### 9.4 RTL Support

- Text direction derived from locale (`he` → `rtl`, `en` → `ltr`)
- Stylable CSS states handle directional styling: `.root:textDirection(rtl) { ... }`
- Flexbox order manipulation for RTL layouts
- Font family switches between Roboto Slab (Latin) and Assistant (Hebrew)

---

## 10. Data Fetching Strategy

### 10.1 Build-Time: Static Generation

All pages use `getStaticProps` + `getStaticPaths` for static generation.

**Key utility functions** (`src/lib/next-utils.ts`):

- `getFolderStaticProps(folderPath, locale, loadMode, contentMode)` — Loads content from the file system, returns stringified JSON as props
- `getFolderStaticPaths(contentType)` — Generates path permutations (locale × content items)
- `getNestedStaticPaths(contentType, fileAbsolutePath)` — Handles deeply nested routes (e.g., `/docs/[id]/pages/[pageId]`)
- `populateDynamicPath(fileAbsolutePath)` — Resolves dynamic route segments from file location to content path

**Load modes:**
- `LoadFolderModes.FOLDER` — Load a single folder's index content
- `LoadFolderModes.CHILDREN` — Load all immediate children
- `LoadContentModes.METADATA` — Frontmatter only (fast)
- `LoadContentModes.FULL` — Complete parsed content

### 10.2 Runtime: API

The `/api/content` endpoint serves dynamic content (annotations, glossary) at runtime:

**Request:** `GET /api/content?type=annotation&locale=en&document=docs/the-story-of-mel`

**Response:**
```json
{
  "data": {
    "locale": "en",
    "items": {
      "mel-kaye-bio": {
        "id": "mel-kaye-bio",
        "path": "docs/the-story-of-mel/annotations/mel-kaye-bio",
        "metaData": { "title": "...", "abstract": "..." },
        "parsed": [/* IMLParsedNode[] */]
      }
    }
  }
}
```

**Caching:** Server-side caches to temp files (`/tmp`). Client-side `DynamicContentServer` caches in memory.

### 10.3 Serialization

Content is serialized to JSON strings in `getStaticProps` because Next.js cannot serialize complex objects (Maps, custom classes). The browser deserializes via `mlNextBrowserUtils.getParsedPagedData()`.

---

## 11. Utility Libraries

### 11.1 content-utils.ts (1,257 lines)
The largest and most complex file. Handles all markdown AST → ML node tree transformations. Key functions:
- `processParseTree()` — Main conversion pipeline
- `createPopoverLinksMappingFilter()` — Marks annotation/glossary links
- `urlToContentData()` — Extracts content type and ID from URLs
- `stripComments()` — Removes HTML/XML comments

### 11.2 markdown-driver.ts
Entry point for content loading. Reads filesystem, parses markdown, returns structured content.

### 11.3 next-utils.ts
Static generation helpers for `getStaticProps` and `getStaticPaths`.

### 11.4 ml-utils.ts
General utilities: `uniqueId()`, `arrayToMap()`, `parseDate()`, `safeMerge()`, `clonePlainObject()`, `flattenArray()`

### 11.5 api-utils.ts
API caching: `getFromCache()`, `saveToCache()` using temp files.

### 11.6 html-validator.ts
Validates HTML attributes per tag. Uses case-insensitive collections for robust matching.

### 11.7 dynamic-content-server.ts
Client-side content fetcher with in-memory cache. Lazy-loads annotations/glossary via `/api/content`.

### 11.8 favicon-animator.ts
Animates the favicon (likely for loading states).

---

## 12. Configuration

### 12.1 Menu Data (`src/config/menu-data.ts`)
Defines navigation structure with sections, items, and child types (codex, article, page, link, external).

### 12.2 Pages Data (`src/config/pages-data.ts`)
12 site pages with locale key mappings for titles and section names.

### 12.3 Theme Config (`src/config/themes.ts`)
Theme definitions ("light", "dark", "base") with Stylable CSS class references.

### 12.4 Font Config (`src/config/site-fonts-data.ts`)
Font-face link definitions for Google Fonts.

### 12.5 MLConfig (`src/config/index.tsx`)
Runtime configuration class stored as `window.__MLCONFIG__`. Manages theme state with cookie persistence.

---

## 13. Testing

### 13.1 E2E Tests (Playwright)
- **Location:** `e2e/`
- **Projects:** Site, Glossary, Codex (each in Desktop Chrome)
- **Configuration:** 4 workers, 2 retries, 30s timeout, video on failure
- **Web server:** Auto-starts `yarn dev`

### 13.2 Unit Tests (Vitest)
- **Location:** `__tests__/`
- **Tests:** `sendgrid.spec.ts`, `e2e-test-utils.spec.ts`

### 13.3 CI/CD (CircleCI)
- **Docker:** Node 18.12 + Playwright 1.28.1
- **Jobs:** ESLint, unit tests, E2E (site/glossary/codex) — all run in parallel
- **E2E site tests** parallelized across 4 workers

---

## 14. Build & Deployment

### 14.1 Scripts
| Command | Purpose |
|---------|---------|
| `yarn dev` | Development server |
| `yarn build` | Production build (static generation) |
| `yarn start` | Production server |
| `yarn lint` | ESLint with codeframe formatter |
| `yarn test:e2e` | Playwright E2E tests |
| `yarn test:unit` | Vitest unit tests |
| `yarn build:sitemap` | Generate sitemap |
| `yarn upload` | Upload files to S3 |

### 14.2 Webpack Customization
- Stylable Webpack Plugin integrates `.st.css` processing
- Stylable files excluded from standard CSS loaders
- Optimized output: `static/css/stylable.[contenthash].css`

### 14.3 Environment Variables
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_ML_DEBUG` | Debug mode flag |
| `NEXT_PUBLIC_RECAPTCHA_KEY` | Google reCAPTCHA site key |
| `NEXT_PUBLIC_SENDGRID_API_KEY` | SendGrid API key |
| `NEXT_PUBLIC_ANALYTICS_ID` | Google Analytics ID |

---

## 15. Key Architectural Patterns

1. **Content-driven static generation** — All known pages are pre-rendered at build time from markdown files
2. **Recursive component rendering** — `ContentComponent` dispatches node types to specific components, which render their children via `ContentComponent` again
3. **Lazy-loaded dynamic content** — Annotations and glossary terms are fetched on-demand via API, not bundled into every page
4. **Dual CSS systems** — Stylable for design tokens/theming, Stitches for animations
5. **Mixin-based theming** — Theme variables flow through Stylable mixins to all components
6. **Context-based state** — All global state (theme, locale, page, popover) managed via React Context
7. **Serialization workaround** — Complex objects serialized to JSON strings to work around Next.js prop limitations
8. **Document-scoped annotations** — The API walks up the folder hierarchy to find annotations relevant to a specific document
9. **Case-insensitive collections** — Custom Map/Set implementations for robust content ID lookups
10. **Bilingual-first design** — RTL/LTR awareness built into every layer (CSS, components, content loading)
