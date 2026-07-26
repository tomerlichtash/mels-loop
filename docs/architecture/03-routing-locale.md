# 03 — Routing and locale

Next.js App Router under `apps/web/src/app/`, with a `[locale]` segment.

## The locale model, and its cost

`packages/i18n/src/middleware.ts` (wired through `apps/web/src/proxy.ts`, Next
16's renamed middleware file):

- A request for `/he/anything` **302-redirects to `/anything`** and sets the
  `NEXT_LOCALE` cookie.
- A request for a bare path is **rewritten internally** to `/{locale}/...`,
  with the locale resolved from cookie → `Accept-Language` → default (`en`).

So public URLs carry no locale prefix, and there is **exactly one URL per page
for two languages**.

Know what that costs before changing anything near it: a cookie-less crawler
with no `he` in `Accept-Language` always receives English, so the entire Hebrew
corpus has no crawlable address, and `alternates.languages` cannot be expressed
because there is no second URL to point at. `apps/web/src/lib/sitemap.ts`
therefore describes one language.

This is a known, deliberate trade-off, not an oversight — but it is the single
largest constraint on the site's reach. Revisiting it means serving both `/x`
and `/he/x` and canonicalising each to itself.

## Static vs dynamic

Nearly everything is prerendered. The mechanism is one four-line function:

```ts
// apps/web/src/app/[locale]/layout.tsx
export function generateStaticParams() {
  return getLocales().map((locale) => ({ locale }));
}
```

Enumerating the locales at the layout level lets **every child route prerender
without declaring its own params**. Routes with their own dynamic segment
(`[storySlug]`, `[termSlug]`, …) still need their own `generateStaticParams`.

Only one content route is intentionally dynamic: `/[locale]/sources`, because it
reads `searchParams` for filtering. If anything else shows `ƒ` in the build
output, it is missing params — that is the check.

There is no ISR anywhere. No `revalidate`, no `dynamic`, no `dynamicParams`.

## Sticky chrome

Three bars stack: site header, story panel, story section tabs. Their heights
are **authoritative tokens** in `apps/web/src/styles/layout.css`:

```
--ml-header-height          48px
--ml-story-panel-height     36px
--ml-story-sections-height  38px
```

Each bar sets its own `height` from its token, and every sticky `top` and
`scroll-margin` that must clear them is calculated from the same tokens. Change
a bar's height by changing its token; everything downstream follows.

This inverted an earlier arrangement where the variables were *descriptive* —
read in four places, written nowhere, with hardcoded fallbacks. They had already
drifted 4px, quietly misplacing the sidebar's sticky offset and every deep-link
scroll target.

`--ml-header-offset` is the exception: it is written from JS in
`SiteHeader.tsx`, flipping between `0` and the header height as the header hides
and shows on scroll.

Sticky bars need an opaque-enough background. 60% was not enough — content read
straight through. See chapter 02 for the `backdrop-filter` prefix trap that made
this worse.

## Build output as a test

`pnpm build` prints a route table. Two things to check after touching routing:

- `ƒ` appears only for `/api/*`, `/auth/*` and `/[locale]/sources`.
- The page count is roughly what you expect — it changes when content is added
  or parked, and an unexpected drop means a `generateStaticParams` returned
  nothing.
