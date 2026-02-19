# Mel's Loop Rewrite — Implementation Plan

## Phase 1: Project Scaffold & Foundation

### Step 1.1: Initialize new Next.js project

- Remove all current `src/`, config files, and `node_modules/`
- Keep: `public/content/`, `AGENTS.md`, `PROJECT-ARCHITECTURE.md`, `REWRITE-PLAN.md`, `.git/`, `e2e/` (for reference)
- Init new Next.js App Router project with pnpm and TypeScript
- Configure `tsconfig.json` with `strict: true`
- Create `next.config.ts` (TypeScript config)

### Step 1.2: Install core dependencies

```
pnpm add @mantine/core @mantine/hooks @mantine/form
pnpm add -D postcss postcss-preset-mantine
```

### Step 1.3: Design system tokens

- Create `src/styles/tokens.css` — CSS custom properties (colors, typography, spacing, layout, shadows)
- Create dark theme overrides in same file using `[data-mantine-color-scheme="dark"]`
- Create `src/styles/globals.css` — CSS reset + import tokens

### Step 1.4: Google Fonts

- Create `src/lib/fonts.ts` — configure `Roboto_Slab` and `Assistant` via `next/font/google`

### Step 1.5: Mantine theme

- Create `src/lib/theme.ts` — Mantine `createTheme()` referencing our CSS variables
- Create `postcss.config.mjs` for Mantine's PostCSS preset

### Step 1.6: i18n foundation

- Create `src/i18n/config.ts` — locale types, supported locales, default
- Create `src/i18n/messages/en.json` — initial UI strings (site title, nav items, footer text)
- Create `src/i18n/messages/he.json` — Hebrew equivalents
- Create `src/i18n/server.ts` — `getDictionary()`, `getDirection()`
- Create `src/i18n/client.tsx` — `I18nProvider`, `useTranslation()` hook
- Create `src/middleware.ts` — locale detection, redirect to `/{locale}/...`

### Step 1.7: Root layout

- Create `src/app/layout.tsx` — bare HTML shell
- Create `src/app/[locale]/layout.tsx` — MantineProvider, ColorSchemeScript, I18nProvider, fonts, `dir` attribute

### Step 1.8: AppShell components

- Create `src/components/shell/AppShell.tsx` — Mantine AppShell (header + main + footer)
- Create `src/components/shell/Header/Header.tsx` — logo, nav trigger
- Create `src/components/shell/Footer/Footer.tsx` — basic footer
- Create `src/components/shell/Navigation/NavMenu.tsx` — desktop nav (Mantine NavLink or custom)
- Create `src/components/shell/Navigation/MobileDrawer.tsx` — mobile nav (Mantine Drawer)
- Create `src/components/shell/ThemeSwitcher/ThemeSwitcher.tsx` — Mantine ActionIcon + useMantineColorScheme
- Create `src/components/shell/LocaleSwitcher/LocaleSwitcher.tsx` — locale toggle

### Step 1.9: Hello world page

- Create `src/app/[locale]/page.tsx` — simple home page with translated text
- **Verify**: `pnpm dev` → `/en` shows English, `/he` shows Hebrew with RTL, theme toggle works, fonts load

---

## Phase 2: Content Migration & Markdown Pipeline

### Step 2.1: Migrate content files

- Create `content/` directory at project root
- Copy `public/content/docs/the-story-of-mel/` → `content/stories/the-story-of-mel/`
- Rename `pages/` subdirectory → `articles/`
- Copy `public/content/glossary/` → `content/glossary/`
- Copy `public/content/posts/` → `content/posts/`
- Copy `public/content/about/` → `content/pages/about/`
- Copy `public/content/contact/` → `content/pages/contact/`
- Copy `public/content/contribute/` → `content/pages/contribute/`
- Create `content/stories/the-story-of-mel/story.json`

### Step 2.2: Content type definitions

- Create `src/lib/content/types.ts` — `ProcessedContent`, `StoryConfig`, `ContentMetadata`, `Locale` re-export

### Step 2.3: Install markdown dependencies

```
pnpm add unified remark-parse remark-gfm remark-rehype remark-frontmatter
pnpm add rehype-raw rehype-stringify
pnpm add gray-matter
pnpm add hast-util-to-jsx-runtime
pnpm add unist-util-visit
pnpm add -D @types/hast @types/mdast
```

### Step 2.4: Build unified pipeline

- Create `src/lib/markdown/pipeline.ts` — `processMarkdown(content, metadata)` function
  - Configure unified chain: remarkParse → remarkGfm → remarkRehype → rehypeRaw
  - Returns serializable hast tree
- Create `src/lib/markdown/types.ts` — plugin option types

### Step 2.5: Custom remark plugin — strip comments

- Create `src/lib/markdown/plugins/remark-strip-comments.ts`
- Removes paragraphs starting with `///`
- Reference: current logic in `src/lib/content-utils.ts` `stripComments()`
- Write unit test

### Step 2.6: Custom remark plugin — annotation links

- Create `src/lib/markdown/plugins/remark-annotation-links.ts`
- Detect links matching `[^](annotations/...)` pattern
- Add `data-link-type`, `data-link-target`, `data-sequence` via `node.data.hProperties`
- Reference: current `urlToContentData()` and `createPopoverLinksMappingFilter()` in `content-utils.ts`
- Write unit test

### Step 2.7: Custom remark plugin — glossary links

- Create `src/lib/markdown/plugins/remark-glossary-links.ts`
- Detect links matching `[^](glossary/...)` pattern
- Add `data-link-type: glossary`, `data-link-target` via `node.data.hProperties`
- Write unit test

### Step 2.8: Custom remark plugin — figures

- Create `src/lib/markdown/plugins/remark-figures.ts`
- Detect paragraphs containing only an image → promote to `<figure>` + `<figcaption>`
- Accept frontmatter figure config (template, base index)
- Reference: current figure promotion logic in `content-utils.ts`
- Write unit test

### Step 2.9: Custom remark plugin — verse mode

- Create `src/lib/markdown/plugins/remark-verse.ts`
- When frontmatter `parse_mode: verse`, convert newlines to `<br>`
- Reference: current VERSE mode handling in `content-utils.ts`
- Write unit test

### Step 2.10: Content loaders

- Create `src/lib/content/loaders.ts`:
  - `loadMarkdownFile(filePath)` — gray-matter + processMarkdown → `ProcessedContent`
  - `getStory(slug, locale)` — load story landing + config
  - `getStoryArticle(storySlug, articleSlug, locale)`
  - `getAllStories()` — list story slugs
  - `getStoryArticles(storySlug)` — list article slugs
  - `getAllAnnotations(storySlug, locale)` — load all annotations as Record
  - `getAllGlossaryTerms(locale)` — load all glossary terms as Record
  - `getPost(slug, locale)`, `getAllPosts()`
  - `getPage(slug, locale)` — for about/contact/contribute

### Step 2.11: ContentRenderer component

- Create `src/components/content/ContentRenderer.tsx`
- Uses `hast-util-to-jsx-runtime` with component overrides
- Create `src/components/content/ContentRenderer.module.css` — content typography styles

### Step 2.12: Basic content block components

- Create `src/components/content/Figure.tsx` + `.module.css`
- Create `src/components/content/CodeBlock.tsx` + `.module.css`
- Create `src/components/content/StyledTable.tsx` + `.module.css`
- Create `src/components/content/OptimizedImage.tsx` (wraps `next/image`)

### Step 2.13: Wire up a test page

- Create temporary route `src/app/[locale]/test/page.tsx`
- Load and render the preface article
- **Verify**: preface renders with correct headings, paragraphs, lists, images, figures, code blocks, tables. Compare to current site.

---

## Phase 3: Annotations & Glossary Popovers

### Step 3.1: AnnotationProvider context

- Create `src/components/content/AnnotationProvider.tsx`
- React context holding annotation and glossary maps
- `useAnnotations()` hook

### Step 3.2: AnnotationAwareLink

- Create `src/components/content/AnnotationAwareLink.tsx`
- Checks `data-link-type` attribute:
  - `annotation` → renders `AnnotationPopover`
  - `glossary` → renders `GlossaryPopover`
  - else → regular link (Next.js `Link` for internal, `<a>` for external)

### Step 3.3: AnnotationPopover

- Create `src/components/content/AnnotationPopover.tsx` + `.module.css`
- Uses Mantine `Popover` + `ScrollArea`
- Trigger shows `[01]`, `[02]` etc. (sequence number)
- Dropdown renders annotation content via `ContentRenderer`
- Shows metadata (source, author) if present

### Step 3.4: GlossaryPopover

- Create `src/components/content/GlossaryPopover.tsx` + `.module.css`
- Similar to AnnotationPopover but styled for glossary terms
- Trigger shows the term text (not a number)

### Step 3.5: Update ContentRenderer

- Add `AnnotationAwareLink` to the components map as the `a` override
- Wrap output in `AnnotationProvider` with annotations + glossary data

### Step 3.6: Wire up annotations on test page

- Update test page to load annotations and glossary at build time
- Pass them to ContentRenderer
- **Verify**: annotation numbers appear, clicking opens popover with correct content. Glossary terms clickable.

---

## Phase 4: All Routes

### Step 4.1: Story landing page

- Create `src/app/[locale]/stories/[storySlug]/page.tsx`
- Load story content + config via `getStory()`
- `generateStaticParams()` for all stories × locales
- Create `src/components/story/ArticleLayout.tsx` + `.module.css` — shared layout for story content pages

### Step 4.2: Article pages

- Create `src/app/[locale]/stories/[storySlug]/articles/[articleSlug]/page.tsx`
- Load article + all annotations + glossary
- `generateStaticParams()` for all stories × articles × locales
- Create `src/app/[locale]/stories/[storySlug]/articles/page.tsx` — articles listing

### Step 4.3: Resources page

- Create `src/app/[locale]/stories/[storySlug]/resources/page.tsx`
- Load resources content for the story

### Step 4.4: Codex pages

- Create `src/app/[locale]/stories/[storySlug]/codex/page.tsx` — codex landing
- Create `src/app/[locale]/stories/[storySlug]/codex/[pageSlug]/page.tsx` — individual codex page
- Load codex content + annotations + glossary

### Step 4.5: Glossary

- Create `src/app/[locale]/glossary/page.tsx` — glossary index listing all terms
- Create `src/app/[locale]/glossary/[termSlug]/page.tsx` — term detail
- Create `src/components/glossary/GlossaryList.tsx` + `GlossaryEntry.tsx`

### Step 4.6: Blog posts

- Create `src/app/[locale]/posts/page.tsx` — posts listing (reverse chronological)
- Create `src/app/[locale]/posts/[postSlug]/page.tsx` — individual post
- Create `src/components/posts/PostList.tsx` + `PostCard.tsx`

### Step 4.7: Static pages (about, contact, contribute)

- Create `src/app/[locale]/about/page.tsx`
- Create `src/app/[locale]/contact/page.tsx` + contact form
- Create `src/app/[locale]/contribute/page.tsx`

### Step 4.8: Contact form & API routes

- Create `src/app/api/sendgrid/route.ts` — SendGrid email handler
- Create `src/app/api/captcha/route.ts` — reCAPTCHA validation
- Create `src/components/forms/ContactForm.tsx` — Mantine form with validation
- Install: `pnpm add @sendgrid/mail react-google-recaptcha`

### Step 4.9: Home page

- Update `src/app/[locale]/page.tsx` — show featured story or story listing
- Create `src/components/story/StoryCard.tsx` — card for story listing

### Step 4.10: Navigation wiring

- Update nav menus with real links to all routes
- Create `src/components/story/StoryNav.tsx` — in-story navigation (articles, codex, resources)

### Step 4.11: URL redirects

- Add `redirects()` to `next.config.ts` mapping all old URLs to new ones

### Step 4.12: Remove test page

- Delete `src/app/[locale]/test/page.tsx`
- **Verify**: all routes render, navigation works, locale switching works on every page

---

## Phase 5: Multi-Story Architecture

### Step 5.1: Story listing

- Update home page to dynamically list all stories from `content/stories/`
- Story cards show title, abstract, featured badge

### Step 5.2: Story config loading

- Ensure all story routes read `story.json` for navigation order and artifact types
- StoryNav component renders navigation based on `story.json`

### Step 5.3: Validate extensibility

- Create a minimal stub story: `content/stories/test-story/` with `story.json`, a landing `index.en.md`, and one article
- **Verify**: new story appears in listing, its pages render, no code changes needed

### Step 5.4: Remove stub story

- Delete test story (or keep as a template)

---

## Phase 6: Polish & Testing

### Step 6.1: SEO metadata

- Add `generateMetadata()` to every page (title, description, openGraph)
- Create `src/app/[locale]/layout.tsx` metadata with site-level defaults

### Step 6.2: Sitemap

- Install `next-sitemap` or use App Router's built-in `sitemap.ts`
- Create `src/app/sitemap.ts`

### Step 6.3: 404 page

- Create `src/app/not-found.tsx`
- Create `src/app/[locale]/not-found.tsx` (localized)

### Step 6.4: Error handling

- Create `src/app/error.tsx` — global error boundary
- Create `src/app/[locale]/error.tsx` — localized error

### Step 6.5: Unit tests

- Set up Vitest: `pnpm add -D vitest @testing-library/react`
- Write tests for each remark plugin
- Write tests for content loaders
- Write tests for i18n utilities

### Step 6.6: E2E tests

- Set up Playwright: `pnpm add -D @playwright/test`
- Adapt existing E2E scenarios from `e2e/` directory
- Test: navigation, locale switching, theme toggle, annotation popovers, contact form

### Step 6.7: RTL verification

- Manual testing of all pages in Hebrew
- Verify layout flips, font switches, popover positioning

### Step 6.8: Performance

- Run `pnpm build` — check bundle sizes
- Optimize images with `next/image`
- Verify static generation (all pages pre-rendered)

### Step 6.9: Analytics

- Add Google Analytics via `next/script` or Mantine's Script component
- Move analytics ID to environment variable

### Step 6.10: Clean up

- Remove old `public/content/` directory
- Remove old `e2e/` reference files if fully migrated
- Remove `REWRITE-PLAN.md` (or keep as historical reference)
- Update `AGENTS.md` to reflect new architecture
- Update `README.md`

---

## Files to create (ordered by phase)

### Phase 1 (~27 files)

1. `next.config.ts`
2. `tsconfig.json`
3. `postcss.config.mjs`
4. `src/styles/tokens.css`
5. `src/styles/globals.css`
6. `src/lib/fonts.ts`
7. `src/lib/theme.ts`
8. `src/i18n/config.ts`
9. `src/i18n/server.ts`
10. `src/i18n/client.tsx`
11. `src/i18n/messages/en.json`
12. `src/i18n/messages/he.json`
13. `src/middleware.ts`
14. `src/app/layout.tsx`
15. `src/app/[locale]/layout.tsx`
16. `src/app/[locale]/page.tsx`
17. `src/components/shell/AppShell.tsx` + `.module.css`
18. `src/components/shell/Header/Header.tsx` + `.module.css`
19. `src/components/shell/Footer/Footer.tsx` + `.module.css`
20. `src/components/shell/Navigation/NavMenu.tsx` + `.module.css`
21. `src/components/shell/Navigation/MobileDrawer.tsx` + `.module.css`
22. `src/components/shell/ThemeSwitcher/ThemeSwitcher.tsx`
23. `src/components/shell/LocaleSwitcher/LocaleSwitcher.tsx`

### Phase 2 (~20 files)

1. `content/stories/the-story-of-mel/story.json`
2. `src/lib/content/types.ts`
3. `src/lib/content/loaders.ts`
4. `src/lib/markdown/types.ts`
5. `src/lib/markdown/pipeline.ts`
6. `src/lib/markdown/render.tsx`
7. `src/lib/markdown/plugins/remark-strip-comments.ts`
8. `src/lib/markdown/plugins/remark-annotation-links.ts`
9. `src/lib/markdown/plugins/remark-glossary-links.ts`
10. `src/lib/markdown/plugins/remark-figures.ts`
11. `src/lib/markdown/plugins/remark-verse.ts`
12. `src/components/content/ContentRenderer.tsx` + `.module.css`
13. `src/components/content/Figure.tsx` + `.module.css`
14. `src/components/content/CodeBlock.tsx` + `.module.css`
15. `src/components/content/StyledTable.tsx` + `.module.css`
16. `src/components/content/OptimizedImage.tsx`

### Phase 3 (~8 files)

1. `src/components/content/AnnotationProvider.tsx`
2. `src/components/content/AnnotationAwareLink.tsx`
3. `src/components/content/AnnotationPopover.tsx` + `.module.css`
4. `src/components/content/GlossaryPopover.tsx` + `.module.css`

### Phase 4 (~25 files)

- 15 page routes (`page.tsx` files)
- 2 API routes (`route.ts` files)
- Story components (StoryCard, StoryNav, ArticleLayout)
- Glossary components (GlossaryList, GlossaryEntry)
- Post components (PostList, PostCard)
- ContactForm

### Phase 5 (0-2 files)

- Updates to existing files, no new files expected

### Phase 6 (~8 files)

- `src/app/sitemap.ts`
- `src/app/not-found.tsx`
- `src/app/error.tsx`
- Test files (`tests/unit/`, `tests/e2e/`)
