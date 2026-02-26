# Component Authoring Guide

Conventions for all components in `packages/ui` — primitives, shell, and content.

> **Note:** Existing components predate these conventions and do not yet conform. All components will be migrated to match this guide.

---

## Where components live

All UI components belong in `packages/ui`. A component living inside an app package (`apps/web`, `apps/blog`) is a problem — it is untestable in isolation, has no story, and cannot be shared.

**App packages own:**
- Routes and page files (`app/[locale]/page.tsx`)
- Data fetching (calls to content loaders, `getDictionary`, database queries)
- Wiring: passing fetched data as props to UI components

**`packages/ui` owns:**
- Every component that renders UI

The focus of each app follows from this split:

| App | Domain |
|---|---|
| `apps/web` | Renders markdown stories, articles, and resources |
| `apps/blog` | Renders markdown posts |

Neither app should be a place where UI components are authored.

### What makes a component ready for `packages/ui`

A component is ready to move (or be written directly in) `packages/ui` when:

1. It accepts all data as props — no internal data fetching, no `getDictionary` calls, no async functions
2. It is generic enough to be used in more than one context without modification
3. It can be rendered in Storybook with only prop variations (no route context, no server context)

If a component currently fetches its own data or calls i18n internals, the fix is to push that logic up to the page and pass resolved values as props.

### What components must not do

- Call `getDictionary`, `getAllStories`, content loaders, or any data-fetching function
- Import from app-level modules (`@/components`, `@/lib`, etc.)
- Contain routing logic beyond accepting an `href` prop
- Encode business rules or domain knowledge

---

## File structure

Each component lives in its own directory containing the implementation, styles, and a story:

```
primitives/
  Button/
    Button.tsx
    Button.module.css
    Button.stories.tsx

shell/
  Header/
    Header.tsx
    Header.module.css
    Header.stories.tsx

content/
  ContentRenderer/
    ContentRenderer.tsx
    ContentRenderer.module.css
    ContentRenderer.stories.tsx
```

Shell and content components have heavier dependencies (Next.js image, HAST trees, context providers) that may require mock decorators in their stories, but the expectation is the same: every component in `packages/ui` has a story.

---

## CSS conventions

### The `.root` class

Every component has exactly one class named `.root`, applied to the component's root DOM node. There are no other "base" class names (no `.button`, `.card`, `.header`, etc.).

```css
/* Button.module.css */
.root {
  display: inline-flex;
  align-items: center;
}
```

```tsx
// Button.tsx
<button className={styles.root} />
```

This applies uniformly across primitives, shell components, and content components.

### Inner element classes

Elements inside the component's root use simple, flat class names — no prefix or nesting required. CSS Modules provides the scoping.

```css
/* Alert.module.css */
.root { ... }
.title { font-weight: var(--ml-alert-title-font-weight); }
.body  { font-size: var(--ml-alert-body-font-size); }
```

Prefix with `.root` only when the selector genuinely needs to be scoped to a specific root state — for example, when a variant class changes the appearance of a child element.

### Variants via prop-mapped class names

There are two kinds of props, each with its own class-naming pattern.

**Value props** — the prop accepts one of several named values. The class name encodes both the prop and the value:

```css
.variant-outline {
  --ml-button-bg: transparent;
  --ml-button-color: var(--ml-color-text);
}

.size-sm {
  --ml-button-padding-horizontal: var(--ml-space-xs);
  --ml-button-font-size: var(--ml-font-size-sm);
}
```

```tsx
className={cn(
  styles.root,
  variant && styles[`variant-${variant}`],
  size && styles[`size-${size}`],
  className,
)}
```

**Boolean props** — the prop is a flag that is either on or off. The class name matches the prop name directly:

```css
.fullWidth {
  width: 100%;
}

.withBorder {
  --ml-card-border-color: var(--ml-color-border);
}
```

```tsx
className={cn(
  styles.root,
  fullWidth && styles.fullWidth,
  withBorder && styles.withBorder,
  className,
)}
```

The default state lives in `.root {}` and requires no additional class. Classes are only added when the prop is present or true, so omitting a prop naturally falls back to the default.

### Token naming

All CSS custom properties use kebab-case exclusively. Never camelCase, PascalCase, or snake_case. Multi-word component names are also kebab-case:

```css
/* correct */
--ml-nav-menu-bg
--ml-mobile-drawer-padding-horizontal
--ml-theme-switcher-icon-size

/* wrong */
--ml-navMenu-bg
--ml-MobileDrawer-padding-horizontal
--ml-theme_switcher_icon_size
```

### Component-local tokens

Every component defines its own layer of CSS custom properties, namespaced as `--ml-{component-name}-*`. Component styles always reference these local tokens — never global tokens directly.

There are two categories of local tokens with different ownership:

**Structural tokens** (spacing, radius, typography, timing) are mapped to global tokens inside the component's `:root` block. These are theme-agnostic — they don't change between light and dark.

**Color tokens** map from semantic color tokens. The component never references a raw color value or a palette token — it always maps from the shared semantic layer.

```css
/* Button.module.css */
:root {
  /* structural — maps global scale tokens */
  --ml-button-padding-horizontal: var(--ml-space-sm);
  --ml-button-padding-vertical: var(--ml-space-xs);
  --ml-button-radius: var(--ml-radius-md);
  --ml-button-font-size: var(--ml-font-size-sm);
  --ml-button-duration: var(--ml-duration-fast);

  /* color — maps semantic color tokens */
  --ml-button-bg: var(--ml-color-accent);
  --ml-button-color: var(--ml-color-accent-contrast);
}

.root {
  /* static structure */
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  /* all values via local tokens */
  padding: var(--ml-button-padding-vertical) var(--ml-button-padding-horizontal);
  border-radius: var(--ml-button-radius);
  font-size: var(--ml-button-font-size);
  transition: opacity var(--ml-button-duration);
  background: var(--ml-button-bg);
  color: var(--ml-button-color);
}
```

Dark mode is automatic. When `dark.css` overrides `--ml-color-accent`, the button picks it up through the local token mapping — no dark mode selector needed in the component. The four layers never overlap:

| Layer | Owns |
|---|---|
| Theme files | Override semantic color tokens for dark mode |
| Semantic tokens | Global color roles (`--ml-color-accent`, `--ml-color-surface`) |
| Component local tokens | Map semantic/scale tokens to component-specific names |
| CSS properties | Reference local tokens only |

Only values that vary across states or variants need a local token. Truly static one-off values (like `display: flex`) go directly in `.root` without a token.

Variant classes override local tokens, not CSS properties directly:

```css
.size-lg {
  --ml-button-padding-horizontal: var(--ml-space-md);
  --ml-button-padding-vertical: var(--ml-space-sm);
  --ml-button-font-size: var(--ml-font-size-md);
}
```

```css
/* wrong — global token referenced directly */
.root {
  padding: var(--ml-space-xs) var(--ml-space-sm);
}

/* correct — global mapped to local first */
:root {
  --ml-button-padding-horizontal: var(--ml-space-sm);
  --ml-button-padding-vertical: var(--ml-space-xs);
}

.root {
  padding: var(--ml-button-padding-vertical) var(--ml-button-padding-horizontal);
}
```

---

## Component conventions

### Props map to class names

Each configurable dimension of a component is a typed prop. The prop value maps to a CSS module class whose name encodes both the prop and value. No runtime logic beyond the `cn()` call is needed.

```tsx
type Variant = 'default' | 'outline' | 'subtle';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}

export function Button({ children, variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        styles.root,
        variant && styles[`variant-${variant}`],
        size && styles[`size-${size}`],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### `className` passthrough

Every component accepts and forwards `className` via `cn(styles.root, className)` using the `classnames` package. This allows consumers to layer additional styles without the component needing to anticipate every use case.

### Spread `...props`

All remaining HTML attributes are spread onto the root element so that native attributes (`aria-*`, `data-testid`, event handlers, etc.) work without explicit forwarding.

---

## Story conventions

Every component in `packages/ui` has a story file with a `Default` export. The `Default` story renders the component with its default props and relies on the Storybook Controls panel for interactive exploration. No story per variant is needed.

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
```

`tags: ['autodocs']` generates a documentation page from the TypeScript interface. The Controls panel lets users explore all prop combinations interactively.

Named stories are added only when a variant cannot be expressed through a single prop toggle — for example, a layout that requires multiple instances rendered side by side to compare a scale.

---

## Checklist

When adding or updating any component:

**Placement**
- [ ] Component lives in `packages/ui`, not in an app package
- [ ] Component accepts all data as props — no internal data fetching, no `getDictionary`, no async
- [ ] No imports from app-level modules (`@/components`, `@/lib`, etc.)

**Implementation**
- [ ] Root node uses `className={cn(styles.root, className)}`
- [ ] Inner elements use simple flat class names (no prefix unless a state-scoped selector is genuinely needed)
- [ ] All CSS custom properties use kebab-case (`--ml-nav-menu-bg`, not `--ml-navMenu-bg`)
- [ ] Variants expressed as prop-mapped class names, not data attributes
- [ ] Structural local tokens declared in `:root`, mapped to global tokens
- [ ] Color local tokens declared by name only — values provided by theme files
- [ ] Component styles reference only local tokens, never global tokens directly
- [ ] Variant classes override local tokens, not CSS properties
- [ ] `...props` spread onto root element

**Story**
- [ ] Story file exists with `Default` story and `tags: ['autodocs']`
- [ ] Story renders without app-level context (use mock decorators if needed)
