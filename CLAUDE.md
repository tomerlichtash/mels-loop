# CLAUDE.md — Practical Guidelines

See `AGENTS.md` for full project overview, principles, and architecture.

## Monorepo Structure

```
apps/web          — Next.js app (App Router)
packages/ui       — UI component library (Storybook)
packages/i18n     — Locale config, dictionaries
packages/content-pipeline — Markdown processing (remark/rehype)
libs/content-loaders      — Content reading & resolving
libs/content-plugins      — Custom remark/rehype plugins
```

- Package manager: `pnpm` with Turborepo
- After changing types in a lib (e.g. `content-loaders`), rebuild it: `pnpm --filter @mels-loop/content-loaders build`

## Bidirectional (RTL/LTR) CSS

This project is bilingual (English + Hebrew). All CSS must work in both LTR and RTL.

- **Always use CSS logical properties** — never physical directional ones:
  - `margin-inline-start/end` not `margin-left/right`
  - `padding-inline-start/end` not `padding-left/right`
  - `inset-inline-start/end` not `left/right`
  - `border-inline-start/end` not `border-left/right`
- Full-width breakout pattern: `width: 100vw; margin-inline-start: calc(-50vw + 50%);`
- Flexbox and Grid automatically respect `direction` — no manual RTL overrides needed for item ordering
- Always verify both `/en/` and `/he/` routes when touching layout or styling

## CSS Conventions

- All styling via CSS Modules (`.module.css`) and CSS custom properties (`--ml-*` prefix)
- Never use inline styles
- Use `color-mix(in srgb, var(--color) 40%, transparent)` for subtle/dim effects
- CSS Grid `grid-template-rows: 0fr` / `1fr` for accordion animations
- Radix ScrollArea viewport inner wrapper uses `display: table` — override with `.scrollViewport > div { display: block !important; }` when flex children need width constraints

## Components

Minimal scaffolding for a new component:
- `Component.tsx` — component implementation
- `Component.module.css` — styles
- `Component.stories.tsx` — Storybook story (must include a `Default` export)
- `Component.spec.ts` — test

## Content

- Source content lives in `content/sources/{id}/` with three files:
  - `index.json` — type, url, author, date, tags (locale-independent)
  - `index.en.json` — title, summary, description (English)
  - `index.he.json` — title, summary, description (Hebrew)
- Stories reference sources by ID in `story.json` → `sources` array
- `summary` is the short text shown in table rows; `description` is the full text shown in expanded detail

## Branch Safety

- All work happens on the `rewrite` branch
- **Never push, merge, checkout, or rebase against main/master**
- Do not `git push` unless explicitly asked

## Common Commands

```bash
pnpm dev              # dev server
pnpm build            # production build
pnpm lint             # eslint
pnpm test             # all tests
pnpm --filter @mels-loop/ui storybook  # component dev
```
