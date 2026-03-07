# Table of Contents — Implementation Plan

See [table-of-contents.md](table-of-contents.md) for the full design.

## What exists today

- `story.json` has `sections`, `articles`, `documents` fields with inline bilingual `title`/`abstract`
- `StoryConfig` type in `libs/content-loaders/src/types.ts` mirrors this structure
- `getStoryToc()` in `libs/content-loaders/src/stories.ts` computes sections from these fields
- `StorySections` component renders 4 tabs: codex, articles, documents, sources
- `Asides` component renders sections with item lists
- `StoryTableOfContents` component exists (early prototype, needs rewrite)
- No `messages/` folder per story, no `contents` field in `story.json`

## Phase 1: Data model and messages

**1.1 Create messages for The Story of Mel**
- Create `content/stories/the-story-of-mel/messages/en.json`
- Create `content/stories/the-story-of-mel/messages/he.json`
- Include `story.title`, `story.abstract`, `parts.*`, `generated.*`

**1.2 Add `contents` to `story.json`**
- Add the `contents` array to `content/stories/the-story-of-mel/story.json`
- Replace inline `title`/`abstract` with message keys (`"story.title"`, `"story.abstract"`)
- Keep `sections`, `articles`, `documents` fields temporarily (removed in Phase 4)
- Keep `sources`, `cover`, `thumbnail`, `avatar`, `figures` as-is

**1.3 Add paths for messages**
- Add `messages` path accessor to `paths.stories` in `libs/content-loaders/src/paths.ts`:
  `messages: (slug: string, locale: string) => stories(slug, 'messages', \`${locale}.json\`)`

## Phase 2: Types and loaders

**2.1 Add contents types to content-loaders**
- Add `ContentsEntry` discriminated union type (`PartEntry`, `PageEntry`, `SourceEntry`, `GeneratedEntry`)
- Add `ResolvedContentsEntry` — the resolved, display-ready version
- Update `StoryConfig` to include optional `contents: ContentsEntry[]`

**2.2 Build `getStoryMessages()` loader**
- Load `messages/{locale}.json` for a given story
- Return typed message object, or empty object if no messages folder exists

**2.3 Build `getStoryContents()` resolver**
- Load `contents` from `story.json` + messages for the locale
- Walk the tree: resolve part titles from `parts.{ref}`, page titles from frontmatter, source titles from source messages, generated titles from `generated.{ref}`
- Log warnings for missing content, skip from resolved tree
- Return `ResolvedContentsEntry[]`

**2.4 Update `getStoryToc()` to use contents**
- If `contents` exists in config, resolve via `getStoryContents()`
- Convert resolved contents tree to the `StoryToc` shape (for backwards compat with layout)
- If no `contents`, fall back to current computed logic

**2.5 Resolve story title/abstract from messages**
- Update `getStoryConfig()` or add a helper that resolves `story.title` / `story.abstract` from messages when the value is a message key
- Layout and other consumers get resolved strings as before

**2.6 Rebuild content-loaders**
- `pnpm --filter @mels-loop/content-loaders build`

## Phase 3: UI components

**3.1 Update StorySections to Contents + Sources tabs**
- Replace the 4-tab model (`codex | articles | documents | sources`) with 2 tabs: `contents` and `sources`
- `StorySection['key']` becomes `'contents' | 'sources'`
- Contents tab links to the story root (or `/contents` sub-page)
- Sources tab unchanged (filtering, search, type toggles)

**3.2 Rewrite StoryTableOfContents component**
- Accept `ResolvedContentsEntry[]` instead of `StoryToc`
- Render parts as groups, pages and sources as links
- Support flat contents (no parts) as a simple list

**3.3 Update Asides to render contents tree**
- Accept resolved contents model
- Render parts as collapsible/grouped sections, entries as links
- Replace current `AsideSection[]` interface with contents-based rendering

**3.4 Update story layout**
- `apps/web/src/app/[locale]/stories/[storySlug]/layout.tsx`
- Derive StorySections tabs from contents model (2 tabs)
- Pass resolved contents to Asides instead of section-based data
- Resolve story title from messages

**3.5 Update `/contents` page**
- `apps/web/src/app/[locale]/stories/[storySlug]/contents/page.tsx`
- Use `getStoryContents()` to render the full minibook TOC

## Phase 4: Cleanup

**4.1 Remove old fields from story.json**
- Remove `sections`, `articles`, `documents`, `featuredArticles` from `story.json`
- Remove inline `title` and `abstract` (now in messages)

**4.2 Remove old types and loaders**
- Remove `sections`, `articles`, `documents`, `featuredArticles` from `StoryConfig`
- Remove `getArticleMeta()`, `getDocumentMeta()` if no longer needed
- Remove old `StoryTocSection`/`StoryToc` types if fully replaced

**4.3 Update other stories**
- Add `contents` and `messages/` to all other stories
- Simple stories (codex only) get a minimal `contents`: `[{ "type": "page", "ref": "codex" }]`

## Phase 5: Book-level anthology

**5.1 Create anthology structure**
- Create `content/anthology.json` with `contents` array
- Create `content/messages/en.json` and `content/messages/he.json`

**5.2 Add anthology types and loaders**
- Add `AnthologyConfig` type to content-loaders
- Build `getAnthology()` — load config
- Build `getResolvedToc()` — resolve full tree (anthology -> stories -> contents)
- Build `getStoryBreadcrumbs()` — derive breadcrumb trail from anthology position

**5.3 Build site-level `/contents` page**
- Create `/[locale]/contents` route
- Build `TableOfContents` component rendering the full anthology tree
- Add "Contents" link to main nav

**5.4 Update breadcrumbs**
- Derive from anthology tree instead of hardcoded story paths

## Phase 6: Generated pages (deferred)

**6.1 Figure collection**
- Build `getStoryFigures()` — walk resolved contents, collect standalone figures (sources with `type: "image"` or `figure: true`) and inline figures (from rendered content)
- Respect `figure: false` overrides

**6.2 List of Figures page**
- If `contents` includes `{ "type": "generated", "ref": "listOfFigures" }`, generate the page
- Render per locale from collected figures
