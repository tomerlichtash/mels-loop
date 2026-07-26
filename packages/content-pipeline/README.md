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

| Step | What it does |
|---|---|
| `remarkParse` | Parses raw markdown text into an MDAST (markdown abstract syntax tree) |
| `remarkFrontmatter` | Extracts YAML frontmatter blocks so they don't appear in the output |
| `remarkGfm` | Adds GitHub Flavored Markdown support (tables, strikethrough, autolinks, task lists) |
| `[remarkPlugins]` | Consumer-supplied remark plugins that transform the MDAST before conversion |
| `remarkRehype` | Converts the MDAST into a HAST (HTML abstract syntax tree) |
| `rehypeRaw` | Re-parses any raw HTML embedded in the markdown into proper HAST nodes |
| `[rehypePlugins]` | Consumer-supplied rehype plugins that transform the HAST after conversion |
| **HAST** | Final HTML abstract syntax tree, ready for rendering |

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
