import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { TableDriver } from './Table.driver';

const STORY_ID = 'content-table--default';

testComponent({
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const table = new TableDriver(page);
			await expect(table.locator).toHaveScreenshot();
		});
	},
});
