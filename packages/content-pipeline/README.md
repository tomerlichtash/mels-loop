# @mels-loop/content-pipeline

Generic markdown processing pipeline and content loading utilities. Zero domain opinions — all custom transforms are supplied by the consumer via plugin arrays.

## Exports

| Entry point | Description |
|---|---|
| `@mels-loop/content-pipeline/markdown` | `processMarkdown()` — unified pipeline producing HAST |
| `@mels-loop/content-pipeline/loaders` | File loading, plugin builder registration, path helpers |
| `@mels-loop/content-pipeline/types` | `ContentMetadata`, `FigureConfig`, `ProcessedContent` |

## Pipeline

```
remarkParse → remarkFrontmatter → remarkGfm → [remarkPlugins] → remarkRehype → rehypeRaw → [rehypePlugins] → HAST
```

The core pipeline handles parsing, frontmatter extraction, and GFM. Everything else is injected:

```ts
import { processMarkdown } from '@mels-loop/content-pipeline/markdown';

const hast = await processMarkdown(content, {
  remarkPlugins: [[remarkDirective], [remarkVerse, { parseMode: 'verse' }]],
  rehypePlugins: [[rehypeLines]],
});
```

## Loaders

File loading utilities with a plugin builder pattern:

```ts
import { setContentDir, setPluginBuilder, loadMarkdownFile } from '@mels-loop/content-pipeline/loaders';

// Initialize at app startup
setContentDir('/path/to/content');
setPluginBuilder(myPluginBuilder);

// Load and process a markdown file
const { metadata, hast, raw } = await loadMarkdownFile('path/to/file.md');
```

### Plugin builder pattern

Loaders use a registered `PluginBuilder` to get plugins for each file. This decouples the pipeline from any specific plugin set:

- `setPluginBuilder(builder)` — register a factory that creates plugins given a context
- `buildPlugins(context)` — returns a `PluginFactory` from the registered builder
- The `PluginFactory` receives `ContentMetadata` and returns `{ remarkPlugins, rehypePlugins }`

## Scripts

```sh
pnpm build       # tsc to dist/
pnpm lint        # eslint
pnpm lint:fix    # eslint --fix
```
