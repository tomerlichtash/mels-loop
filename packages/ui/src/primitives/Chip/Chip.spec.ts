import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ChipDriver } from './Chip.driver';

testComponent({
	storyId: 'content-chip--default',
	cases: {
		size: ['sm', 'md', 'lg'],
		radius: ['sm', 'md', 'lg', 'pill'],
		disabled: [true],
		dismissible: [true],
	},
	getTarget: (page) => new ChipDriver(page),
	extra: (theme, textDirection) => {
		test('long text', async ({ page }) => {
			await loadStory(page, 'content-chip--default', theme, {
				args: {
					children: 'This is a very long chip label that should truncate',
				},
				textDirection,
			});
			await page.locator('#storybook-root').evaluate((el) => {
				el.style.width = '120px';
			});
			const chip = new ChipDriver(page);
			await expect(chip.locator).toHaveScreenshot();
		});
	},
});
