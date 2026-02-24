# Tags Feature

Adds a tag taxonomy across content types (articles, sources, stories, posts) with two new pages: a tag index and a tag detail page.

## What changed

### Type interfaces (`libs/content-pipeline/src/types.ts`)

- Added `tags?: string[]` to `ContentMetadata` (covers articles, posts, pages)
- Added `tags?: string[]` to `StoryConfig` (covers stories via `story.json`)
- Added new `TaggedItem` interface used by tag pages to display items with type badges

### Tag aggregation loader (`libs/content-pipeline/src/loaders/tags.ts`) — new

Collects all tagged items across content types for a given locale. Exports:

- `getAllTaggedItems(locale)` — returns `Map<string, TaggedItem[]>` (tag → items)
- `getAllTags(locale)` — returns sorted `{ tag, count }[]` for the index page
- `getAllTagSlugs(locale)` — returns tag strings for `generateStaticParams`

Iterates over sources, posts, stories, and articles. Only includes items with non-empty `tags` arrays.

### Loader re-exports (`libs/content-pipeline/src/loaders/index.ts`)

Added re-exports for `getAllTaggedItems`, `getAllTags`, `getAllTagSlugs`, and `TagSummary`.

### Translation keys

**English** (`apps/web/src/locales/en.json`):

| Key | Value |
|-----|-------|
| `nav.tags` | Tags |
| `tags.pageTitle` | Tags |
| `tags.noTags` | No tags yet |
| `tags.itemCount` | items |

**Hebrew** (`apps/web/src/locales/he.json`):

| Key | Value |
|-----|-------|
| `nav.tags` | תגיות |
| `tags.pageTitle` | תגיות |
| `tags.noTags` | אין תגיות עדיין |
| `tags.itemCount` | פריטים |

Type badges on the detail page reuse existing `search.categories.*` keys.

### Tag index page (`apps/web/src/app/[locale]/tags/page.tsx`) — new

- Generates static params for all locales
- Renders breadcrumbs (Home > Tags), heading, and a wrapped list of tag links
- Each tag shows its name and a count badge
- Empty state when no tags exist

### Tag detail page (`apps/web/src/app/[locale]/tags/[tagSlug]/page.tsx`) — new

- Generates static params for all tag slugs × locales
- Renders breadcrumbs (Home > Tags > {tag}), heading, item count
- Flat list of items with a type badge (Articles, Posts, Stories, Sources) and a linked title
- Returns 404 if tag has no items

### CSS modules — new

- `apps/web/src/app/[locale]/tags/page.module.css` — tag list with flex-wrap layout
- `apps/web/src/app/[locale]/tags/[tagSlug]/page.module.css` — item list with badge + link rows

## Files summary

| File | Action |
|------|--------|
| `libs/content-pipeline/src/types.ts` | Modified |
| `libs/content-pipeline/src/loaders/tags.ts` | Created |
| `libs/content-pipeline/src/loaders/index.ts` | Modified |
| `apps/web/src/locales/en.json` | Modified |
| `apps/web/src/locales/he.json` | Modified |
| `apps/web/src/app/[locale]/tags/page.tsx` | Created |
| `apps/web/src/app/[locale]/tags/page.module.css` | Created |
| `apps/web/src/app/[locale]/tags/[tagSlug]/page.tsx` | Created |
| `apps/web/src/app/[locale]/tags/[tagSlug]/page.module.css` | Created |

## Routes

- `/en/tags` — tag index
- `/en/tags/{tagSlug}` — tag detail (e.g., `/en/tags/lgp-30`, `/en/tags/usenet`)

No navigation link added — just the routes. Tags are populated from existing source `tags` fields and can be added to articles, posts, and stories via frontmatter or `story.json`.
