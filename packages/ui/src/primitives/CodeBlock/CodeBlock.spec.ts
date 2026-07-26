import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { CodeBlockDriver } from './CodeBlock.driver';

const STORY_ID = 'content-codeblock--default';

testComponent({
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const codeBlock = new CodeBlockDriver(page);
			await expect(codeBlock.locator).toHaveScreenshot();
		});
	},
});
