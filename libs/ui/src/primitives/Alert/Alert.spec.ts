import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { AlertDriver } from './Alert.driver';

const STORY_ID = 'primitives-alert--default';

const cases = {
	status: ['success', 'error', 'warning', 'info'],
	radius: ['none', 'sm', 'md', 'lg', 'pill'],
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
						const alert = new AlertDriver(page);
						await expect(alert.locator).toHaveScreenshot();
					});
				}
			});
		}
	});
}
