import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { TextareaDriver } from './Textarea.driver';

const STORY_ID = 'primitives-textarea--default';

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
						const textarea = new TextareaDriver(page);
						await expect(textarea.locator).toHaveScreenshot();
					});

					test(`${value} focus`, async ({ page }) => {
						await loadStory(page, STORY_ID, theme, {
							args: { [prop]: value },
						});
						const textarea = new TextareaDriver(page);
						await textarea.locator.focus();
						await expect(textarea.locator).toHaveScreenshot();
					});
				}
			});
		}
	});
}
