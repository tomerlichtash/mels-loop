import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { CodeDriver } from './Code.driver';

const STORY_ID = 'content-code--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const code = new CodeDriver(page);
			await expect(code.locator).toHaveScreenshot();
		});
	});
}
