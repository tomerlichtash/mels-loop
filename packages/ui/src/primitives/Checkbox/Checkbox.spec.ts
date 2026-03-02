import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { CheckboxDriver } from './Checkbox.driver';

testComponent({
	name: 'Checkbox',
	storyId: 'input-checkbox--default',
	cases: {
		checked: [true, false, 'indeterminate'],
		size: ['sm', 'md', 'lg'],
		error: [true, false],
		disabled: [true, false],
		required: [true, false],
	},
	getTarget: (page) => new CheckboxDriver(page),
	extra: (theme, textDirection) => {
		test('click toggles checked', async ({ page }) => {
			await loadStory(page, 'input-checkbox--default', theme, {
				textDirection,
			});
			const checkbox = new CheckboxDriver(page);
			await checkbox.control.click();
			await expect(checkbox.locator).toHaveScreenshot();
		});
	},
});
