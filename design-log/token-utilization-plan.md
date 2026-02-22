# Design Token Utilization Plan

Full coverage plan for `packages/ui/src/styles/tokens.css` and all consuming CSS modules.

---

## 0. File Structure

### Current state

```
packages/ui/src/styles/
  tokens.css       ← all tokens (palette, semantic, spacing, layout) + dark theme overrides
  globals.css      ← imports tokens.css, CSS reset, base element styles
```

`globals.css` is imported once in `packages/ui/src/layout.tsx`. All CSS modules then consume tokens via `var(--ml-*)`.

Both apps have empty PostCSS configs (`plugins: {}`).

### Problems

1. **Single monolithic token file** — palette, semantic colors, typography, spacing, layout, shadows, and dark theme overrides are all in one 180-line file. As we add ~32 new tokens this will grow to ~250 lines.
2. **No separation between stable primitives and theme-variable values** — palette definitions and dark mode overrides live in the same file, making it hard to reason about what changes per theme.
3. **Reset mixed with base styles** — `globals.css` combines CSS reset rules (`box-sizing`, `margin: 0`) with opinionated base styles (link colors, scrollbar theming). These serve different purposes.
4. **No home for breakpoints** — `@custom-media` declarations need a file, and they can't live in `tokens.css` because they aren't CSS custom properties.

### Target structure

```
packages/ui/src/styles/
  tokens/
    palette.css       ← raw color values (--ml-white, --ml-cream-*, --ml-gray-*, --ml-pink, etc.)
    typography.css    ← font families, font size scale, line-height scale, font weights, letter spacing
    spacing.css       ← --ml-space-* scale
    layout.css        ← --ml-content-max-width, --ml-page-max-width, --ml-header-height, --ml-border-radius-*
    effects.css       ← shadows, transitions (durations + easings), overlay
    semantic.css      ← all semantic aliases (--ml-bg, --ml-text, --ml-link, --ml-popover-*, --ml-header-*, etc.)
                        maps palette values to purpose — light mode defaults
    media.css         ← @custom-media breakpoint declarations
    index.css         ← imports all of the above in dependency order
  themes/
    dark.css          ← [data-color-scheme='dark'] overrides for semantic tokens only
  reset.css           ← pure CSS reset (box-sizing, margin, img max-width) — no design opinions
  globals.css         ← imports tokens/index.css, themes/dark.css, reset.css
                        then sets opinionated base styles (body typography, link colors, scrollbar)
```

### Dependency order inside `tokens/index.css`

```css
@import './palette.css';
@import './typography.css';
@import './spacing.css';
@import './layout.css';
@import './effects.css';
@import './semantic.css';
@import './media.css';
```

`semantic.css` must come last among tokens because it references palette values via `var()`.

### Updated `globals.css`

```css
@import './tokens/index.css';
@import './themes/dark.css';
@import './reset.css';

/* ---- Base styles ---- */
body {
  background-color: var(--ml-bg);
  color: var(--ml-text);
  font-family: var(--font-roboto-slab, var(--ml-font-latin));
  font-size: var(--ml-font-size-body);
  line-height: var(--ml-line-height-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[dir='rtl'] body {
  font-family: var(--font-assistant, var(--ml-font-hebrew));
}

a {
  color: var(--ml-link);
  text-decoration: none;
}
a:hover {
  color: var(--ml-link-hover);
}

:root {
  scrollbar-color: var(--ml-border) transparent;
  scrollbar-width: thin;
}
```

### Updated `reset.css` (extracted from globals)

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}

img {
  max-width: 100%;
  height: auto;
}
```

### Why this structure

- **Each token file is independently readable** — a designer can open `typography.css` and see every type decision in one place.
- **Themes only override semantic tokens** — `dark.css` never touches palette or scale values, only remaps semantics. Adding a future theme (e.g. high-contrast) means adding one file.
- **Breakpoints get a proper home** — `media.css` holds `@custom-media` declarations, imported alongside other tokens.
- **Reset is pure** — no design opinions leak into the reset. Can be swapped or removed without touching the design system.
- **`globals.css` stays the single entry point** — `layout.tsx` still imports one file. The internal split is invisible to consumers.

### Migration

This is a non-breaking refactor. No component CSS modules change — they still reference the same `var(--ml-*)` names. Only the internal organization of where those `--ml-*` variables are declared changes.

Do this as Phase 0, before adding any new tokens, so the new tokens land in their proper files from the start.

### PostCSS config update

Both `apps/web/postcss.config.mjs` and `apps/blog/postcss.config.mjs` need `postcss-custom-media` added:

```js
import postcssCustomMedia from 'postcss-custom-media';

const config = {
  plugins: {
    'postcss-custom-media': {},
  },
};

export default config;
```

Install the plugin at root: `pnpm add -D postcss-custom-media -w`

---

## Unit Conventions

| Unit | Use for | Why |
|------|---------|-----|
| `rem` | Font sizes, spacing tokens | Scales with user's root font-size preference (accessibility) |
| `px` | Border-radius, shadows, borders, fixed layout dimensions (header height, max-widths) | Visual constants that shouldn't scale with text |
| `em` | Component-internal padding that scales with the component's own font size | Button padding is the classic case — a large button with larger text needs proportionally larger padding |
| unitless | Line-height, font-weight | CSS best practice — unitless line-heights inherit correctly; `1.5` means 1.5x the element's font size, so it adapts naturally across heading/body/caption sizes |

### Fix: `--ml-line-height-body`

Currently `--ml-line-height-body: 1.5rem` — this is wrong. A `rem`-based line-height is a fixed pixel value that doesn't scale with the element's font size. This causes cramped text in larger headings and loose text in small captions.

Change to unitless:

```css
--ml-line-height-body: 1.5;   /* was 1.5rem */
```

All other line-height tokens in this plan already use unitless values.

---

## 1. Typography Scale

### Current state

Only one token exists: `--ml-font-size-body: 0.875rem`. 52 hardcoded font-size values across 25 CSS modules.

### New tokens

```css
/* Font Size Scale */
--ml-font-size-2xs:  0.6rem;     /* popover separator */
--ml-font-size-xs:   0.7rem;     /* badge, popover nav, annotation trigger */
--ml-font-size-sm:   0.75rem;    /* source text, tooltip, section titles */
--ml-font-size-body: 0.875rem;   /* (exists) body copy, nav links */
--ml-font-size-md:   1rem;       /* buttons md, h5, logo text */
--ml-font-size-lg:   1.125rem;   /* h4, nav content title */
--ml-font-size-xl:   1.25rem;    /* h3 */
--ml-font-size-2xl:  1.5rem;     /* h2, close button */
--ml-font-size-3xl:  2rem;       /* h1 */
```

Note: `0.8rem` (code blocks, popover bodies, breadcrumbs) and `0.8125rem` (footer description, locale switcher, story subtitle) appear frequently. These sit between `--ml-font-size-sm` and `--ml-font-size-body`. Options:
- Round them to `--ml-font-size-sm` (0.75rem) — tighter scale, fewer tokens
- Add `--ml-font-size-base: 0.8125rem` — preserves the existing visual rhythm

Recommendation: round to `--ml-font-size-sm`. The 0.05rem difference is imperceptible.

### Line-height scale

Currently only `--ml-line-height-body: 1.5rem`. Hardcoded values: `1`, `1.3`, `1.4`, `1.5`, `1.55`.

```css
/* Line Height Scale */
--ml-line-height-none:    1;       /* buttons, annotation triggers */
--ml-line-height-tight:   1.3;     /* headings */
--ml-line-height-snug:    1.4;     /* popover body, compact text */
--ml-line-height-body:    1.5rem;  /* (exists) body copy — keep as rem */
--ml-line-height-relaxed: 1.55;    /* Text primitive */
```

### Font weight — missing semibold

```css
--ml-font-weight-semibold: 600;  /* used in Text, Footer */
```

### Rollout: files to update

| File | What changes |
|------|-------------|
| `Title.module.css` | h1-h6 sizes -> `--ml-font-size-3xl` through `--ml-font-size-body` |
| `Text.module.css` | xs/sm/md/lg sizes -> scale tokens; weights -> weight tokens; line-height -> token |
| `Button.module.css` | xs-xl sizes -> scale tokens; weight -> token |
| `Badge.module.css` | size -> `--ml-font-size-xs`; weight -> token |
| `Alert.module.css` | size -> `--ml-font-size-body`; weight -> token |
| `ContentRenderer.module.css` | inline code size -> `--ml-font-size-sm` |
| `GlossaryPopover.module.css` | header title, sub, body, source sizes -> tokens; weights -> tokens; line-height -> token |
| `AnnotationPopover.module.css` | trigger, body, source sizes -> tokens; weights -> tokens; line-height -> tokens |
| `PopoverNavBar.module.css` | nav, crumb, separator, current sizes -> tokens |
| `CodeBlock.module.css` | code size -> `--ml-font-size-sm` |
| `Header.module.css` | logo sizes -> `--ml-font-size-md`; weights -> tokens |
| `Footer.module.css` | all sizes -> tokens; weights -> tokens; line-height -> token |
| `NavMenu.module.css` | link, content title, description, section, story sizes -> tokens; weights -> tokens |
| `LocaleSwitcher.module.css` | sizes -> tokens; weights -> tokens |
| `MobileDrawer.module.css` | title, close, link sizes -> tokens; weight -> token |
| `Breadcrumb.module.css` | size -> `--ml-font-size-sm` |
| `ThemeSwitcher.module.css` | tooltip size -> `--ml-font-size-sm` |

---

## 2. Spacing Utilization

### Current state

Full scale exists (`--ml-space-xs` through `--ml-space-3xl`) but 60+ values are hardcoded with raw `rem`/`px` instead of tokens.

### No new tokens needed

The existing scale covers almost everything. The only value not in the scale is `0.75rem` (between `--ml-space-sm` and `--ml-space-md`). This appears in `CodeBlock` padding and `StyledTable` cell padding.

Options:
- Add `--ml-space-ms: 0.75rem` (mid-small)
- Round to `--ml-space-sm` or `--ml-space-md`

Recommendation: add nothing. Use `--ml-space-sm` for tight spots and `--ml-space-md` elsewhere. The 0.25rem difference in padding is negligible.

### Values that are NOT candidates for spacing tokens

These are component-intrinsic sizes, not spacing decisions:
- Icon dimensions (`width: 24px`, `height: 24px`)
- Burger line height (`2px`)
- Drawer width (`280px`)
- Dropdown width (`450px`)
- Arrow/chevron sizes (`8px`, `10px`)
- `em`-based button padding (scales with font size — correct as-is)

### Rollout: files to update

Direct replacements (hardcoded value -> existing token):

| File | Examples of replacements |
|------|------------------------|
| `ContentRenderer.module.css` | `1rem` -> `--ml-space-md`, `2rem` -> `--ml-space-xl`, `0.5rem` -> `--ml-space-sm`, `1.5rem` -> `--ml-space-lg`, `0.25rem` -> `--ml-space-xs` |
| `Figure.module.css` | `1.5rem` -> `--ml-space-lg`, `0.5rem` -> `--ml-space-sm` |
| `PopoverNavBar.module.css` | `0.25rem` -> `--ml-space-xs`, `0.5rem` -> `--ml-space-sm` |
| `StyledTable.module.css` | `1rem` -> `--ml-space-md`, `0.5rem` -> `--ml-space-sm` |
| `CodeBlock.module.css` | `1rem` -> `--ml-space-md` |
| `Alert.module.css` | `0.25rem` -> `--ml-space-xs` |
| `ThemeSwitcher.module.css` | `4px`/`8px` -> `--ml-space-xs`/`--ml-space-sm` |
| `Header.module.css` | `32px` -> `--ml-space-xl` (2rem = 32px at default root) |
| `Footer.module.css` | `6px` -> `--ml-space-xs` (close enough at 4px, or leave) |

---

## 3. Colors

### Current state

Well-tokenized overall. 10 hardcoded color values remain.

### New tokens

```css
/* Alert semantic colors (light mode) */
--ml-alert-success-bg:   #e6f9e6;
--ml-alert-success-text:  #1a7a1a;
--ml-alert-error-bg:     #fde8e8;
--ml-alert-error-text:    #991b1b;

/* Overlay */
--ml-overlay-bg: rgba(0, 0, 0, 0.5);

/* Shadow variant */
--ml-shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.12);
```

Dark mode overrides:

```css
[data-color-scheme='dark'] {
  --ml-alert-success-bg:   #0a2e0a;
  --ml-alert-success-text:  #86efac;
  --ml-alert-error-bg:     #2e0a0a;
  --ml-alert-error-text:    #fca5a5;
}
```

### Rollout: files to update

| File | What changes |
|------|-------------|
| `Alert.module.css` | 8 hex values -> 4 semantic tokens (auto-switch in dark mode via overrides) |
| `MobileDrawer.module.css` | `rgba(0,0,0,0.5)` -> `--ml-overlay-bg` |
| `NavMenu.module.css` | inline shadow -> `--ml-shadow-sm` |

---

## 4. Border Radius

### Current state

One token: `--ml-border-radius: 6px`. Three additional values hardcoded.

### New tokens

```css
--ml-border-radius-sm:   3px;    /* annotation trigger */
--ml-border-radius:      6px;    /* (exists) default */
--ml-border-radius-pill:  999px;  /* badge */
--ml-border-radius-full:  50%;   /* circular buttons / loading spinner */
```

### Rollout: files to update

| File | What changes |
|------|-------------|
| `AnnotationPopover.module.css` | `3px` -> `--ml-border-radius-sm` |
| `Badge.module.css` | `999px` -> `--ml-border-radius-pill` |
| `Button.module.css` | `50%` -> `--ml-border-radius-full` |
| `Header.module.css` | `1px` -> leave as-is (sub-pixel, decorative burger line) |

---

## 5. Transitions & Animation

### Current state

No tokens. 21 hardcoded duration/easing pairs.

### New tokens

```css
/* Durations */
--ml-duration-fast:   150ms;   /* button hover, theme tooltip, nav item hover */
--ml-duration-normal: 200ms;   /* fade in/out, drawer overlay */
--ml-duration-slow:   250ms;   /* nav menu open/close, chevron rotate, dropdown scale */

/* Easing */
--ml-ease-default: ease;
--ml-ease-out:     ease-out;   /* tooltip fade-in */
```

Special case: `Button.module.css` spinner uses `0.6s linear infinite` — this is an animation, not a UI transition. Leave as hardcoded.

### Rollout: files to update

| File | What changes |
|------|-------------|
| `Button.module.css` | hover transition -> `--ml-duration-fast` `--ml-ease-default` |
| `NavMenu.module.css` | chevron/dropdown/scale/fade animations -> duration + ease tokens |
| `MobileDrawer.module.css` | overlay + slide animations -> `--ml-duration-normal` `--ml-ease-default` |
| `AnnotationPopover.module.css` | fadeIn -> `--ml-duration-fast` `--ml-ease-default` |
| `GlossaryPopover.module.css` | fadeIn -> `--ml-duration-fast` `--ml-ease-default` |
| `ThemeSwitcher.module.css` | tooltip fadeIn -> `--ml-duration-fast` `--ml-ease-out` |

---

## 6. Breakpoints

### Current state

One breakpoint (`768px`) repeated in 6 places across 4 files. CSS custom properties cannot be used in `@media` queries.

### Approach

Use PostCSS custom media queries via `postcss-custom-media` (already have PostCSS in the stack):

```css
/* tokens.css or a new media.css */
@custom-media --ml-bp-desktop (min-width: 768px);
@custom-media --ml-bp-mobile (max-width: 767px);
```

Usage:

```css
@media (--ml-bp-desktop) { ... }
@media (--ml-bp-mobile) { ... }
```

### Rollout: files to update

| File | What changes |
|------|-------------|
| PostCSS config | add `postcss-custom-media` plugin |
| `tokens.css` (or new `media.css`) | add `@custom-media` declarations |
| `Header.module.css` | 3 media queries -> custom media |
| `Footer.module.css` | 1 media query -> custom media |
| `MobileDrawer.module.css` | 1 media query -> custom media |

---

## 7. Letter Spacing

### Current state

Three hardcoded values: `0.5px` and `1px`.

### New tokens

```css
--ml-letter-spacing-tight: 0.5px;   /* badge, footer column title */
--ml-letter-spacing-wide:  1px;     /* footer copyright, header logo */
```

### Rollout: files to update

| File | What changes |
|------|-------------|
| `Badge.module.css` | `0.5px` -> `--ml-letter-spacing-tight` |
| `Footer.module.css` | `1px` -> `--ml-letter-spacing-wide`, `0.5px` -> `--ml-letter-spacing-tight` |
| `Header.module.css` | `1px` -> `--ml-letter-spacing-wide` |

---

## Execution Order

Recommended sequence to minimize risk and allow incremental verification:

### Phase 0 — File structure refactor

1. Create `tokens/` directory with `palette.css`, `typography.css`, `spacing.css`, `layout.css`, `effects.css`, `semantic.css`, `media.css`, `index.css`
2. Move existing token definitions from `tokens.css` into their respective files
3. Extract dark overrides into `themes/dark.css`
4. Extract reset rules into `reset.css`
5. Rewrite `globals.css` to import from new structure
6. Delete old `tokens.css`
7. Install `postcss-custom-media`, update both PostCSS configs
8. `pnpm build` — verify no regressions (all `var()` references still resolve)

### Phase 1 — Add new tokens (no component changes)

Add all new tokens listed in sections 1-7 into their respective files. Existing components are unaffected since nothing references the new tokens yet.

### Phase 2 — Typography (highest impact, most files)

1. Wire font-size tokens into `Title.module.css` and `Text.module.css` first (primitives set the pattern)
2. Wire into shell components (`Header`, `Footer`, `NavMenu`, `MobileDrawer`, `LocaleSwitcher`, `Breadcrumb`, `ThemeSwitcher`)
3. Wire into content components (`ContentRenderer`, `CodeBlock`, `GlossaryPopover`, `AnnotationPopover`, `PopoverNavBar`)
4. Wire font-weight tokens (all files)
5. Wire line-height tokens (all files)

### Phase 3 — Spacing

Replace raw `rem`/`px` values with `--ml-space-*` tokens in all files listed above.

### Phase 4 — Colors, radius, shadows

1. Add alert semantic color tokens + dark overrides, update `Alert.module.css`
2. Add overlay token, update `MobileDrawer.module.css`
3. Add shadow variant, update `NavMenu.module.css`
4. Add radius variants, update `Badge`, `Button`, `AnnotationPopover`

### Phase 5 — Transitions

Wire duration and easing tokens into all animation/transition declarations.

### Phase 6 — Breakpoints & letter-spacing

1. Add `postcss-custom-media` and `@custom-media` declarations
2. Update all `@media` queries
3. Wire letter-spacing tokens

---

## Verification

After each phase:
1. `pnpm build` — no regressions
2. Visual check of both apps in light + dark mode, en + he locales
3. Check popover/menu animations still feel right (timing-sensitive)

---

## Token count summary

| Category | Existing | New | Total |
|----------|----------|-----|-------|
| Colors (palette) | 17 | 0 | 17 |
| Colors (semantic) | 30 | 6 | 36 |
| Font sizes | 1 | 8 | 9 |
| Line heights | 1 | 4 | 5 |
| Font weights | 4 | 1 | 5 |
| Spacing | 7 | 0 | 7 |
| Layout | 4 | 0 | 4 |
| Border radius | 1 | 3 | 4 |
| Shadows | 1 | 1 | 2 |
| Transitions | 0 | 5 | 5 |
| Letter spacing | 0 | 2 | 2 |
| Breakpoints | 0 | 2 | 2 |
| **Total** | **66** | **32** | **98** |

32 new tokens to eliminate ~180 hardcoded values across 25 CSS modules.
