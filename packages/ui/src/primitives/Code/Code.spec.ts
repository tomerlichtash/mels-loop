import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { CodeDriver } from './Code.driver';

const STORY_ID = 'content-code--default';

testComponent({
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const code = new CodeDriver(page);
			await expect(code.locator).toHaveScreenshot();
		});
	},
});
