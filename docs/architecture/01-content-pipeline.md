# 01 — Content pipeline

Markdown → mdast → hast → React. Three packages, in dependency order:

| Package | Job |
|---|---|
| `packages/content-pipeline` | The unified processor and the loader base. Knows nothing about Mel's Loop. |
| `libs/content-loaders` | Reads `content/` and returns typed data. |
| `libs/content-plugins` | The 19 project-specific remark/rehype plugins. |

The single processor is `createProcessor` in
`packages/content-pipeline/src/markdown/pipeline.ts`. **Plugin order in that
file is load-bearing** — consumer plugins are injected at two fixed points:

```
remarkParse → remarkFrontmatter → remarkGfm
  → [consumer remark plugins]
  → remarkRehype{allowDangerousHtml} → rehypeRaw → rehypeUnwrapMailto
  → [consumer rehype plugins]
```

`allowDangerousHtml` plus `rehypeRaw` is why raw HTML in markdown survives to
the output. Several remark plugins rely on it by emitting HTML strings rather
than mdast nodes.

## Why the plugins are injected rather than imported

`content-pipeline` must not depend on `content-plugins`, or the dependency graph
inverts. Instead `loaders/base.ts` holds two module-level registries —
`setContentDir()` and `setPluginBuilder()` — and the app calls both once at
startup from `apps/web/src/content-init.ts`.

This is the price of the three-package split. If the packages are ever merged
(a live proposal), this indirection is the first thing to delete.

## Where things are

- Plugins: `libs/content-plugins/src/{remark,rehype}/`, wired in order in
  `libs/content-plugins/src/index.ts`. Read that file to see the real sequence.
- Loaders: `libs/content-loaders/src/`, one module per content type. All
  filesystem paths are built through `paths.ts` — nothing enumerates the
  content root, which is why `content/_parked/` is invisible to the pipeline.
- Rendering: `apps/web/src/content/renderer/core/ContentRenderer.tsx` feeds the
  hast tree to `hast-util-to-jsx-runtime` with ~27 tag→component overrides.

## Things that will bite you

**`hast-util-to-jsx-runtime` maps on tag name only, not className.** Plugins
therefore emit `data-*` attributes, and a single `div: ContentLayout` override
inspects `data-layout` and dispatches. If you add a plugin that wants to
produce a specific component, give it a distinct tag or a `data-` attribute —
a class will not reach anything.

**Elements mapped to the `Text` primitive ignore CSS set on their parent.**
`Text` sets `--ml-text-font-size` and `--ml-text-font-weight` on its own span,
which beats anything inherited. If typography on rendered content is not
responding, check whether the element is a `Text` variant before editing CSS.
`p` maps to `variant="body1"` for exactly this reason.

**There is no frontmatter validation.** `ContentMetadata` is an interface with
an index signature, so a typo'd key produces a page silently missing a field.
Adding zod at `loadMarkdownFile` in `content-pipeline/src/loaders/base.ts` is
the single chokepoint if this becomes a problem.

**Loaders have no caching.** Every call re-reads from disk. This is fine because
almost everything is prerendered — it would stop being fine if routes went
dynamic. Measure before adding a cache; the corpus is ~164 markdown files.

## Content shape

```
content/
  stories/<slug>/       story.json, index.{en,he}.md, annotations/, articles/,
                        codex/, documents/, resources/, messages/{en,he}.json
  sources/<id>/         index.json (locale-independent) + index.{en,he}.json
  glossary/<term>/      index.{en,he}.md
  posts/, pages/
  _parked/stories/      Not shipped. Invisible to the loaders.
```

Sources split deliberately: `index.json` carries locale-independent facts (url,
author, date, license) and the per-locale files carry title, summary and
description.
