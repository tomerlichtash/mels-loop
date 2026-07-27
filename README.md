# Mel's Loop

### A Comprehensive Companion to _The Story of Mel_

[melsloop.com](https://melsloop.com)

_The Story of Mel_ is an epic of hacker folklore, written by Ed Nather and
posted to Usenet in 1983. It describes an exemplary "Real Programmer" by the
name of Mel Kaye, whose subtle techniques fascinated his colleagues — one of
the earliest documentations of the hacker spirit, and still resonant.

Mel's Loop presents the story with its research attached: the full text
annotated inline, the primary sources behind it, a glossary of the period's
computing vocabulary, and companion articles — in English and Hebrew at equal
depth. It is an ongoing historical, or rather e-archaeological, investigation
into the world of Ed and Mel, their families and life stories, first-generation
computing, and the birth of digital culture.

The project is also designed as an anthology for other stories, poems and
relics in the hacker folklore genre, with quality translations.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

No environment setup is required to run the site locally. Copy
[`.env.example`](./.env.example) to `apps/web/.env` if you want media served
from S3, analytics, the contact form, or the auth gate — each variable
documents how it degrades when unset.

## Commands

| Command            | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `pnpm dev`         | Dev server                                      |
| `pnpm build`       | Production build (also builds the search index) |
| `pnpm test`        | Vitest unit tests across all packages           |
| `pnpm type-check`  | `tsc --noEmit` everywhere                       |
| `pnpm lint`        | ESLint                                          |
| `pnpm format`      | Prettier                                        |
| `pnpm media:clone` | Pull media assets from S3 into `public/`        |

## Layout

```
apps/web                    Next.js app (App Router)
packages/ui                 Component primitives + design tokens (Storybook)
packages/i18n               Locale config, middleware, dictionaries
packages/content-pipeline   Markdown → hast core (remark/rehype)
libs/content-loaders        Reads and resolves content/
libs/content-plugins        Custom remark/rehype plugins
content/                    All source content — stories, sources, glossary, posts
```

Content is the source of truth; the code serves it. A story is a folder under
`content/stories/` with a `story.json`, and adding one needs no code changes.

## Working on this

[`docs/architecture/`](./docs/architecture/00-index.md) has three chapters —
content pipeline, styling and tokens, routing and locale. The index maps what
you are doing to the one worth reading. [AGENTS.md](./AGENTS.md) covers
conventions and principles; [CLAUDE.md](./CLAUDE.md) is the short version.

One thing worth knowing before you touch any layout: the site is bilingual, so
all CSS uses logical properties (`margin-inline-start`, never `margin-left`),
and every layout change needs checking in both `/` and `/he/`.

## License

MIT — see [LICENSE](./LICENSE).
