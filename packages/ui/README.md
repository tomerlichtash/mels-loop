# @mels-loop/ui

Shared component library — primitives, design tokens, and color scheme utilities.

## Exports

| Entry point | Description |
|---|---|
| `@mels-loop/ui/primitives` | React components (Button, Card, Dialog, etc.) |
| `@mels-loop/ui/color-scheme` | `useColorScheme` hook and `ColorSchemeScript` |
| `@mels-loop/ui/styles/globals.css` | Global styles (tokens + reset + base) |
| `@mels-loop/ui/styles/tokens` | Design tokens only (no reset/base) |
| `@mels-loop/ui/styles/tokens/media.css` | Custom media queries for PostCSS |

## Components

Alert, Badge, Blockquote, Breadcrumbs, Button, Card, Checkbox, Chip, Code, CodeBlock, Combobox, Container, Dialog, Figure, Grid, List, Loader, PasswordField, Popover, Separator, Switch, Table, Text, TextArea, TextField, ToggleButton, ToggleGroup, Tooltip.

## Design tokens

CSS custom properties organized in layers:

- **Color** — `palette.css` (raw values) > `intent.css` (semantic mapping) > `semantic.css` (component-level)
- **Base** — `typography.css`, `spacing.css`, `radius.css`, `shadow.css`, `effects.css`
- **Layout** — `layout.css`, `media.css` (breakpoints)
- **Themes** — `dark.css` (dark mode overrides via `[data-color-scheme="dark"]`)

All tokens use the `--ml-` prefix.

## Scripts

```sh
pnpm build              # tsc + copy CSS to dist/
pnpm lint               # eslint
pnpm lint:fix           # eslint --fix
pnpm storybook          # dev server on port 6006
pnpm build-storybook    # static Storybook build
pnpm test:e2e           # Playwright visual regression (Docker)
pnpm test:e2e:update    # update visual snapshots
```

## Build

The build preserves the source file structure in `dist/`:

```
dist/
  primitives/
    Button/
      Button.js           # compiled component
      Button.d.ts         # type declarations
      Button.module.css   # colocated CSS module
    ...
  color-scheme/
    ...
  styles/
    globals.css
    tokens/
      ...
```

Each component ships with its own CSS module. The consumer's bundler (Next.js, Vite) handles CSS module resolution — importing `Button` only loads `Button.module.css`, not the entire library's styles.

## Peer dependencies

- `react` ^19.0.0
- `react-dom` ^19.0.0
