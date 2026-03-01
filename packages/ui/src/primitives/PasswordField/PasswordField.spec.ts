import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { PasswordFieldDriver } from './PasswordField.driver';

const STORY_ID = 'input-passwordfield--default';

const cases = {
	size: ['sm', 'md', 'lg'],
	radius: ['none', 'sm', 'md', 'lg'],
	error: [true],
	disabled: [true],
	fullWidth: [true],
	required: [true],
	tooltip: [true],
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
						const field = new PasswordFieldDriver(page);
						await expect(field.locator).toHaveScreenshot();
					});
				}
			});
		}

		test('toggle visibility', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const field = new PasswordFieldDriver(page);
			await field.toggleButton.click();
			await expect(field.locator).toHaveScreenshot();
		});

		test('focus', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const field = new PasswordFieldDriver(page);
			await field.input.focus();
			await expect(field.locator).toHaveScreenshot();
		});
	});
}
