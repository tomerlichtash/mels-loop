import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { BadgeDriver } from './Badge.driver';

const STORY_ID = 'primitives-badge--default';

const cases = {
	radius: ['none', 'sm', 'md', 'lg', 'pill'],
	color: ['black', 'white', 'red', 'blue', '#1a8a3f', '#e8c542'],
	bordered: [true],
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
						const badge = new BadgeDriver(page);
						await expect(badge.locator).toHaveScreenshot();
					});
				}
			});
		}

		test('long text', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: {
					children:
						'This is a very long badge label that should be truncated with ellipsis',
				},
			});
			await page.locator('#storybook-root').evaluate((el) => {
				el.style.width = '150px';
			});
			const badge = new BadgeDriver(page);
			await expect(badge.locator).toHaveScreenshot();
		});
	});
}
