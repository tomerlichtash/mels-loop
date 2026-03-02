import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { BadgeDriver } from './Badge.driver';

testComponent({
	name: 'Badge',
	storyId: 'content-badge--default',
	cases: {
		radius: ['none', 'sm', 'md', 'lg', 'pill'],
		color: ['black', 'white', 'red', 'blue', '#1a8a3f', '#e8c542'],
		bordered: [true, false],
	},
	getTarget: (page) => new BadgeDriver(page),
	extra: (theme, textDirection) => {
		test('long text', async ({ page }) => {
			await loadStory(page, 'content-badge--default', theme, {
				args: {
					children:
						'This is a very long badge label that should be truncated with ellipsis',
				},
				textDirection,
			});
			await page.locator('#storybook-root').evaluate((el) => {
				el.style.width = '150px';
			});
			const badge = new BadgeDriver(page);
			await expect(badge.locator).toHaveScreenshot();
		});
	},
});
