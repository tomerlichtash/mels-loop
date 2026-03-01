import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { BlockquoteDriver } from './Blockquote.driver';

const STORY_ID = 'content-blockquote--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const blockquote = new BlockquoteDriver(page);
			await expect(blockquote.locator).toHaveScreenshot();
		});
	});
}
