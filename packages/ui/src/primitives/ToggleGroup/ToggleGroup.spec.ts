import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ToggleGroupDriver } from './ToggleGroup.driver';

const STORY_ID = 'action-togglegroup--default';

testComponent({
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('initial selection', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const group = new ToggleGroupDriver(page);
			await expect(group.locator).toHaveScreenshot();
		});

		test('switch selection', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const group = new ToggleGroupDriver(page);
			await group.item('Option B').click();
			await expect(group.locator).toHaveScreenshot();
		});
	},
});
