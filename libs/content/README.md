# @mels-loop/content

Domain-specific content loaders, plugins, and types for Mel's Loop. Built on top of `@mels-loop/content-pipeline`.

## Exports

| Entry point | Description |
|---|---|
| `@mels-loop/content/loaders` | Domain loaders — stories, glossary, posts, pages, sources |
| `@mels-loop/content/plugins` | `createContentPlugins` — full remark/rehype plugin set |
| `@mels-loop/content/types` | Domain types — `Source`, `ResolvedSource`, `StoryConfig`, etc. |

## Loaders

```ts
import { getStory, getGlossaryTerm, getPost } from '@mels-loop/content/loaders';

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

## Plugins

16 remark/rehype plugins registered via `createContentPlugins`:

**Remark:** strip-comments, source-vars, annotation-links, glossary-links, source-links, figures, directive, blockquote-directive, cols-directive, figure-directive, table-directive, verse

**Rehype:** table-variants, figure-images, source-images, figure-index, lines

```ts
import { createContentPlugins } from '@mels-loop/content/plugins';
import { setPluginBuilder } from '@mels-loop/content-pipeline/loaders';

setPluginBuilder(createContentPlugins);
```

## Scripts

```sh
pnpm lint        # eslint
pnpm lint:fix    # eslint --fix
```
