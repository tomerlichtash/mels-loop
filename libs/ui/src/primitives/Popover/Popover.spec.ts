import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { PopoverDriver } from './Popover.driver';

const STORY_ID = 'overlay-popover--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('opens on trigger click', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const popover = new PopoverDriver(page);

			await expect(popover.content).not.toBeVisible();

			await popover.trigger.click();
			await expect(popover.content).toBeVisible();
		});
	});
}
