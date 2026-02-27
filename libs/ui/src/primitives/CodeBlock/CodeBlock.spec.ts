import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

const STORY_ID = 'primitives-codeblock--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			await expect(page).toHaveScreenshot();
		});
	});
}
