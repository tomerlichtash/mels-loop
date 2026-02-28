import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { TextFieldDriver } from './TextField.driver';

const STORY_ID = 'input-textfield--default';

const cases = {
	size: ['sm', 'md', 'lg'],
	radius: ['none', 'sm', 'md', 'lg'],
	error: [true],
	disabled: [true],
	fullWidth: [true],
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
						const input = new TextFieldDriver(page);
						await expect(input.locator).toHaveScreenshot();
					});

					test(`${value} focus`, async ({ page }) => {
						await loadStory(page, STORY_ID, theme, {
							args: { [prop]: value },
						});
						const input = new TextFieldDriver(page);
						await input.locator.focus();
						await expect(input.locator).toHaveScreenshot();
					});
				}
			});
		}
	});
}
