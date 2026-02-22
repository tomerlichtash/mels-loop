# Primitive Components Refactor Plan

Bring all primitive components into conformance with `COMPONENT-GUIDE.md` and `TOKEN-GUIDE.md`.

---

## What changes and why

Every primitive currently violates at least one of the following:

| Issue | Applies to |
|---|---|
| Base class is not `.root` | Alert, Badge, Button, Card, Group, Stack, Text, Title |
| No component-local tokens | Alert, Badge, Button, Card, Group, Stack, Text, Title |
| Styles reference global/semantic tokens directly | All except Container |
| Variant class names don't match prop name | Alert (`.green`/`.red`), Button (`.default`/`.subtle`/`.outline`) |
| Hardcoded values (px, em, raw colors) | Badge, Button |
| Palette tokens used directly in component | Badge (`--ml-pink`, `--ml-blue`, `--ml-white`) |

Container is the reference implementation — it is already conformant and is not in scope for this refactor.

---

## Prerequisites — semantic token layer

Component color tokens map from semantic tokens. Before refactoring components, the semantic token layer must be stable and complete. This is a prerequisite step, not part of any individual component refactor.

### Step 1a — Rename existing semantic tokens

Current `semantic.css` tokens use inconsistent naming. They must be renamed to conform to TOKEN-GUIDE before components map from them. Key renames:

| Current name | Renamed to |
|---|---|
| `--ml-bg` | `--ml-background-color` |
| `--ml-bg-alt` | `--ml-background-color-alt` |
| `--ml-bg-surface` | `--ml-surface-background-color` |
| `--ml-text` | `--ml-text-color` |
| `--ml-text-secondary` | `--ml-text-secondary-color` |
| `--ml-text-muted` | `--ml-text-muted-color` |
| `--ml-heading` | `--ml-heading-color` |
| `--ml-heading-secondary` | `--ml-heading-secondary-color` |
| `--ml-body-text` | `--ml-body-text-color` |
| `--ml-border` | `--ml-border-color` |
| `--ml-link` | `--ml-link-color` |
| `--ml-link-hover` | `--ml-link-hover-color` |

All renames must be applied in `semantic.css`, `dark.css`, and any component CSS that currently references the old names.

### Step 1b — Add missing semantic tokens

The following semantic tokens are needed by components but do not yet exist. They must be defined in `semantic.css` (light default) and `dark.css` (dark override where applicable):

- **Success state** — `--ml-success-background-color`, `--ml-success-text-color`, `--ml-success-border-color`
  - Currently: `--ml-alert-success-bg` etc. exist in `semantic.css` as component-specific hardcoded hex values
  - Before defining semantic tokens: add palette tokens to `palette.css` — `--ml-success-tint`, `--ml-success-dark`, `--ml-success-light` (light) and corresponding dark values; semantic tokens then reference these
- **Error state** — `--ml-error-background-color`, `--ml-error-text-color`, `--ml-error-border-color`
  - Currently: `--ml-error: #c00` lives in palette; `--ml-alert-error-*` are in `semantic.css` as hardcoded hex values
  - Before defining semantic tokens: add palette tokens — `--ml-error-tint`, `--ml-error-dark`, `--ml-error-light`; semantic tokens then reference these
- **Interactive (button/link) colors** — `--ml-interactive-background-color`, `--ml-interactive-background-color-hover`, `--ml-interactive-text-color`
  - Currently: Button maps from `--ml-submit-bg`, `--ml-submit-bg-hover`, `--ml-submit-text` — form-specific tokens that happen to be reused; these need a semantic generalization
- **Accent colors for Badge** — Badge reads palette directly (`--ml-pink`, `--ml-blue`). Define semantic roles for these (e.g. `--ml-accent-primary-background-color`, `--ml-accent-secondary-background-color`) rather than exposing palette tokens to components

### Step 1c — Remove component tokens from `semantic.css`

After components are refactored to own their own color tokens, remove all component-specific entries from `semantic.css`:
- Header, footer, menu, form, popover, annotation, code, alert tokens all currently live in `semantic.css` — they must move to their respective component CSS modules

---

---

## Per-component changes

### Alert

**TSX changes:**
- Base class: `.alert` → `.root`
- Variant prop `color`: build class as `styles[\`color-${color}\``]`

**CSS changes:**
- Rename `.alert` → `.root`
- Add `:root` block with local tokens:
  ```css
  :root {
    --ml-alert-padding: var(--ml-space-md);
    --ml-alert-radius: var(--ml-radius-md);
    --ml-alert-title-font-weight: var(--ml-font-weight-bold);
    --ml-alert-body-font-size: var(--ml-font-size-body);
    /* color tokens — mapped from semantic */
    --ml-alert-background-color: var(--ml-success-background-color);
    --ml-alert-border-color: var(--ml-success-border-color);
    --ml-alert-text-color: var(--ml-success-text-color);
  }
  ```
- `.root` references only local tokens
- Rename `.green` → `.color-green`, `.red` → `.color-red`; variant classes override local color tokens
- Inner elements `.title` and `.body` stay as-is (already flat, correct)

---

### Badge

**TSX changes:**
- Base class: `.badge` → `.root`
- Variant prop `color`: build class as `styles[\`color-${color}\``]`

**CSS changes:**
- Rename `.badge` → `.root`
- Add `:root` block with local tokens:
  ```css
  :root {
    --ml-badge-font-size: var(--ml-font-size-xs);
    --ml-badge-font-weight: var(--ml-font-weight-bold);
    --ml-badge-letter-spacing: var(--ml-letter-spacing-tight);
    --ml-badge-line-height: var(--ml-line-height-snug);
    --ml-badge-radius: var(--ml-radius-pill);
    --ml-badge-padding-horizontal: var(--ml-space-sm);
    --ml-badge-padding-vertical: var(--ml-space-xs);
    /* color — mapped from semantic */
    --ml-badge-background-color: var(--ml-accent-primary-background-color);
    --ml-badge-text-color: var(--ml-accent-text-color);
  }
  ```
- Remove hardcoded `0.2em 0.6em` padding; use local tokens
- Rename `.pink` → `.color-pink`, `.blue` → `.color-blue`; variant classes override local color tokens
- Remove direct palette token references (`--ml-pink`, `--ml-blue`, `--ml-white`)

---

### Button

**TSX changes:**
- Base class: `.button` → `.root`
- Variant prop: build class as `styles[\`variant-${variant}\``]`
- Size prop: already `styles[\`size-${size}\``]` — no change needed
- Boolean props `loading`, `disabled`: already handled; ensure class names match

**CSS changes:**
- Rename `.button` → `.root`
- Update `.button:disabled` → `.root:disabled`
- Add `:root` block with local tokens for each configurable value — size defaults at `md`:
  ```css
  :root {
    --ml-button-font-size: var(--ml-font-size-md);
    --ml-button-font-weight: var(--ml-font-weight-medium);
    --ml-button-line-height: var(--ml-line-height-none);
    --ml-button-radius: var(--ml-radius-md);
    --ml-button-padding-horizontal: var(--ml-space-md);
    --ml-button-padding-vertical: var(--ml-space-sm);
    --ml-button-gap: var(--ml-space-xs);
    --ml-button-duration: var(--ml-duration-fast);
    --ml-button-height: 40px; /* md default — no space token maps cleanly to fixed heights */
    /* color — mapped from semantic */
    --ml-button-background-color: var(--ml-interactive-background-color);
    --ml-button-background-color-hover: var(--ml-interactive-background-color-hover);
    --ml-button-text-color: var(--ml-interactive-text-color);
    --ml-button-border-color: transparent;
  }
  ```
- Size variant classes override local tokens (not CSS properties):
  ```css
  .size-sm {
    --ml-button-font-size: var(--ml-font-size-body);
    --ml-button-padding-horizontal: var(--ml-space-sm);
    --ml-button-height: 34px;
  }
  ```
- Remove hardcoded `em` padding and `px` heights from size classes
- Rename `.default` → `.variant-default`, `.subtle` → `.variant-subtle`, `.outline` → `.variant-outline`
- Variant classes override local color tokens
- Remove references to `--ml-submit-bg`, `--ml-bg-alt`, `--ml-link`, `--ml-border` from variant rules

---

### Card

**TSX changes:**
- Base class: `.card` → `.root`
- Padding prop: already `styles[\`padding-${padding}\``]` — no change needed
- Boolean prop `withBorder`: already `styles.withBorder` — no change needed

**CSS changes:**
- Rename `.card` → `.root`
- Add `:root` block with local tokens:
  ```css
  :root {
    --ml-card-radius: var(--ml-radius-md);
    --ml-card-padding: var(--ml-space-md);
    /* color */
    --ml-card-background-color: var(--ml-surface-background-color);
    --ml-card-border-color: var(--ml-border-color);
  }
  ```
- `.root` references only local tokens
- Padding variant classes override `--ml-card-padding`
- `.withBorder` overrides `--ml-card-border-color` (already does this correctly in spirit)

---

### Group

**TSX changes:**
- Base class: `.group` → `.root`
- All other prop-to-class mappings are already in the correct format — no changes needed

**CSS changes:**
- Rename `.group` → `.root`
- Add `:root` block with local tokens:
  ```css
  :root {
    --ml-group-gap: var(--ml-space-md);
  }
  ```
- `.root` references `--ml-group-gap` for gap
- Gap variant classes override `--ml-group-gap` instead of setting `gap` directly
- No color tokens needed

---

### Stack

**TSX changes:**
- Base class: `.stack` → `.root`
- All other prop-to-class mappings already correct — no changes needed

**CSS changes:**
- Rename `.stack` → `.root`
- Add `:root` block with local tokens:
  ```css
  :root {
    --ml-stack-gap: var(--ml-space-md);
  }
  ```
- Gap variant classes override `--ml-stack-gap`
- No color tokens needed

---

### Text

**TSX changes:**
- Base class: `.text` → `.root`
- Size prop: already `styles[\`size-${size}\``]` — no change needed
- Weight prop: already `styles[\`weight-${weight}\``]` — no change needed
- Boolean props `italic`, `uppercase`, `capitalize`: already direct class names — no change needed
- Color prop: `.dimmed` and `.error` are already flat names — no change needed

**CSS changes:**
- Rename `.text` → `.root`
- Add `:root` block with local tokens — size defaults at `md`:
  ```css
  :root {
    --ml-text-font-size: var(--ml-font-size-md);
    --ml-text-line-height: var(--ml-line-height-relaxed);
    /* color */
    --ml-text-text-color: var(--ml-text-color);
  }
  ```
- Size variant classes override `--ml-text-font-size`
- `.dimmed` and `.error` override `--ml-text-text-color`
- Remove direct references to `--ml-text`, `--ml-text-muted`, `--ml-error`

---

### Title

**TSX changes:**
- Base class: `.title` → `.root`
- Order prop: already `styles[\`order-${order}\``]` — no change needed

**CSS changes:**
- Rename `.title` → `.root`
- Add `:root` block with local tokens — defaults at order 1:
  ```css
  :root {
    --ml-title-font-size: var(--ml-font-size-3xl);
    --ml-title-font-weight: var(--ml-font-weight-medium);
    --ml-title-line-height: var(--ml-line-height-tight);
    /* color */
    --ml-title-color: var(--ml-heading-color);
  }
  ```
- Order variant classes override `--ml-title-font-size`
- Remove direct references to `--ml-heading`, `--ml-font-weight-medium`, `--ml-line-height-tight`

---

## Order of execution

1. **Step 1a — Rename existing semantic tokens** in `semantic.css` and `dark.css` per the table above. Update any component CSS that references old names.
2. **Step 1b — Add missing semantic tokens** to `semantic.css` and `dark.css`.
3. **Step 1c — Remove component tokens from `semantic.css`** as each component is refactored to own them.
4. **Refactor components** — each component is independent once semantic tokens are in place. Suggested order: Stack → Group (layout-only, simplest) → Text → Title → Card → Badge → Alert → Button (most complex).
5. **Update stories** — update each story's `Default` args to match any renamed props.
6. **Verify build** — run `pnpm build-storybook` and the app builds after each component.
