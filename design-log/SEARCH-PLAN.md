# Plan: Cross-Site Search

## Context

The site is statically generated (Next.js App Router). Content spans markdown articles, glossary entries, blog posts, static pages, and JSON-based archival sources — all loaded at build time via custom Node.js loaders in `libs/content-pipeline`. There is currently no search capability.

We want a unified client-side search across all content types, accessible via:
- A keyboard shortcut (`Cmd+K` / `Ctrl+K`)
- A search button in the site header

The corpus is small (~50 documents) and bilingual (English + Hebrew). A client-side search library with a pre-built JSON index is ideal. Search is **cross-locale** — a single index contains documents in all languages, so users can find content regardless of which locale they're browsing in.

**Library**: Orama — zero-dependency, built-in tokenizers/stemming/typo tolerance, custom tokenizer support (needed for Hebrew via `Intl.Segmenter`), serializable index, ~8KB gzipped.

**Caching strategy**: The index is fetched once on first search open and cached in IndexedDB with a content hash. On subsequent visits, the hash is compared — if unchanged, the index loads from IndexedDB without a network request. This scales to ~1000 documents without concern.

---

## Step 1: Install Orama

**File**: `apps/web/package.json`

Add `@orama/orama` to dependencies.

---

## Step 2: Build-time index generator

**New file**: `apps/web/scripts/generate-search-index.ts`

Follows the `generate-sitemap.ts` pattern (line-for-line):
- ESM script with `#!/usr/bin/env tsx`
- `setContentDir()` from `@mels-loop/content-pipeline/loaders` before any loaders
- `CONTENT_DIR = path.resolve(__dirname, '../../../content')`
- Writes output to `apps/web/public/`

**Schema** for indexed documents:
```ts
{ type: string, slug: string, url: string, title: string, body: string, locale: string }
```

**Single cross-locale index**: The script iterates all `locales` from `@mels-loop/i18n/config` and inserts documents from every locale into one index. Each document carries a `locale` field for display purposes (e.g., showing a locale badge on results). URLs include the locale prefix: `/{locale}/stories/{slug}`.

| Content type | Loader | URL pattern | Title source | Body source |
|---|---|---|---|---|
| Stories | `getAllStories()` → `getStoryConfig(slug)` | `/{locale}/stories/{slug}` | `config.title[locale]` | `config.abstract[locale]` |
| Articles | `getAllStories()` → `getStoryArticles(story)` → `getStoryArticle(story, article, locale)` | `/{locale}/stories/{story}/articles/{article}` | `metadata.title` | `raw` |
| Glossary | `getAllGlossaryTerms(locale)` | `/{locale}/glossary#{key}` | `metadata.glossary_key` or key | `raw` |
| Posts | `getAllPosts()` → `getPost(slug, locale)` | `/{locale}/blog/{slug}` | `metadata.title` | `raw` |
| Pages | hardcoded `['about', 'contact', 'contribute']` → `getPage(slug, locale)` | `/{locale}/{slug}` | `metadata.title` | `raw` |
| Sources | `getAllResolvedSources(locale)` | `/{locale}/sources#{id}` | `title` | `description + author + tags.join` |

**Multilingual tokenizer**: Custom tokenizer that uses `Intl.Segmenter('he', { granularity: 'word' })` for Hebrew text and standard whitespace/punctuation splitting for Latin text. Language is detected per-document via the `locale` field at index time.

**Output**: `public/search-index.json` (single file, all locales)

**Content hash**: The script also writes a `public/search-index.hash` file containing a hash of the index content, used by the client for IndexedDB cache invalidation.

**Script entry** in `package.json`: `"search-index": "tsx scripts/generate-search-index.ts"`

**Key files to import from**:
- `libs/content-pipeline/src/loaders/index.ts` — re-exports: `setContentDir`, `getAllStories`, `getStoryConfig`, `getStoryArticle`, `getStoryArticles`, `getAllGlossaryTerms`, `getAllPosts`, `getPost`, `getPage`, `getAllResolvedSources`
- `libs/i18n/src/config.ts` — `locales` array (`['en', 'he']`), `Locale` type

---

## Step 3: SearchDialog component

**New file**: `apps/web/src/components/SearchDialog/SearchDialog.tsx`

Client component (`'use client'`) using Radix Dialog (already installed in `libs/ui` — same pattern as `MobileDrawer.tsx` and `FigureDialog.tsx`):

```
Props: { open: boolean; onOpenChange: (open: boolean) => void }
```

Behavior:
- On first open, load index: check IndexedDB cache (compare hash from `/search-index.hash`) → if hit, deserialize from cache; if miss, fetch `/search-index.json`, deserialize, store in IndexedDB
- Deserialize into Orama instance via `create()` + `load()`
- Debounced `search()` on input keystroke (~150ms)
- Results are cross-locale — each result shows a locale badge (EN/עב) so the user knows what language the content is in
- Results grouped by `type` field (Articles, Glossary, Sources, Posts, Pages, Stories)
- Category headers styled like `.sectionTitle` in `NavMenu.module.css` (uppercase, bold, dimmed)
- Each result: clickable `Link` with title + truncated body snippet + locale badge
- Keyboard: arrow keys navigate results, Enter selects, Escape closes
- Empty state: "No results found" (from i18n key `search.noResults`)
- Loading state while index is fetching/deserializing

**Radix Dialog structure** (matching `FigureDialog.tsx` / `MobileDrawer.tsx`):
```tsx
<Dialog.Root open={open} onOpenChange={onOpenChange}>
  <Dialog.Portal>
    <Dialog.Overlay className={styles.overlay} />
    <Dialog.Content className={styles.dialog}>
      <Dialog.Title className={styles.visuallyHidden}>{t('search.title')}</Dialog.Title>
      {/* input + results */}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

---

## Step 4: SearchDialog styles

**New file**: `apps/web/src/components/SearchDialog/SearchDialog.module.css`

Following existing patterns from `FigureDialog.module.css` and `MobileDrawer.module.css`:

- `.overlay` — `position: fixed; inset: 0; background: var(--ml-overlay-background-color); z-index: 999`
- `.dialog` — `position: fixed; top: 15vh; left: 50%; transform: translateX(-50%); width: min(90vw, 600px); max-height: 70vh; background: var(--ml-surface-background-color); border-radius: var(--ml-radius-md); box-shadow: var(--ml-shadow); z-index: 1000`
- `.inputWrap` — flex row, border-bottom separator, search icon SVG
- `.input` — full width, no border, `font-size: var(--ml-font-size-lg)`, placeholder color `var(--ml-input-placeholder)`
- `.results` — `overflow-y: auto`, scrollable area
- `.resultGroup` — category header: uppercase, `var(--ml-font-size-sm)`, `var(--ml-text-dimmed)`, `var(--ml-font-weight-bold)`
- `.resultItem` — link block, `hover: var(--ml-header-item-hover)`, padding
- `.resultTitle` — bold, `var(--ml-text-color)`
- `.resultSnippet` — `var(--ml-text-secondary-color)`, truncated
- RTL: `[dir='rtl'] .dialog { transform: translateX(50%); }` — same pattern as `MobileDrawer.module.css`
- `.visuallyHidden` — same as `FigureDialog.module.css`

---

## Step 5: Keyboard shortcut hook

**New file**: `apps/web/src/components/SearchDialog/useSearchShortcut.ts`

Simple `useEffect` hook:
- Listens for `keydown` on `document`
- If `(e.metaKey || e.ctrlKey) && e.key === 'k'` → `e.preventDefault()`, call `onOpen()`
- Cleanup on unmount

---

## Step 6: Modify SiteLayout

**File**: `libs/ui/src/layout/SiteLayout/SiteLayout.tsx`

- Add `searchSlot?: ReactNode` to `SiteLayoutProps`
- Add `onSearchClick?: () => void` to `SiteLayoutProps` (passed through to `SiteHeader`)
- Render `{searchSlot}` after `<MobileDrawer>` (outside main, at root level)
- Pass `onSearchClick` to `<SiteHeader>`

This keeps `libs/ui` free of any `@orama/orama` dependency — the search dialog is injected from `apps/web`.

---

## Step 7: Modify SiteHeader

**File**: `libs/ui/src/layout/SiteHeader/SiteHeader.tsx`

- Add `onSearchClick?: () => void` to `SiteHeaderProps`
- Add a search button in the `.right` div, before `<LocaleSwitcher>`:
  ```tsx
  {onSearchClick && (
    <button type="button" className={styles.searchButton} onClick={onSearchClick} aria-label={t('search.open')}>
      <svg>/* magnifying glass icon */</svg>
    </button>
  )}
  ```

**File**: `libs/ui/src/layout/SiteHeader/SiteHeader.module.css`

- Add `.searchButton` — same dimensions as `.burger` (28×28), `background: none; border: none; cursor: pointer; color: var(--ml-text-color); border-radius: var(--ml-radius-md)`
- Hover: `background-color: var(--ml-header-item-hover)`

---

## Step 8: Wire up in layout

`layout.tsx` is a **server component** — it can't hold `useState`. `SiteLayout` is already `'use client'`, so we create a thin client wrapper in `apps/web` that composes `SiteLayout` + `SearchDialog`, keeping `libs/ui` free of any Orama dependency.

**New file**: `apps/web/src/components/SearchableLayout.tsx`

```tsx
'use client';
import { SiteLayout } from '@mels-loop/ui/layout';
import { useState } from 'react';
import { SearchDialog } from './SearchDialog/SearchDialog';
import { useSearchShortcut } from './SearchDialog/useSearchShortcut';

export function SearchableLayout(props: SiteLayoutProps & { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  useSearchShortcut(() => setSearchOpen(true));

  return (
    <SiteLayout
      {...props}
      onSearchClick={() => setSearchOpen(true)}
      searchSlot={<SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />}
    />
  );
}
```

**File**: `apps/web/src/app/[locale]/layout.tsx` — replace `<SiteLayout>` import/usage with `<SearchableLayout>`.

---

## Step 9: i18n keys

**File**: `apps/web/src/locales/en.json` — add:
```json
"search": {
  "title": "Search",
  "placeholder": "Search articles, glossary, sources...",
  "open": "Open search",
  "noResults": "No results found",
  "categories": {
    "article": "Articles",
    "glossary": "Glossary",
    "post": "Posts",
    "page": "Pages",
    "source": "Sources",
    "story": "Stories"
  }
}
```

**File**: `apps/web/src/locales/he.json` — add:
```json
"search": {
  "title": "חיפוש",
  "placeholder": "חיפוש מאמרים, מילון מונחים, מקורות...",
  "open": "פתיחת חיפוש",
  "noResults": "לא נמצאו תוצאות",
  "categories": {
    "article": "מאמרים",
    "glossary": "מילון מונחים",
    "post": "פוסטים",
    "page": "עמודים",
    "source": "מקורות",
    "story": "סיפורים"
  }
}
```

---

## Step 10: Turbo pipeline + gitignore

**File**: `turbo.json` — add `search-index` task:
```json
"search-index": {
  "dependsOn": ["^build"],
  "outputs": ["public/search-index.*.json"]
}
```

**File**: `.gitignore` — add:
```
# search index (generated)
apps/web/public/search-index.json
apps/web/public/search-index.hash
```

---

## Files changed summary

| File | Action |
|------|--------|
| `apps/web/package.json` | **Modify** — add `@orama/orama` dep + `search-index` script |
| `apps/web/scripts/generate-search-index.ts` | **New** — build-time index generator |
| `apps/web/src/components/SearchDialog/SearchDialog.tsx` | **New** — command palette search UI |
| `apps/web/src/components/SearchDialog/SearchDialog.module.css` | **New** — search dialog styles |
| `apps/web/src/components/SearchDialog/useSearchShortcut.ts` | **New** — Cmd+K hook |
| `apps/web/src/components/SearchableLayout.tsx` | **New** — client wrapper composing SiteLayout + SearchDialog |
| `libs/ui/src/layout/SiteLayout/SiteLayout.tsx` | **Modify** — accept `searchSlot` + `onSearchClick` props |
| `libs/ui/src/layout/SiteHeader/SiteHeader.tsx` | **Modify** — add search button + `onSearchClick` prop |
| `libs/ui/src/layout/SiteHeader/SiteHeader.module.css` | **Modify** — `.searchButton` styles |
| `apps/web/src/app/[locale]/layout.tsx` | **Modify** — use `SearchableLayout` instead of `SiteLayout` |
| `apps/web/src/locales/en.json` | **Modify** — add `search.*` keys |
| `apps/web/src/locales/he.json` | **Modify** — add `search.*` keys |
| `turbo.json` | **Modify** — add `search-index` task |
| `.gitignore` | **Modify** — ignore generated index files |

---

## Future considerations

- **Two-tier chunking**: Split index into a lightweight tier (titles, tags, descriptions) and a full-body tier. Tier 1 loads instantly for fast title/tag matches; Tier 2 loads in the background and replaces the Orama instance. Worth adding when the single index exceeds ~200KB gzipped.
- **Per-type splitting**: Separate indexes by content type, loaded on demand. Only needed at much larger scale (thousands of documents).

---

## Verification

1. `pnpm --filter @mels-loop/web search-index` → produces `public/search-index.en.json` + `public/search-index.he.json`
2. `pnpm --filter @mels-loop/web build` — builds successfully
3. `Cmd+K` → dialog opens, input auto-focused
4. Type "mel" → results from stories, articles, glossary
5. Switch to Hebrew locale → `Cmd+K` → type Hebrew term → results appear
6. Click result → navigates to correct page, dialog closes
7. Results grouped by type with category headers
8. Type gibberish → "No results found"
9. Escape closes dialog, arrow keys navigate results
10. Search button visible in header on all screen sizes