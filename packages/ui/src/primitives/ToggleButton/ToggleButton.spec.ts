import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ToggleButtonDriver } from './ToggleButton.driver';

const STORY_ID = 'action-togglebutton--default';

testComponent({
	name: 'ToggleButton',
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('unpressed', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const toggle = new ToggleButtonDriver(page);
			await expect(toggle.locator).toHaveScreenshot();
		});

		test('pressed', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const toggle = new ToggleButtonDriver(page);
			await toggle.click();
			await expect(toggle.locator).toHaveScreenshot();
		});
	},
});
