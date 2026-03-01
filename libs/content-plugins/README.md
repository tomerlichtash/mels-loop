# @mels-loop/content-plugins

Remark and rehype plugins for Mel's Loop content processing. Provides `createContentPlugins` — a plugin builder that registers the full transform pipeline.

## Usage

```ts
import { createContentPlugins } from '@mels-loop/content-plugins';
import { setPluginBuilder } from '@mels-loop/content-pipeline/loaders';

setPluginBuilder(createContentPlugins);
```

## Plugin types

The package contains two types of plugins that run at different stages of the markdown-to-HTML pipeline:

- **Remark** (`src/remark/`) — operate on MDAST (Markdown Abstract Syntax Tree), transforming content before HTML conversion. 11 plugins.
- **Rehype** (`src/rehype/`) — operate on HAST (HTML Abstract Syntax Tree), transforming content after HTML conversion. 5 plugins.

Tests mirror the source structure under `tests/remark/` and `tests/rehype/`.

## Testing

Plugins are pure AST transforms — tested with **vitest** by feeding markdown through the pipeline and asserting on the output HAST. Per-file coverage enforcement via `@vitest/coverage-v8`.

```ts
// Example test pattern
import { remarkGlossaryLinks } from '../../src/remark/glossary-links';
import { applyPlugins, findElements } from '../test-helpers';

const hast = await applyPlugins('[term](#glossary)', {
  remarkPlugins: [[remarkGlossaryLinks]],
});
const links = findElements(hast, 'a');
```

## Scripts

```sh
pnpm test        # vitest with coverage
pnpm lint        # eslint
pnpm lint:fix    # eslint --fix
```
