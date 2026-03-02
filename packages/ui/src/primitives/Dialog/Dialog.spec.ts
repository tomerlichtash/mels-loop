import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { DialogDriver } from './Dialog.driver';

const STORY_ID = 'overlay-dialog--default';

testComponent({
	name: 'Dialog',
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('opened', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const dialog = new DialogDriver(page);
			await dialog.trigger.click();
			await expect(dialog.content).toBeVisible();
			await expect(page).toHaveScreenshot();
		});

		test('opens and closes', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const dialog = new DialogDriver(page);

			await expect(dialog.content).not.toBeVisible();

			await dialog.trigger.click();
			await expect(dialog.content).toBeVisible();

			await dialog.closeButton.click();
			await expect(dialog.content).not.toBeVisible();
		});
	},
});
