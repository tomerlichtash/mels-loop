# Theme Architecture

## Color System

The color system is organized in three layers. Each layer has a clear role and strict dependency direction: components reference **semantic** tokens, semantic references **intent**, intent references **palette**. No layer skips.

```
┌─────────────────────────────────────────────────┐
│  Layer 3 — Semantic    (semantic.css, dark.css)  │  ← components consume this
│  Component-specific tokens with clear purpose    │
├─────────────────────────────────────────────────┤
│  Layer 2 — Intent      (intent.css)              │  ← shared across components
│  Brand + status + surface intents with variants  │
├─────────────────────────────────────────────────┤
│  Layer 1 — Palette     (palette.css)             │  ← never consumed directly
│  Raw oklch color values                          │
└─────────────────────────────────────────────────┘
```

### Layer 1 — Palette (`tokens/palette.css`)

Raw color values in oklch. These are the building blocks — **never referenced by components**.

**Why oklch?** Perceptually uniform color space. Equal steps in lightness look equally different to the human eye. This makes deriving color variants (lighter, darker, muted) predictable and consistent. `oklch(L C H)` — Lightness [0–1], Chroma [0–0.4], Hue [0–360].

The palette contains:

- **Neutrals** — 9-step warm scale from white to near-black. Low chroma with a warm hue gives the cream/parchment feel.
- **Brand** — The brand gradient: blue (H≈258) → indigo → purple → mauve → pink (H≈8).
- **Status** — Success (green), error (red), warning (amber), info (blue). Each has a tonal range (main, tint, dark, subtle, light) used as raw inputs for the intent layer.
- **Alpha** — Transparency values.

### Layer 2 — Intent (`tokens/intent.css`)

Theme-level color intents. Any component can reference these — they are not tied to a specific component or use case.

**7 intents:**

| Intent | Purpose | Base hue |
|---|---|---|
| `primary` | Brand primary | blue (H≈258) in light, pink (H≈8) in dark |
| `secondary` | Brand secondary | pink (H≈8) in light, blue (H≈258) in dark |
| `success` | Positive / confirmation | green, H≈143 |
| `error` | Destructive / error | red, H≈27 |
| `warning` | Caution / attention | amber, H≈76 |
| `info` | Informational | blue, H≈263 |
| `surface` | Neutral backgrounds and containers | warm neutral |

**7 variants per intent:**

Each variant describes the **color relationship**, not the use case. Components decide how to apply them.

```
subtle  →  muted  →  (main)  →  alt  →  deep     + contrast  + highlight
──────────────────────────────────────────────
lightest                           strongest       foreground   attention
```

| Variant | oklch shift | Description |
|---|---|---|
| `subtle` | high L, very low C | Background tints, soft fills |
| `muted` | similar L, low C | Faded, de-emphasized |
| *(main)* | — | The standard color |
| `alt` | shifted L, similar C | General alternative shade |
| `deep` | low L, high C | Intense, saturated |
| `contrast` | max L, zero C | Readable foreground on the color |
| `highlight` | high L, high C | High-visibility, draws attention |

**Naming convention:** `--ml-color-{intent}` for the main color, `--ml-color-{intent}-{variant}` for variants.

```css
--ml-color-primary            /* the pink */
--ml-color-primary-subtle     /* light pink tint */
--ml-color-primary-deep       /* intense dark pink */
--ml-color-error-contrast     /* white text on error red */
--ml-color-surface-alt        /* alternative neutral background */
```

### Layer 3 — Semantic (`tokens/semantic.css`)

Component-consumable tokens. **These are the only tokens components should reference.**

Semantic tokens draw from the intent layer wherever possible. A few exceptions reference palette neutrals directly — these are documented inline and fall into two categories:

1. **Neutral shades with no clean intent mapping** (gray-200, gray-300) — used for icons, placeholders, subtle text. Text emphasis is about foreground readability, not surface/intent semantics.
2. **Brand-specific decorative colors** (mauve, purple, indigo) — used for gradients, annotations, and popovers. These are specific hues, not intent-level concepts.

### Dark Theme (`themes/dark.css`)

Dark theme overrides intent and semantic values. The override strategy:

1. **Intent overrides come first.** Semantic tokens that reference intents automatically pick up dark values without needing their own override.
2. **Semantic overrides are minimal.** Only tokens whose dark values differ from what the intent cascade provides are explicitly overridden.

Variant meanings stay the same across themes — only the oklch L/C values adjust for dark backgrounds. For example, `subtle` is a light tint in light theme and a dark tint in dark theme, but it always means "the softest variant."

## Token Files

All token files live in `libs/ui/src/styles/tokens/`:

```
tokens/
  color/                 ← 3-layer color system
    palette.css            Layer 1 — raw oklch color values
    intent.css             Layer 2 — brand, status, and surface intents
    semantic.css           Layer 3 — component-consumable tokens
  base/                  ← global design scales
    typography.css         Font families, sizes, weights, line heights, letter spacing
    spacing.css            Spacing scale (xs–3xl)
    radius.css             Border radius scale
    shadow.css             Box shadow scale
    effects.css            Overlay, durations, easing
  layout.css             Layout dimensions (content/page max-widths)
  media.css              Breakpoint media queries
  index.css              Import order for all token files
```

Theme overrides live in `libs/ui/src/styles/themes/dark.css`.

Global base styles live in `libs/ui/src/styles/globals.css`.

## Design Decisions

### Why 3 layers instead of 2?

A 2-layer system (palette → semantic) forces component tokens to reference raw colors. This means changing the brand color requires updating every component token that uses it. The intent layer solves this — changing `--ml-color-primary` in one place updates every component that references it.

### Why not use CSS variables inside oklch()?

While `oklch(L C var(--hue))` is valid CSS, we chose explicit values for each variant. Brand hue changes are rare, and explicit values are easier to debug in dev tools. A find-and-replace on the hue value across 6 lines in one file is trivial.

### Why intent variants describe relationships, not functions?

Naming variants by function (`hover`, `active`, `disabled`) ties them to specific UI states. Naming by relationship (`alt`, `subtle`, `deep`) lets components use them for any purpose. A button uses `alt` for hover; a card might use `alt` for a border. The intent layer doesn't know or care.

### Why do text emphasis tokens reference palette directly?

Text emphasis (default → subtle → muted) is about foreground readability against the surface. It uses specific neutral grays from the palette. These don't map cleanly to surface intent variants because:
- Surface variants describe background/container relationships
- Text emphasis describes foreground readability
- They use different parts of the neutral scale by design

### Why oklch over hex/rgb?

- **Perceptually uniform** — deriving variants (lighter, darker, muted) produces visually consistent results
- **Intuitive** — variants share the same hue, differing only in lightness and chroma
- **Maintainable** — the relationships between variants are visible in the code
- **Modern** — supported in all modern browsers (Chrome 111+, Firefox 113+, Safari 15.4+)
