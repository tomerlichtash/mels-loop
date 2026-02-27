import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { GridDriver } from './Grid.driver';

const STORY_ID = 'primitives-grid--default';

const columns = [1, 2, 3, 4, 5, 6] as const;
const gaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const layouts = ['grid', 'masonry'] as const;

for (const theme of THEMES) {
	test.describe(theme, () => {
		test.describe('columns', () => {
			for (const col of columns) {
				test(`${col}`, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, {
						args: { columns: col },
					});
					const grid = new GridDriver(page);
					await expect(grid.locator).toHaveScreenshot();
				});
			}
		});

		test.describe('gap', () => {
			for (const gap of gaps) {
				test(`${gap}`, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, {
						args: { gap },
					});
					const grid = new GridDriver(page);
					await expect(grid.locator).toHaveScreenshot();
				});
			}
		});

		test.describe('layout', () => {
			for (const layout of layouts) {
				test(`${layout}`, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, {
						args: { layout },
					});
					const grid = new GridDriver(page);
					await expect(grid.locator).toHaveScreenshot();
				});
			}
		});
	});
}
