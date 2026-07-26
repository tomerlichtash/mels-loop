# 02 — Styling and tokens

CSS Modules everywhere, colocated with the component. No utility classes, no
inline styles, no CSS-in-JS. Every value comes from a `--ml-*` custom property.

## The token cascade

Four layers in `packages/ui/src/styles/tokens/`, each consuming the one above:

| Layer | File | Holds |
|---|---|---|
| Palette | `color/palette.css` | Raw oklch values. Never referenced by components. |
| Intent | `color/intent.css` | Seven intents × seven variants. |
| Semantic | `color/semantic.css` | Role names — `--ml-text-color`, `--ml-border-color`. **This is what components use.** |
| Theme | `themes/dark.css` | Overrides under `[data-color-scheme='dark']`. |

Plus `base/` for typography, spacing, radius, shadow and effects, and
`media.css` for the breakpoints.

`color/contract.css` is **generated** — run `pnpm --filter @mels-loop/ui
generate:contract`, and `check:contract` verifies it in CI. Don't hand-edit it.

### The rule that keeps getting broken

Text colours reference palette neutrals directly. They do **not** reference
surface or intent tokens — a surface colour is a background, and using one as a
foreground guarantees poor contrast. `semantic.css` states this in a comment
above the declarations, and the rule was still broken:
`--ml-text-muted-color` pointed at `--ml-color-surface-muted`, which in light
mode is a near-white background tint. Breadcrumbs and table-of-contents author
lines measured **1.6:1**. That token is consumed by 21 CSS files.

Measure contrast with backgrounds **alpha-composited over their ancestors**. A
naive check reads an ancestor's `rgba(…, 0.1)` as an opaque colour and reports
failures that don't exist.

## Bilingual CSS

The site is English and Hebrew. This is not a detail you can bolt on later.

- **Logical properties only.** `margin-inline-start`, `padding-inline-end`,
  `inset-inline-start`, `border-inline-start`. Never `left`/`right`.
- Flexbox and Grid respect `direction` automatically. Column order flips for
  free — no RTL overrides needed for layout.
- Full-width breakout: `width: 100vw; margin-inline-start: calc(-50vw + 50%);`
- **`linear-gradient` and `mask-image` have no logical direction keyword.** A
  `to right` fade sits on the wrong edge in Hebrew. Either make it symmetric or
  don't use it. This has already caused one bug.
- Check both `/` and `/he/` for any layout change. Not optional.

## Breakpoints

`@custom-media --ml-bp-mobile (max-width: 767px)` and `--ml-bp-desktop
(min-width: 768px)`, defined in `tokens/media.css` and available in app CSS via
PostCSS. Use them.

The app also contains ad-hoc values — 640, 700, 800, 1024, 1100 — from before
the custom media existed. Don't add more. The story sidebar collapses at 1024px,
which is a genuine content-tier breakpoint distinct from the chrome tier.

## Footguns with receipts

**`-webkit-backdrop-filter` must precede the unprefixed `backdrop-filter`** or
lightningcss, Next's CSS pipeline, drops it entirely
([vercel/next.js#78302](https://github.com/vercel/next.js/issues/78302)). This
silently broke the frosted-glass effect on all three sticky bars, which was only
visible as prose bleeding through them while scrolling.

**Roboto Slab is loaded at 300/400/500/700 only.** A declared `600` silently
resolves to `700`, and `500` measures 0.8px wider than `400` across a
13-character string — visually nothing. Weight is a weak lever in this face;
reach for size or colour.

**Setting the same property from two single-class selectors is a coin flip.**
Specificity ties are resolved by stylesheet order, and production chunking can
reorder it. Set a custom property from the outer rule instead, or remove one of
the two layers.

## Component conventions

Prefer a `@mels-loop/ui` primitive over new markup — there are ~32. A new one
needs `Component.tsx`, `Component.module.css`, `Component.stories.tsx` with a
`Default` export, and `Component.spec.ts`.

Storybook: `pnpm --filter @mels-loop/ui storybook`. Toolbar toggles for colour
scheme and direction, so RTL and dark mode are both checkable there.
