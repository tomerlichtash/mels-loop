import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

const STORY_ID = 'primitives-loader--default';

const variants = ['spinner', 'dots', 'pulse'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const colors = ['primary', 'secondary', 'surface'] as const;

for (const theme of THEMES) {
	test.describe(theme, () => {
		for (const variant of variants) {
			test.describe(variant, () => {
				test.describe('size', () => {
					for (const size of sizes) {
						test(`${size}`, async ({ page }) => {
							await loadStory(page, STORY_ID, theme, {
								args: { variant, size },
							});
							await expect(page).toHaveScreenshot();
						});
					}
				});

				test.describe('color', () => {
					for (const color of colors) {
						test(`${color}`, async ({ page }) => {
							await loadStory(page, STORY_ID, theme, {
								args: { variant, color },
							});
							await expect(page).toHaveScreenshot();
						});
					}
				});
			});
		}
	});
}
