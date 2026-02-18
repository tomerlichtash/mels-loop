# Mel's Loop — Complete Rewrite Plan

## Context

Mel's Loop is a Next.js site that renders markdown content into richly annotated HTML pages about "The Story of Mel." It currently supports a single story with annotations, glossary, articles, and blog posts, with bilingual (en/he) support.

**Why rewrite:** The current architecture (Pages Router, Stylable CSS-in-JS, simple-markdown, single-story design) has reached its limits. We want to transform it into a **multi-story platform** where each story is a self-contained collection of artifacts (annotations, articles, resources, codex). The tech stack needs modernizing — CSS-in-JS replaced with CSS variables, a proper UI library, a robust markdown pipeline, and App Router.

**Decisions made:**
- **pnpm** (package manager)
- **Next.js App Router** (latest)
- **Mantine v8** (UI library — CSS Modules, CSS variables, built-in RTL, light/dark)
- **CSS Modules + CSS custom properties** (design system)
- **unified/remark/rehype** (markdown processing)
- **Google Fonts via next/font** (typography)
- **TypeScript strict mode ON**
- **No Tailwind, no CSS-in-JS runtime**

---

## 1. New Content Structure

Move content from `public/content/` to `content/` at project root (no need to serve raw markdown; build-time access only).

```
content/
  stories/
    the-story-of-mel/
      index.en.md / index.he.md       # Story landing content
      story.json                       # Story config (slug, order, artifacts, navigation)
      annotations/
        mel-kaye-bio/index.en.md
        drum-memory/index.en.md
        ...
      articles/                        # Renamed from "pages/" to avoid Next.js confusion
        preface/index.en.md
        mels-hack-the-missing-bits/index.en.md
        ...
      resources/index.en.md
      codex/
        index.en.md
        pages/page-id/index.en.md
  glossary/                            # Shared across all stories
    drum-memory/index.en.md
    lgp-30/index.en.md
    ...
  posts/
    welcome/index.en.md
  pages/                               # Static pages (about, contact, contribute)
    about/index.en.md
    contact/index.en.md
    contribute/index.en.md
```

Each story gets a `story.json`:
```json
{
  "slug": "the-story-of-mel",
  "order": 1,
  "featured": true,
  "artifacts": ["annotations", "articles", "resources", "codex"],
  "navigation": [
    { "type": "article", "id": "preface" },
    { "type": "article", "id": "mels-hack-the-missing-bits" },
    { "type": "resource", "id": "resources" }
  ]
}
```

---

## 2. Route Structure (App Router)

i18n via `[locale]` dynamic segment (App Router doesn't have built-in i18n like Pages Router).

```
src/app/
  [locale]/
    layout.tsx                   # Root layout: Mantine + i18n + fonts providers
    page.tsx                     # Home (stories listing / featured story)
    stories/
      page.tsx                   # All stories listing
      [storySlug]/
        page.tsx                 # Story landing
        articles/
          page.tsx               # Articles listing
          [articleSlug]/page.tsx  # Individual article
        resources/page.tsx       # Resources
        codex/
          page.tsx               # Codex landing
          [pageSlug]/page.tsx    # Codex page
    glossary/
      page.tsx                   # Glossary index
      [termSlug]/page.tsx        # Term detail
    posts/
      page.tsx                   # Blog listing
      [postSlug]/page.tsx        # Individual post
    about/page.tsx
    contact/page.tsx
    contribute/page.tsx
  api/
    sendgrid/route.ts            # Contact form email
    captcha/route.ts             # reCAPTCHA validation
  not-found.tsx
middleware.ts                    # Locale detection & redirect
```

### URL examples

| URL | What it shows |
|-----|--------------|
| `/en` | Home — featured story or stories list |
| `/he` | Home in Hebrew |
| `/en/stories/the-story-of-mel` | Story landing page |
| `/en/stories/the-story-of-mel/articles/preface` | Preface article |
| `/en/stories/the-story-of-mel/resources` | Resources page |
| `/en/stories/the-story-of-mel/codex` | Codex landing |
| `/en/glossary` | Glossary index |
| `/en/glossary/drum-memory` | Glossary term |
| `/en/posts` | Blog listing |

### Redirects for backward compatibility

All current URLs get 301 redirects in `next.config.ts`:
- `/docs/*` → `/en/stories/*`
- `/docs/the-story-of-mel/pages/:slug` → `/en/stories/the-story-of-mel/articles/:slug`
- `/glossary/:id` → `/en/glossary/:id`
- `/posts/:id` → `/en/posts/:id`
- `/about`, `/contact`, `/contribute` → `/en/about`, etc.

---

## 3. Markdown Processing Pipeline

Replace `simple-markdown` + the 1,257-line `content-utils.ts` with the unified ecosystem.

### Packages
- `unified`, `remark-parse`, `remark-gfm` (tables, strikethrough)
- `remark-frontmatter`, `gray-matter` (frontmatter)
- `remark-directive` (custom directives)
- `remark-rehype`, `rehype-raw` (HTML passthrough)
- `hast-util-to-jsx-runtime` (hast → React elements)

### Pipeline flow
```
.md file
  → gray-matter (extract frontmatter + body)
  → unified()
    .use(remarkParse)
    .use(remarkGfm)                     # Tables, strikethrough
    .use(remarkStripComments)           # Custom: remove /// comments
    .use(remarkAnnotationLinks)         # Custom: mark [^](annotations/id) with data attrs
    .use(remarkGlossaryLinks)           # Custom: mark [^](glossary/id) with data attrs
    .use(remarkFigures)                 # Custom: promote image-only paragraphs to <figure>
    .use(remarkVerse)                   # Custom: handle parse_mode: verse
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)                     # Parse raw HTML blocks
  → hast tree (serializable JSON)
  → hast-util-to-jsx-runtime (with component overrides) → React elements
```

### Custom remark plugins

**`remark-annotation-links`**: Visits link nodes, detects `annotations/` or `glossary/` URLs, adds `data-link-type`, `data-link-target`, `data-sequence` via `node.data.hProperties`. These attributes survive the remark→rehype transform.

**`remark-figures`**: Detects paragraphs containing only an image, promotes to `<figure>` with auto-generated `<figcaption>` using frontmatter config (`figures.template`, `figures.base`).

**`remark-strip-comments`**: Removes paragraphs starting with `///`.

**`remark-verse`**: When frontmatter has `parse_mode: verse`, converts newlines to `<br>` to preserve line breaks.

### Rendering: `hast-util-to-jsx-runtime`

Instead of a custom recursive `ContentComponent` dispatcher, pass a `components` map:

```typescript
const components = {
  a: AnnotationAwareLink,   // Routes annotation/glossary/regular links
  figure: Figure,
  pre: CodeBlock,
  table: StyledTable,
  img: OptimizedImage,
};
toJsxRuntime(hast, { Fragment, jsx, jsxs, components });
```

### Key simplification: annotations loaded at build time

**All annotation and glossary content is embedded in page props at build time.** No runtime `/api/content` endpoint. Popovers open instantly from pre-loaded data.

This eliminates: `/api/content`, `DynamicContentServer`, runtime caching, loading states in popovers.

The content volume is small (~26 annotations, ~35 glossary terms), so embedding adds ~50-100KB per page — acceptable for a static site. If volume grows, annotations can be lazy-loaded via React Server Components.

---

## 4. Design System

### CSS custom properties (`src/styles/tokens.css`)

```css
:root {
  /* Colors (semantic, remapped in dark theme) */
  --ml-color-bg: #ffffff;
  --ml-color-bg-surface: #f8f9fa;
  --ml-color-text-primary: #212529;
  --ml-color-text-secondary: #868e96;
  --ml-color-text-muted: #ced4da;
  --ml-color-border: #e9ecef;
  --ml-color-link: #0050b3;
  --ml-color-link-hover: #1890ff;
  --ml-color-annotation: #fa8c16;

  /* Typography */
  --ml-font-family-latin: 'Roboto Slab', Georgia, serif;
  --ml-font-family-hebrew: 'Assistant', 'Segoe UI', sans-serif;
  --ml-font-family-mono: 'JetBrains Mono', monospace;
  --ml-font-size-xs: 0.75rem;    /* 12px */
  --ml-font-size-sm: 0.875rem;   /* 14px */
  --ml-font-size-md: 1rem;       /* 16px */
  --ml-font-size-lg: 1.125rem;   /* 18px */
  --ml-font-size-xl: 1.25rem;    /* 20px */
  --ml-font-size-2xl: 1.5rem;    /* 24px */
  --ml-font-size-3xl: 1.875rem;  /* 30px */
  --ml-font-size-4xl: 2.25rem;   /* 36px */
  --ml-line-height-tight: 1.3;
  --ml-line-height-normal: 1.6;
  --ml-line-height-loose: 1.8;
  --ml-font-weight-light: 300;
  --ml-font-weight-regular: 400;
  --ml-font-weight-medium: 500;
  --ml-font-weight-bold: 700;

  /* Spacing */
  --ml-space-xs: 0.25rem;  --ml-space-sm: 0.5rem;
  --ml-space-md: 1rem;     --ml-space-lg: 1.5rem;
  --ml-space-xl: 2rem;     --ml-space-2xl: 3rem;
  --ml-space-3xl: 4rem;

  /* Layout */
  --ml-content-max-width: 48rem;
  --ml-page-max-width: 72rem;
  --ml-header-height: 4rem;

  /* Borders, Radius, Shadows */
  --ml-radius-sm: 4px;  --ml-radius-md: 8px;  --ml-radius-lg: 12px;
  --ml-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --ml-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --ml-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --ml-transition-fast: 150ms ease;
  --ml-transition-normal: 250ms ease;
}
```

### Dark theme

```css
[data-mantine-color-scheme="dark"] {
  --ml-color-bg: #1a1b1e;
  --ml-color-bg-surface: #25262b;
  --ml-color-text-primary: #c1c2c5;
  --ml-color-text-secondary: #909296;
  --ml-color-border: #373a40;
  --ml-color-link: #74b3ff;
  --ml-color-annotation: #ffa940;
  /* ... etc */
}
```

### Google Fonts via `next/font/google`

```typescript
// src/lib/fonts.ts
import { Roboto_Slab, Assistant } from 'next/font/google';
export const robotoSlab = Roboto_Slab({ subsets: ['latin'], variable: '--ml-font-family-latin', display: 'swap' });
export const assistant = Assistant({ subsets: ['hebrew', 'latin'], variable: '--ml-font-family-hebrew', display: 'swap' });
```

### Mantine theme

Custom theme pointing to our CSS variables for `fontFamily`, `headings.fontFamily`, `fontFamilyMonospace`.

### RTL strategy
- `dir="rtl"` on `<html>` for Hebrew locale
- CSS logical properties (`margin-inline-start`, `padding-inline-end`) in all CSS Modules
- `--ml-font-family-body` set per locale (Latin vs Hebrew font)
- Mantine auto-flips all its components for RTL

---

## 5. i18n Architecture

```
src/i18n/
  config.ts           # locales = ['en', 'he'], defaultLocale = 'en'
  server.ts           # getDictionary(locale), getDirection(locale)
  client.ts           # useTranslation() hook (React Context)
  messages/
    en.json           # All UI strings in English
    he.json           # All UI strings in Hebrew
```

- **UI translations**: JSON files, loaded per-locale in the root layout
- **Content translations**: Locale-specific markdown files (`index.en.md` / `index.he.md`)
- **Middleware**: Detects locale from cookies/Accept-Language, redirects if no `[locale]` prefix
- Locale context provides: `locale`, `direction`, `t(key)`

---

## 6. Component Architecture

```
src/components/
  shell/           # AppShell, Header, Footer, NavMenu, MobileDrawer, LocaleSwitcher, ThemeSwitcher
  content/         # ContentRenderer, AnnotationAwareLink, AnnotationPopover, GlossaryPopover,
                   # Figure, CodeBlock, Verse, StyledTable, OptimizedImage, AnnotationProvider
  story/           # StoryCard, StoryNav, ArticleLayout
  glossary/        # GlossaryList, GlossaryEntry
  posts/           # PostList, PostCard
  forms/           # ContactForm (Mantine form components)
  ui/              # Button, TimeFormat
```

### Key components

- **`ContentRenderer`** — Takes serialized hast + annotations/glossary maps, renders via `hast-util-to-jsx-runtime`
- **`AnnotationAwareLink`** — Checks `data-link-type` attr → renders Mantine `Popover` for annotations/glossary, or regular `Link`
- **`AnnotationPopover`** — Mantine `Popover` + `ScrollArea`, reads annotation content from `AnnotationProvider` context
- **`AppShell`** — Mantine `AppShell` with responsive header/navigation/footer

---

## 7. Full Project Structure

```
mels-loop/
  content/                    # All markdown content (see section 1)
  src/
    app/                      # Next.js App Router (see section 2)
    components/               # React components (see section 6)
    lib/
      content/
        loaders.ts            # FS-based content loading functions
        types.ts              # Content type definitions
      markdown/
        pipeline.ts           # unified pipeline config
        render.tsx            # hast → React rendering
        plugins/              # Custom remark/rehype plugins
          remark-strip-comments.ts
          remark-annotation-links.ts
          remark-glossary-links.ts
          remark-figures.ts
          remark-verse.ts
        types.ts
      fonts.ts                # Google Fonts config
      theme.ts                # Mantine theme config
    i18n/                     # Translations and locale utils
    styles/
      tokens.css              # Design system CSS variables
      content.module.css      # Shared content typography
    middleware.ts              # Locale detection & redirect
  public/images/              # Static images
  tests/
    e2e/                      # Playwright
    unit/                     # Vitest
  next.config.ts
  tsconfig.json
  package.json
  pnpm-lock.yaml
```

---

## 8. Migration Strategy (Phased)

### Phase 1: Foundation
- Init new Next.js project (pnpm, TypeScript strict, App Router)
- Install + configure Mantine v8
- Set up design system tokens (`tokens.css`, dark theme)
- Configure Google Fonts via `next/font`
- Build AppShell (header, footer, responsive nav)
- Implement i18n (middleware, locale layout, JSON translations)
- **Verify**: renders a hello-world page with correct locale, theme, fonts

### Phase 2: Markdown Pipeline
- Copy content files to new `content/` structure (rename `pages/` → `articles/`)
- Create `story.json` for The Story of Mel
- Build unified pipeline with standard plugins
- Implement custom remark plugins one at a time:
  1. `remark-strip-comments`
  2. `remark-annotation-links`
  3. `remark-figures`
  4. `remark-verse`
- Build `ContentRenderer` + basic content block components
- **Verify**: preface article renders correctly, compare to current site

### Phase 3: Annotations & Glossary
- Build content loaders for annotations + glossary
- Build `AnnotationProvider` context
- Build `AnnotationPopover` + `GlossaryPopover` with Mantine Popover
- Build `AnnotationAwareLink`
- **Verify**: codex page renders with working annotation popovers

### Phase 4: All Routes
- Build all page routes (story, articles, resources, codex, glossary, posts, about, contact, contribute)
- Implement contact form with SendGrid + reCAPTCHA
- Set up URL redirects for old routes
- **Verify**: all current pages accessible and rendering correctly

### Phase 5: Multi-Story Architecture
- Build story listing page (home)
- Implement `story.json` loading and story card components
- Ensure `generateStaticParams` iterates all stories
- Test with a stub second story
- **Verify**: adding a new story folder + `story.json` produces a new set of pages

### Phase 6: Polish & Testing
- E2E tests (Playwright, adapt existing scenarios)
- Unit tests for markdown plugins (Vitest)
- RTL testing with Hebrew content
- SEO metadata (`generateMetadata` per page)
- Sitemap generation
- Analytics integration
- Accessibility audit

---

## 9. Verification Checklist

1. `pnpm build` completes with no errors
2. Every current URL either works at new path or redirects correctly
3. Annotation popovers: click number → popover opens with correct content
4. Glossary popovers: click term → popover opens with definition
5. Bilingual: switch locale → all UI strings and content switch, RTL for Hebrew
6. Theme: toggle dark/light → all components respect theme, persists across refreshes
7. Figures: images auto-promoted to figures with captions and numbering
8. Verse mode: content with `parse_mode: verse` preserves line breaks
9. Tables: GFM tables render correctly
10. Contact form: submit → email sent via SendGrid with reCAPTCHA
11. E2E tests pass
12. Unit tests pass

---

## 10. Reference: Current Files → New Equivalents

| Current file | What it contains | New equivalent |
|---|---|---|
| `src/lib/content-utils.ts` (1257 lines) | All content processing | Individual plugins in `src/lib/markdown/plugins/` |
| `src/lib/markdown-driver.ts` | Content loading + parsing | `src/lib/content/loaders.ts` + `src/lib/markdown/pipeline.ts` |
| `src/components/content/content-component/` | Recursive node→component dispatch | `components` map in `hast-util-to-jsx-runtime` |
| `src/components/content/link-selector/` | Annotation/glossary/regular link routing | `src/components/content/AnnotationAwareLink.tsx` |
| `src/interfaces/models.ts` | `IMLParsedNode`, `IPageMetaData`, types | `src/lib/content/types.ts` + hast types |
| `src/contexts/` | Theme, locale, page, popover contexts | Mantine providers + i18n context + annotation context |
| `src/lib/next-utils.ts` | `getFolderStaticProps/Paths` | `generateStaticParams()` + content loaders per page |
| `src/theme/` (Stylable) | Design tokens + light/dark themes | `src/styles/tokens.css` + Mantine theme |
| `src/locales/` | Translation files + keymap | `src/i18n/messages/en.json` + `he.json` |
