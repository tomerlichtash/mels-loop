# UI E2E Testing Guide

## Architecture

Tests run inside a Playwright Docker container (`mcr.microsoft.com/playwright`) for consistent screenshots across local and CI.

```
libs/ui/
  e2e/
    __screenshots__/          # baselines (committed to repo)
    base-driver.ts            # BaseDriver class — generic locator + interactions
    test-utils.ts             # loadStory() — navigates to story iframe, sets theme
    stories.setup.ts          # story discovery from storybook-static/index.json
  src/primitives/Button/
    Button.tsx
    Button.stories.tsx
    Button.driver.ts          # extends BaseDriver with component selector
    Button.spec.ts            # test suite
```

## Conventions

### Every component must have a `Default` story

The `Default` export acts as a sandbox — tests load it and override props via URL args. This decouples tests from pre-baked story variants.

```tsx
// Button.stories.tsx
export const Default: Story = {};
```

### Story ID format

`{category}-{component}--default`, e.g., `primitives-button--default`. Derived from the story's `title` field.

### Driver pattern

Each component has a driver colocated with its source. The driver extends `BaseDriver` and sets the component's root selector.

```ts
// Button.driver.ts
import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class ButtonDriver extends BaseDriver {
    constructor(page: Page) {
        super(page, 'button');
    }
}
```

Add component-specific methods (e.g., `getText()`, `getCount()`) to the driver as needed. Generic methods (`click`, `hover`, `isDisabled`, `screenshot`) are inherited.

### Spec pattern

Tests declare a `cases` object mapping prop names to their values. Theme is the outermost describe, then prop, then value.

```ts
// Button.spec.ts
import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';
import { ButtonDriver } from './Button.driver';

const STORY_ID = 'primitives-button--default';

const cases = {
    size: ['xs', 'sm', 'md', 'lg', 'xl'],
    variant: ['primary', 'subtle', 'outline', 'ghost'],
    loading: [true],
    disabled: [true],
};

test.describe('Button', () => {
    for (const theme of THEMES) {
        test.describe(theme, () => {
            for (const [prop, values] of Object.entries(cases)) {
                test.describe(prop, () => {
                    for (const value of values) {
                        test(`${value}`, async ({ page }) => {
                            await loadStory(page, STORY_ID, theme, {
                                args: { [prop]: value },
                            });
                            const button = new ButtonDriver(page);
                            await expect(button.locator).toHaveScreenshot();
                        });
                    }
                });
            }
        });
    }
});
```

Test names read as: `Button > light > size > lg`

### loadStory

`loadStory(page, storyId, theme, options?)` handles:
- Navigation to `/iframe.html?id={storyId}&viewMode=story&args=...`
- Font loading (`document.fonts.ready`)
- Animation/transition disabling
- Theme injection (`data-color-scheme`)
- Waiting for `#storybook-root` visibility

Returns the `page`. The driver then locates the component within it.

### Path alias

`@e2e/*` maps to `libs/ui/e2e/*`. Configured in both `tsconfig.json` (for IDE) and `playwright.config.ts` (for runtime).

## Commands

```bash
pnpm --filter @mels-loop/ui build-storybook    # build storybook (required before tests)
pnpm --filter @mels-loop/ui test:e2e            # run tests in Docker
pnpm --filter @mels-loop/ui test:e2e:update     # regenerate baselines in Docker
pnpm --filter @mels-loop/ui test:e2e:ui         # Playwright UI mode (native, not Docker)
pnpm --filter @mels-loop/ui test:e2e:debug      # Playwright debug mode (native, not Docker)
```

## Adding a new component test

1. Ensure the component's stories file has a `Default` export
2. Create `Component.driver.ts` extending `BaseDriver` with the component's selector
3. Create `Component.spec.ts` with cases object and the standard loop pattern
4. Build storybook, run `test:e2e:update` to generate baselines

## Screenshot structure

```
e2e/__screenshots__/primitives/Button/
    Button-light-size-lg-1--chromium.png
    Button-light-size-lg-1--firefox.png
    Button-light-size-lg-1--webkit.png
    ...
```

Path derived from `{testFileDir}/{testName}--{projectName}`.