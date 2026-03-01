import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { CheckboxDriver } from './Checkbox.driver';

const STORY_ID = 'input-checkbox--default';

const cases = {
	checked: [true, 'indeterminate'],
	size: ['sm', 'md', 'lg'],
	error: [true],
	disabled: [true],
	required: [true],
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
						const checkbox = new CheckboxDriver(page);
						await expect(checkbox.locator).toHaveScreenshot();
					});
				}
			});
		}
	});
}
