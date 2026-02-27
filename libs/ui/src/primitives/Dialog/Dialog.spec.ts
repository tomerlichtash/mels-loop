import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { DialogDriver } from './Dialog.driver';

const STORY_ID = 'primitives-dialog--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('opens and closes', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const dialog = new DialogDriver(page);

			await expect(dialog.content).not.toBeVisible();

			await dialog.trigger.click();
			await expect(dialog.content).toBeVisible();

			await dialog.closeButton.click();
			await expect(dialog.content).not.toBeVisible();
		});
	});
}
