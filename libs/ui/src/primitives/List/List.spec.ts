import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

const STORY_ID = 'primitives-list--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('unordered', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: { ordered: false },
			});
			await expect(page).toHaveScreenshot();
		});

		test('ordered', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: { ordered: true },
			});
			await expect(page).toHaveScreenshot();
		});
	});
}
