import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { FigureDriver } from './Figure.driver';

const STORY_ID = 'primitives-figure--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const figure = new FigureDriver(page);
			await expect(figure.locator).toBeVisible();
			await expect(figure.caption).toHaveText(
				'Fig. 1. A sample figure with caption',
			);
			await expect(figure.image).toBeVisible();
		});
	});
}
