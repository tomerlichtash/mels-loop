import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { SeparatorDriver } from './Separator.driver';

const STORY_ID = 'layout-separator--default';

const orientations = ['horizontal', 'vertical'] as const;

for (const theme of THEMES) {
	test.describe(theme, () => {
		test.describe('orientation', () => {
			for (const orientation of orientations) {
				test(`${orientation}`, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, {
						args: { orientation },
					});
					const separator = new SeparatorDriver(page);
					await expect(separator.locator).toHaveScreenshot();
				});
			}
		});
	});
}
