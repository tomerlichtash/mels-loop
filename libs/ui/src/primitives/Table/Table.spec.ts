import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { TableDriver } from './Table.driver';

const STORY_ID = 'content-table--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const table = new TableDriver(page);
			await expect(table.locator).toHaveScreenshot();
		});
	});
}
