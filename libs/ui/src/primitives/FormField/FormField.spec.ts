import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { FormFieldDriver } from './FormField.driver';

const STORY_ID = 'primitives-formfield--default';

const cases = {
	error: ['This field is required'],
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
						const field = new FormFieldDriver(page);
						await expect(field.locator).toHaveScreenshot();
					});
				}
			});
		}
	});
}
