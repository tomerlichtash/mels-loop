import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { BlockquoteDriver } from './Blockquote.driver';

const STORY_ID = 'content-blockquote--default';

testComponent({
	name: 'Blockquote',
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const blockquote = new BlockquoteDriver(page);
			await expect(blockquote.locator).toHaveScreenshot();
		});
	},
});
