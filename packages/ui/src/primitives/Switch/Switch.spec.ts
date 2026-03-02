import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { SwitchDriver } from './Switch.driver';

testComponent({
	storyId: 'input-switch--default',
	cases: {
		checked: [true, false],
		size: ['sm', 'md', 'lg'],
		error: [true, false],
		disabled: [true, false],
	},
	getTarget: (page) => new SwitchDriver(page),
	extra: (theme, textDirection) => {
		test('click toggles checked', async ({ page }) => {
			await loadStory(page, 'input-switch--default', theme, {
				textDirection,
			});
			const sw = new SwitchDriver(page);
			await sw.control.click();
			await expect(sw.locator).toHaveScreenshot();
		});
	},
});
