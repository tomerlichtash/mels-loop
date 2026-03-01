import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ButtonDriver } from './Button.driver';

const STORY_ID = 'action-button--default';

const cases = {
	size: ['xs', 'sm', 'md', 'lg', 'xl'],
	variant: ['contained', 'outlined', 'text'],
	radius: ['none', 'sm', 'md', 'lg', 'pill'],
	loading: [true],
	disabled: [true],
	fullWidth: [true],
	asChild: [true],
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
						const button = new ButtonDriver(page);
						await expect(button.locator).toHaveScreenshot();
					});

					test(`${value} hover`, async ({ page }) => {
						await loadStory(page, STORY_ID, theme, {
							args: { [prop]: value },
						});
						const button = new ButtonDriver(page);
						await button.hover();
						await expect(button.locator).toHaveScreenshot();
					});

					test(`${value} active`, async ({ page }) => {
						await loadStory(page, STORY_ID, theme, {
							args: { [prop]: value },
						});
						const button = new ButtonDriver(page);
						await button.locator.dispatchEvent('mousedown');
						await expect(button.locator).toHaveScreenshot();
					});
				}
			});
		}
	});
}
