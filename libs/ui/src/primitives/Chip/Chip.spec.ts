import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ChipDriver } from './Chip.driver';

const STORY_ID = 'content-chip--default';

const cases = {
	size: ['sm', 'md', 'lg'],
	disabled: [true],
	dismissible: [true, false],
};

for (const theme of THEMES) {
	test.describe(theme, () => {
		for (const [prop, values] of Object.entries(cases)) {
			test.describe(prop, () => {
				for (const value of values) {
					test(`${value}`, async ({ page }) => {
						await loadStory(page, STORY_ID, theme, {
							args: { [prop]: value },
						});
						const chip = new ChipDriver(page);
						await expect(chip.locator).toHaveScreenshot();
					});
				}
			});
		}

		test('long text', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: {
					children: 'This is a very long chip label that should truncate',
				},
			});
			await page.locator('#storybook-root').evaluate((el) => {
				el.style.width = '120px';
			});
			const chip = new ChipDriver(page);
			await expect(chip.locator).toHaveScreenshot();
		});
	});
}
