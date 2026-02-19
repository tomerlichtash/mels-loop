# Monorepo Migration Plan

## Context

The project is a single Next.js 16 app that combines two functionally independent concerns: a **blog** (posts) and a **story browser** (stories/codex/glossary/static pages). The goals are independent deploy cycles, extractable shared packages, and clearer code boundaries.

The blog is the cleanest split point — it uses only `ContentRenderer` and has zero dependency on the annotation/popover/glossary system.

## Target Structure

```
mels-loop/
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── package.json              # workspace root (turbo + typescript only)
├── content/                  # stays at root, shared by both apps
│
├── packages/
│   ├── i18n/                 # @mels-loop/i18n
│   ├── content-pipeline/     # @mels-loop/content-pipeline
│   └── ui/                   # @mels-loop/ui
│
└── apps/
    ├── blog/                 # @mels-loop/blog
    └── web/        # @mels-loop/web
```

## Package Breakdown

### `@mels-loop/i18n`
Lowest-dependency package. No build step — export TypeScript source directly.

| What moves here | From |
|---|---|
| `config.ts` (Locale type, locales, getDirection) | `src/i18n/config.ts` |
| `server.ts` (getDictionary) | `src/i18n/server.ts` |
| `client.tsx` (I18nProvider, useTranslation) | `src/i18n/client.tsx` |
| `middleware.ts` (createLocaleMiddleware helper) | extract from `src/middleware.ts` |
| `messages/en.json`, `messages/he.json` | `src/i18n/messages/` |

Exports via `package.json` `"exports"` field pointing to source files.

### `@mels-loop/content-pipeline`
Server-only, no React. Handles markdown processing and content loading.

| What moves here | From |
|---|---|
| `types.ts` | `src/lib/content/types.ts` |
| `markdown/pipeline.ts` + all plugins | `src/lib/markdown/` |
| `loaders/base.ts` (configurable content root) | extract from `src/lib/content/loaders.ts` |
| `loaders/posts.ts` | extract from `loaders.ts` |
| `loaders/stories.ts` | extract from `loaders.ts` |
| `loaders/glossary.ts` | extract from `loaders.ts` |
| `loaders/pages.ts` | extract from `loaders.ts` |

**Key refactor:** Replace hardcoded `CONTENT_DIR = path.join(process.cwd(), "content")` with a configurable `setContentDir(dir)` / `getContentDir()` pair. Each app calls `setContentDir(path.resolve(process.cwd(), "../../content"))` at startup.

### `@mels-loop/ui`
React component library. Peer deps on `react`, `next`, `@mantine/core`, `@mels-loop/i18n`.

| What moves here | From |
|---|---|
| `theme.ts`, `fonts.ts` | `src/lib/theme.ts`, `src/lib/fonts.ts` |
| `tokens.css`, `globals.css` | `src/styles/` |
| Shell (AppShell, Header, Footer, NavMenu, MobileDrawer, ThemeSwitcher, LocaleSwitcher) | `src/components/shell/` |
| ContentRenderer + Figure, CodeBlock, StyledTable, OptimizedImage | `src/components/content/` |
| Annotation system (AnnotationProvider, popovers, PopoverNavBar, PopoverInternalLink, usePopoverContent) | `src/components/content/` |

**Key refactor:** `NavMenu` and `MobileDrawer` currently hardcode `navItems` arrays (confirmed in `src/components/shell/Navigation/NavMenu.tsx:6` and `MobileDrawer.tsx:11`). Refactor to accept `navItems` as a prop. `AppShell` passes them through.

### `@mels-loop/blog` (app)
Minimal app — own routes and two components.

| What lives here | From |
|---|---|
| `PostList.tsx`, `PostCard.tsx` | `src/components/posts/` |
| Posts routes | `src/app/[locale]/posts/` |
| `middleware.ts` | calls `createLocaleMiddleware` from `@mels-loop/i18n` |
| `[locale]/layout.tsx` | adapted from `src/app/[locale]/layout.tsx` with blog-specific navItems |

### `@mels-loop/web` (app)
Main app — stories, glossary, static pages.

| What lives here | From |
|---|---|
| `ArticleLayout`, `StoryCard`, `StoryNav` | `src/components/story/` |
| `GlossaryList`, `GlossaryEntry` | `src/components/glossary/` |
| `ContactForm` | `src/components/forms/` |
| All remaining routes (stories, glossary, about, contact, contribute, home) | `src/app/[locale]/` |
| API routes (captcha, sendgrid) | `src/app/api/` |

## Migration Phases

### Phase 1: Scaffold monorepo infrastructure
- Create `pnpm-workspace.yaml` with `packages: ["apps/*", "packages/*"]`
- Create `turbo.json` with build/dev/lint tasks
- Create `tsconfig.base.json` (extract shared compiler options from current `tsconfig.json`)
- Convert root `package.json` to workspace root

### Phase 2: Extract `@mels-loop/i18n`
Lowest-dependency package, imported everywhere — extract first.
1. Create `packages/i18n/` with `package.json` and source exports
2. Move i18n files
3. Extract `createLocaleMiddleware` helper from `src/middleware.ts`
4. Update all `@/i18n/...` imports to `@mels-loop/i18n/...`
5. Verify build

### Phase 3: Extract `@mels-loop/content-pipeline`
1. Create `packages/content-pipeline/`
2. Move types and markdown pipeline
3. Split `loaders.ts` into domain-specific modules with configurable content root
4. Update all `@/lib/content/...` and `@/lib/markdown/...` imports
5. Verify build

### Phase 4: Extract `@mels-loop/ui`
Most complex — many files, CSS modules, peer deps.
1. Create `packages/ui/`
2. Move styles, theme, fonts
3. Move shell components; refactor NavMenu/MobileDrawer to accept `navItems` prop
4. Move ContentRenderer and sub-components
5. Move annotation system (AnnotationProvider, popovers, etc.)
6. Update all component imports
7. Verify build

### Phase 5: Create `@mels-loop/blog` app
1. Scaffold `apps/blog/` with Next.js config files
2. Create layout (import theme/fonts/shell from `@mels-loop/ui`, pass blog navItems)
3. Move PostList, PostCard, and post routes
4. Add content root initialization
5. Verify `pnpm --filter @mels-loop/blog dev`

### Phase 6: Create `@mels-loop/web` app
1. Scaffold `apps/web/`
2. Move story, glossary, forms components
3. Move all remaining routes (stories, glossary, about, contact, contribute, home, API)
4. Add content root initialization
5. Verify `pnpm --filter @mels-loop/web dev`

### Phase 7: Clean up
- Remove old `src/` directory
- Remove old root app configs
- Run `turbo build` for full workspace build
- Update CI/CD for independent deploys

## Key Decisions Needed

### Domain strategy — Subdomains
`blog.melsloop.com` for the blog, `melsloop.com` for the story browser. Cross-app navigation links (e.g. "Blog" in web's nav, "Glossary" in blog's nav) must use full absolute URLs. The `NavMenu`/`MobileDrawer` refactor should support both relative and absolute `href` values in `navItems`.

### Shared config duplication
Each app needs its own `postcss.config.mjs`, `middleware.ts`, and `[locale]/layout.tsx`. These are small files (5-40 lines each). Accept the duplication — extract shared logic into packages where possible (middleware helper, theme/fonts from `@mels-loop/ui`).

## Risks

1. **`next/font` in shared package** — `next/font/google` must be statically analyzable by Next.js. Works with Turborepo's internal package pattern (source exports, no build step). If it fails, duplicate font declarations in each app's layout (~10 lines).
2. **CSS Modules from packages** — requires source-level exports (no compiled `dist/`). Stick with Turborepo internal package pattern.
3. **Content path resolution** — `setContentDir` must run before any loader call. Add an assertion in `getContentDir()` that throws if the directory doesn't exist.
4. **Mantine + hast version drift** — pin versions across workspace with pnpm `catalog` or `overrides`.
5. **`@/` path alias** — each package/app gets its own mapping. During migration, systematically replace `@/i18n/`, `@/lib/content/`, `@/components/shell/`, etc. with `@mels-loop/...` package imports. Keep `@/` for app-local imports only.

## Verification

1. `turbo build` — both apps compile successfully
2. `pnpm --filter @mels-loop/blog dev` — posts list and individual post pages render in both locales
3. `pnpm --filter @mels-loop/web dev` — stories, codex, glossary popovers, annotations, static pages all work in both locales
4. Cross-app navigation links work (based on chosen domain strategy)
5. Content loading works from both apps (glossary terms, posts, stories)
6. Theme, dark mode, locale switching, RTL all work in both apps
