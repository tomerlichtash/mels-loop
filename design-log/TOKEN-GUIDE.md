# Token System Guide

Conventions for design tokens in `packages/ui/src/styles/`.

> **Note:** The current token files have naming inconsistencies and structural problems documented in this guide. All tokens will be migrated to conform to these conventions.

---

## Layer structure

Tokens are organized into four layers, each with a distinct responsibility. Lower layers feed into higher ones — never the reverse.

```
┌─────────────────────────────────────┐
│  Component tokens                   │  --ml-button-background-color, --ml-code-border-color
│  (component CSS modules)            │  values set by theme files
├─────────────────────────────────────┤
│  Semantic tokens                    │  --ml-background-color, --ml-text-color, --ml-border-color
│  (tokens/semantic.css)              │  light values set here; dark.css overrides
├─────────────────────────────────────┤
│  Scale tokens                       │  --ml-space-md, --ml-radius-lg, --ml-font-size-sm
│  (tokens/spacing, typography, etc.) │  fixed values, theme-agnostic
├─────────────────────────────────────┤
│  Palette                            │  --ml-gray-500, --ml-pink, --ml-blue
│  (tokens/palette.css)               │  raw color values, no semantic meaning
└─────────────────────────────────────┘
```

Rules:
- A layer may only reference tokens from layers below it
- Components reference their own local tokens only — never palette or scale tokens directly
- Palette tokens are never used in components or semantic token files directly by components

---

## Token files

```
styles/
  tokens/
    palette.css      ← raw color values
    typography.css   ← font family, size scale, weight, line-height, letter-spacing
    spacing.css      ← space scale
    radius.css       ← border-radius scale
    effects.css      ← shadows, overlays, durations, easing
    layout.css       ← max-widths, structural dimensions
    semantic.css     ← global semantic color mappings (light theme default)
    media.css        ← @custom-media breakpoint declarations
    index.css        ← barrel import

  themes/
    dark.css         ← dark theme overrides for semantic color tokens
```

---

## Naming conventions

### Always kebab-case

Token names are always kebab-case. Never camelCase, PascalCase, or snake_case.

```css
/* correct */
--ml-nav-menu-background-color
--ml-code-border-color
--ml-font-size-sm

/* wrong */
--ml-navMenuBg
--ml-CodeBorderColor
--ml-font_size_sm
```

### Names end with what they represent

The final segment of a token name describes the CSS value type. This prevents ambiguity — a reader should know from the name alone what kind of value the token holds.

| Value type | Suffix | Example |
|---|---|---|
| Color (text, border, icon) | `-color` | `--ml-text-color`, `--ml-border-color` |
| Background color | `-background-color` | `--ml-header-background-color`, `--ml-code-background-color` |
| Size / dimension | `-size`, `-width`, `-height` | `--ml-icon-size`, `--ml-header-height` |
| Border radius | `-radius` | `--ml-button-radius` |
| Font size | `-font-size` | `--ml-button-font-size` |
| Font weight | `-font-weight` | `--ml-button-font-weight` |
| Spacing | `-padding-*`, `-gap`, `-margin-*` | `--ml-button-padding-horizontal` |
| Duration | `-duration` | `--ml-button-duration` |

No shorthands. The suffix must match the CSS property name it will be assigned to. This matters when a component has multiple background-related tokens — `--ml-badge-background-color` and `--ml-badge-background-image` are unambiguous; `--ml-badge-bg` is not.

```css
/* wrong — ambiguous, unclear what type of value this is */
--ml-code-border

/* correct — clearly a color value */
--ml-code-border-color
```

### Directional suffixes

When a token applies to a specific axis or side, use full words — not shorthand letters.

```css
/* correct */
--ml-button-padding-horizontal
--ml-button-padding-vertical
--ml-container-padding-horizontal

/* wrong */
--ml-button-padding-x
--ml-button-padding-y
```

Use explicit sides (`-top`, `-right`, `-bottom`, `-left`) only when all four sides genuinely differ.

### Palette token names

Named by hue and shade step only — no semantic meaning in the name.

```css
--ml-gray-100
--ml-gray-500
--ml-pink
--ml-blue-dark
```

Palette tokens are the raw material. They appear in `semantic.css` and `dark.css` as values — never in component CSS modules.

### Scale token names

Named by dimension category and step.

```css
--ml-space-sm
--ml-radius-md
--ml-font-size-lg
--ml-duration-fast
```

### Semantic token names

Named by their role in the UI — not the color they happen to be.

```css
/* correct — describes role */
--ml-background-color
--ml-text-color
--ml-border-color
--ml-link-color

/* wrong — describes appearance, not role */
--ml-cream
--ml-dark-gray-text
```

### Component token names

Namespaced with the component name, then the element or part, then the value type.

```
--ml-{component}-{part?}-{value-type}
```

```css
--ml-button-background-color
--ml-button-border-color
--ml-button-padding-horizontal
--ml-code-block-background-color
--ml-code-block-border-color
--ml-nav-menu-item-color
```

---

## Color roles

Semantic color tokens describe the **role** of a color in the UI — not its value. Light mode values are defined in `semantic.css`. Dark mode overrides live in `dark.css`.

### Surfaces

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ml-background-color` | cream-100 | gray-400 | Page background |
| `--ml-background-color-alt` | cream-200 | gray-500 | Header, footer, inset areas |
| `--ml-surface-background-color` | white | gray-500 | Cards, popovers, elevated surfaces |

There are no further surface levels. When multiple surfaces need visual separation, use `--ml-border-color` or a shadow — not another background level.

### Text

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ml-text-color` | gray-500 | cream-200 | Primary body text |
| `--ml-text-secondary-color` | gray-300 | gray-200 | Supporting text, captions |
| `--ml-text-muted-color` | gray-100 | gray-200 | Placeholder text, disabled labels |
| `--ml-heading-color` | gray-500 | cream-100 | Headings (h1–h6) |
| `--ml-heading-secondary-color` | gray-300 | cream-200 | Sub-headings, section labels |
| `--ml-body-text-color` | gray-300 | cream-100 | Prose paragraphs |

### Border

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ml-border-color` | gray-100 | gray-300 | Dividers, panel borders, input outlines |

### Links

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ml-link-color` | blue | pink-light | Hyperlink text |
| `--ml-link-hover-color` | mauve | blue | Hyperlink hover state |

Links use blue in light mode and pink-light in dark mode. Blue reads clearly as a link on cream backgrounds; pink reads clearly on dark backgrounds without competing with the primary action color.

### Primary (interactive / brand)

Pink is the brand's primary action color.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ml-interactive-background-color` | pink | pink | Button default, form submit |
| `--ml-interactive-background-color-hover` | mauve | pink-light | Button hover state |
| `--ml-interactive-text-color` | white | white | Text on primary backgrounds |

### Status

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ml-success-background-color` | success-tint | success-dark | Alert/badge success background |
| `--ml-success-text-color` | success-dark | success-light | Alert/badge success text |
| `--ml-success-border-color` | success | success | Alert success border |
| `--ml-error-background-color` | error-tint | error-dark | Alert/badge error background |
| `--ml-error-text-color` | error-dark | error-light | Alert/badge error text |
| `--ml-error-border-color` | error | error | Alert error border |

Status palette tokens (`--ml-success-tint`, `--ml-success-dark`, `--ml-success-light`, `--ml-error-tint`, etc.) are defined in `palette.css` alongside the existing `--ml-success` and `--ml-error` values.

### Accent

Badge and annotation use accent colors — decorative highlights, not interactive states.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ml-accent-primary-background-color` | pink | pink | Badge primary variant, annotation trigger |
| `--ml-accent-secondary-background-color` | blue | blue | Badge secondary variant |
| `--ml-accent-text-color` | white | white | Text on accent backgrounds |

### Gradient

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ml-gradient-start-color` | pink | indigo | Hero/display gradient start |
| `--ml-gradient-mid-color` | purple | purple | Hero/display gradient midpoint |
| `--ml-gradient-end-color` | indigo | pink | Hero/display gradient end |

The gradient reverses direction between light and dark: light runs pink → purple → indigo; dark runs indigo → purple → pink.

### Overlay

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ml-overlay-background-color` | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) | Modal/drawer backdrop |

`--ml-overlay-background-color` does not change between themes. Its raw value is defined in `palette.css` as a named constant (`--ml-black-alpha-50`).

---

## Light and dark themes

### Light is the default

The light theme is not a separate file. It is the default state, defined by the values in `semantic.css` and in component CSS modules. There is no `light.css`.

### `dark.css` contains overrides only

`dark.css` overrides **semantic color tokens only**. It never touches component tokens, scale tokens (spacing, radius, typography, effects), or palette tokens.

```css
/* dark.css */
[data-color-scheme='dark'] {
  --ml-background-color: var(--ml-gray-400);
  --ml-surface-background-color: var(--ml-gray-500);
  --ml-text-color: var(--ml-cream-200);
  --ml-border-color: var(--ml-gray-300);
  --ml-link-color: var(--ml-pink-light);
  --ml-link-hover-color: var(--ml-blue);
  --ml-interactive-background-color-hover: var(--ml-pink-light);
}
```

Components pick up dark mode automatically because their local color tokens map to semantic tokens, which the theme overrides. No component CSS needs a dark mode selector.

If a token doesn't appear in `dark.css`, it uses the light default. Only tokens whose value genuinely differs in dark mode should appear there.

---

## Where component color tokens live

Component color token **names** are declared in the component's own CSS module. Their **default values** map to semantic color tokens — also in the component's `:root` block. Theme files never touch component tokens.

The full chain is:

```
Theme files → Semantic color tokens → Component local color tokens → CSS properties
```

Each layer has one job and does not skip levels:

```css
/* tokens/semantic.css — semantic color roles, light default */
:root {
  --ml-surface-background-color: var(--ml-white);
  --ml-border-color: var(--ml-gray-100);
}

/* themes/dark.css — overrides semantic colors only */
[data-color-scheme='dark'] {
  --ml-surface-background-color: var(--ml-gray-500);
  --ml-border-color: var(--ml-gray-300);
}

/* CodeBlock.module.css — maps semantic tokens to component local tokens */
:root {
  --ml-code-block-background-color: var(--ml-surface-background-color);
  --ml-code-block-border-color: var(--ml-border-color);
}

/* CSS properties reference local tokens only */
.root {
  background-color: var(--ml-code-block-background-color);
  border-color: var(--ml-code-block-border-color);
}
```

Dark mode is automatic. When `dark.css` overrides `--ml-surface-background-color`, every component that maps from it picks up the new value — no dark mode selectors needed in component CSS.

---

## What belongs in `semantic.css`

`semantic.css` should only contain globally shared, component-agnostic color roles:

- Surface and background colors
- Text and heading colors
- Border color
- Link colors
- Primary / interactive action colors
- Status colors (success, error)
- Accent colors
- Gradient colors
- Overlay color

It should **not** contain component-specific tokens. Tokens like `--ml-header-background-color`, `--ml-footer-background-color`, `--ml-menu-hover-background-color`, `--ml-code-border-color` belong in their respective component CSS modules — they are component concerns, not global ones.

---

## No hardcoded values

Token values reference palette or scale tokens — never raw color literals, `px`, or `rem` values directly.

```css
/* wrong */
--ml-success-background-color: #e6f9e6;
--ml-shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.12);

/* correct */
--ml-success-background-color: var(--ml-success-tint);  /* palette token */
--ml-shadow-sm: 0 4px 20px var(--ml-shadow-color);       /* palette alpha token */
```

Exception: palette tokens themselves hold raw values — that is their entire purpose.

---

## Checklist

When adding or updating tokens:

- [ ] Token name is kebab-case
- [ ] Name ends with a suffix matching the CSS property name (`-color`, `-background-color`, `-radius`, etc.) — no shorthands
- [ ] Directional tokens use `horizontal`/`vertical`, not `x`/`y`
- [ ] Palette tokens are raw values only — no semantic meaning in the name
- [ ] Semantic tokens describe role, not appearance
- [ ] Component tokens namespaced as `--ml-{component}-*`
- [ ] Token values reference palette or scale tokens — no hardcoded literals (except in palette)
- [ ] Scale tokens (spacing, radius, typography, effects) are not overridden in `dark.css`
- [ ] Component-specific color tokens are not in `semantic.css`
