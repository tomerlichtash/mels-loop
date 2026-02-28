import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { CodeBlockDriver } from './CodeBlock.driver';

const STORY_ID = 'content-codeblock--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const codeBlock = new CodeBlockDriver(page);
			await expect(codeBlock.locator).toHaveScreenshot();
		});
	});
}
