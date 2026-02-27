import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ListDriver } from './List.driver';

const STORY_ID = 'primitives-list--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('unordered', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: { ordered: false },
			});
			const list = new ListDriver(page);
			await expect(list.locator).toHaveScreenshot();
		});

		test('ordered', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: { ordered: true },
			});
			const list = new ListDriver(page);
			await expect(list.locator).toHaveScreenshot();
		});
	});
}
