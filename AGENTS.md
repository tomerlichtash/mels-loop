# AGENTS.md — Mel's Loop

## Project Overview

**Mel's Loop** is a Next.js web application that renders markdown content into richly annotated, bilingual HTML pages. It started as "A Comprehensive Guide to The Story of Mel" and is being rewritten as a **multi-story platform** — a site that can host many stories, each with its own annotations, articles, resources, and glossary.

**Live site:** https://melsloop.com
**Repository:** https://github.com/tomerlichtash/mels-loop

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (latest, App Router) |
| Language | TypeScript (strict mode) |
| UI Library | Mantine v8 |
| Styling | CSS Modules + CSS custom properties |
| Markdown | unified (remark/rehype) + gray-matter |
| Fonts | Google Fonts via next/font (Roboto Slab, Assistant) |
| Package Manager | pnpm |
| Testing | Playwright (E2E), Vitest (unit) |
| Linting | ESLint + Prettier |

## Principles

These principles guide every decision in this codebase. Follow them strictly.

### 1. Simplicity over cleverness
- Write the simplest code that solves the problem. If a junior developer can't understand it in 30 seconds, it's too complex.
- No abstractions until you need them at least twice. Three similar lines of code are better than a premature helper function.
- Flat is better than nested. Avoid deep directory hierarchies, deeply nested types, or multi-level inheritance.

### 2. Clean, readable code
- Short files. If a file exceeds ~200 lines, it probably does too much. Split it.
- Descriptive names. `loadStoryArticle()` not `getFSCPD()`. Name things for what they do, not how they work.
- No commented-out code. Delete it. Git has history.
- No TODO comments without an associated issue.

### 3. Use the platform and the libraries
- **Use Next.js APIs as documented.** `generateStaticParams`, `generateMetadata`, server components, route handlers. Don't reinvent what the framework provides.
- **Use Mantine components as documented.** Don't wrap Mantine components in custom wrappers unless absolutely necessary. Use their props, their theming, their hooks.
- **Use unified/remark/rehype as documented.** Write plugins that follow the unified plugin conventions. Use `unist-util-visit`, return proper transformer functions.
- Don't fight the framework. If something feels hard, you're probably doing it wrong.

### 4. No over-engineering
- No custom event systems, message buses, or pub/sub patterns. React state and context are enough.
- No class-based patterns. Use functions, hooks, and plain objects.
- No generic utility libraries. Write specific functions for specific needs.
- No builder patterns, factory functions, or dependency injection. Keep it direct.
- No `I` prefix on interfaces. No Hungarian notation. TypeScript types should be simple and obvious.

### 5. Minimal, obvious types
- Prefer inferred types. Don't annotate what TypeScript can figure out.
- Keep interfaces small. If a type has more than 8 fields, consider whether the data structure is right.
- Avoid `Record<string, Record<string, ...>>` nesting. Use flat structures and lookup functions.
- No enum-like const objects or string union type gymnastics. Use simple string literals or actual enums when needed.

### 6. CSS with purpose
- All styling via CSS Modules (`.module.css`) and CSS custom properties.
- Use CSS logical properties (`margin-inline-start`, not `margin-left`) for RTL support.
- **Never use inline styles** unless there is absolutely no other choice. All styling must go through CSS Modules (`.module.css`) or CSS classes in `globals.css`.
- No utility classes.
- Keep selectors simple. One class per element is usually enough. Avoid nesting beyond two levels.
- Design tokens live in `src/styles/tokens.css` as CSS custom properties with `--ml-` prefix.

### 7. Content is king
- Markdown files in `content/` are the source of truth. The codebase serves them, not the other way around.
- The markdown pipeline should be boring. Standard remark/rehype plugins where possible, small custom plugins only when needed.
- Every custom remark plugin does exactly one thing and has a unit test.

### 8. Build should be boring
- `pnpm install` then `pnpm dev`. That's it. No environment setup scripts, no Docker requirements for development.
- No custom webpack config. No build plugins beyond what Next.js and Mantine require (PostCSS preset).
- No build-time code generation. No scripts that must run before the app works.
- If the build takes more than a minute, something is wrong.

### 9. Test what matters
- Unit tests for markdown plugins (they transform data, easy to test).
- Unit tests for content loaders (they read files and return data).
- E2E tests for critical user flows (navigation, locale switching, annotation popovers).
- Don't test implementation details. Test behavior.

### 10. Fail loudly
- No silent error swallowing. If something fails, throw or log visibly.
- No fallback content that hides broken data. If an annotation is missing, show an error state, don't pretend it's fine.
- Use TypeScript strict mode. If the compiler complains, fix the code, don't cast to `any`.

## Content Structure

```
content/
  stories/
    the-story-of-mel/
      index.en.md / index.he.md     # Story landing
      story.json                     # Story config
      annotations/                   # Inline reference content
        mel-kaye-bio/index.en.md
        ...
      articles/                      # Story articles
        preface/index.en.md
        ...
      resources/index.en.md          # Bibliography / links
      codex/                         # Reference pages
  glossary/                          # Shared glossary terms
  posts/                             # Blog posts
  pages/                             # Static pages (about, contact, contribute)
```

## Route Structure

```
src/app/
  [locale]/
    page.tsx                         # Home
    stories/
      [storySlug]/
        page.tsx                     # Story landing
        articles/[articleSlug]/page.tsx
        resources/page.tsx
        codex/[pageSlug]/page.tsx
    glossary/[termSlug]/page.tsx
    posts/[postSlug]/page.tsx
    about/page.tsx
    contact/page.tsx
    contribute/page.tsx
```

## Key Architectural Decisions

1. **All content is loaded at build time.** No runtime API for content delivery. Annotations and glossary terms are embedded in page props. Popovers are instant.

2. **Markdown → hast → React.** The unified pipeline produces a hast (HTML AST) tree. `hast-util-to-jsx-runtime` converts it to React elements with custom component overrides. No custom recursive renderer.

3. **One remark plugin per concern.** Strip comments, detect annotations, detect glossary links, promote figures, handle verse mode — each is a separate, testable plugin.

4. **Route-based i18n.** `[locale]` segment in App Router. Middleware redirects bare URLs to `/{locale}/...`. UI strings in JSON files, content in locale-specific markdown files.

5. **Mantine for UI, CSS variables for design tokens.** Mantine handles components (Popover, AppShell, Drawer, forms, etc.) and dark/light mode. Our CSS variables (`--ml-*`) handle the design system. They work together, not against each other.

6. **Multi-story by default.** Every story is a folder in `content/stories/` with a `story.json`. Adding a story requires zero code changes.

## Workflow

### Branch safety — CRITICAL
- All rewrite work happens on the `rewrite` branch. **Never merge to main/master. Never push to main/master. Never pull from main/master.**
- Do not run `git push` unless explicitly asked by the user.
- Do not run `git checkout main`, `git merge main`, `git rebase main`, or any command that touches the main branch.
- This branch is completely isolated until the rewrite is complete, tested, and ready to deploy. The decision to merge will be made deliberately by the user, not by an agent.
- If you accidentally affect main, stop immediately and alert the user.

### Follow the implementation plan
- The rewrite follows a phased implementation plan (`IMPLEMENTATION-PLAN.md`). Work through it step by step.
- Complete one step fully before moving to the next. Don't jump ahead.
- After completing each step, verify it works as described in the plan.

### Commit incrementally
- Commit after each meaningful step — not at the end of a phase, not after every line change.
- Each commit should leave the project in a working state (builds, no errors).
- Write clear commit messages that reference the implementation step (e.g., "Phase 1.3: Set up design system tokens").
- Small, focused commits are better than large monolithic ones.

### Update the plan as you go
- After implementing a step, update `IMPLEMENTATION-PLAN.md` to mark it as done.
- If a step turned out differently than planned (different approach, extra files needed, something was unnecessary), update the plan to reflect reality.
- The plan is a living document, not a contract. Adjust it as you learn.

### Ask when unclear
- If a requirement is ambiguous, ask the user before guessing.
- If a technical decision has multiple valid approaches, present the options and ask.
- If something in the plan doesn't make sense given what you've learned, flag it.
- It's always better to ask one question than to redo work.

## Guidelines for Agents

### Before writing code
- Read the files you're about to change. Understand context.
- Check if a Mantine component or a remark plugin already does what you need. Don't build what exists.
- Check both locale variants (en/he) when working on content features.

### When writing code
- Keep files small and focused.
- Name things clearly. Optimize for reading, not writing.
- Use `async/await`, not callbacks or `.then()` chains.
- Prefer `const` over `let`. Never use `var`.
- Use early returns to reduce nesting.
- CSS logical properties for all directional styles.

### Content files
- Markdown files in `content/` are the source of truth.
- Frontmatter uses YAML between `---` markers.
- Annotation links: `[^](annotations/id)` — glossary links: `[^](glossary/id)`.
- Parse mode via frontmatter: `parse_mode: verse`.

### Testing
- `pnpm test:unit` — Vitest unit tests
- `pnpm test:e2e` — Playwright E2E tests
- Every remark plugin has a unit test.
- Run tests before considering work complete.

### Environment
- pnpm for package management
- `pnpm dev` — development server
- `pnpm build` — production build
- `pnpm lint` — ESLint
