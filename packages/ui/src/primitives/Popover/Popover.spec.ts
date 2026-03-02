import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { PopoverDriver } from './Popover.driver';

const STORY_ID = 'overlay-popover--default';

testComponent({
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('opened', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const popover = new PopoverDriver(page);
			await popover.trigger.click();
			await expect(popover.content).toBeVisible();
			await expect(page).toHaveScreenshot();
		});

		test('opens on trigger click', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const popover = new PopoverDriver(page);
			await expect(popover.content).not.toBeVisible();
			await popover.trigger.click();
			await expect(popover.content).toBeVisible();
		});
	},
});
