# @mels-loop/content-loaders

Domain-specific content loaders and types for Mel's Loop. Built on top of `@mels-loop/content-pipeline`.

## Exports

| Entry point | Description |
|---|---|
| `@mels-loop/content-loaders/loaders` | Domain loaders — stories, glossary, posts, pages, sources |
| `@mels-loop/content-loaders/types` | Domain types — `Source`, `ResolvedSource`, `StoryConfig`, etc. |

## Loaders

```ts
import { getStory, getGlossaryTerm, getPost } from '@mels-loop/content-loaders/loaders';

const story = await getStory('the-story-of-mel', 'en');
const term = await getGlossaryTerm('drum-memory', 'en');
const post = await getPost('here-we-go', 'en');
```

Available loaders:
- **Stories** — `getStory`, `getStoryArticle`, `getStoryDocument`, `getAllStories`, `getAnnotation`, `getCodex`, `getResources`
- **Glossary** — `getGlossaryTerm`, `getAllGlossaryTerms`, `getAllGlossarySlugs`
- **Posts** — `getPost`, `getAllPosts`
- **Pages** — `getPage`
- **Sources** — `getSource`, `getResolvedSource`, `getAllResolvedSources`, `getSourceMessages`

## Testing

Loaders are filesystem-backed — test with **vitest** using fixture directories that mirror the `content/` structure. Integration-level tests that verify file reading, frontmatter parsing, and locale fallback.

## Scripts

```sh
pnpm lint        # eslint
pnpm lint:fix    # eslint --fix
```
