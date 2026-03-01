import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { SwitchDriver } from './Switch.driver';

const STORY_ID = 'input-switch--default';

const cases = {
	size: ['sm', 'md', 'lg'],
	error: [true],
	disabled: [true],
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
						const sw = new SwitchDriver(page);
						await expect(sw.locator).toHaveScreenshot();
					});
				}
			});
		}

		test('checked', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const sw = new SwitchDriver(page);
			await sw.control.click();
			await expect(sw.locator).toHaveScreenshot();
		});
	});
}
