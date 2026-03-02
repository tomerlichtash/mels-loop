import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { PasswordFieldDriver } from './PasswordField.driver';

const STORY_ID = 'input-passwordfield--default';

testComponent({
	storyId: STORY_ID,
	cases: {
		size: ['sm', 'md', 'lg'],
		radius: ['none', 'sm', 'md', 'lg'],
		error: [true, false],
		disabled: [true, false],
		fullWidth: [true, false],
		required: [true, false],
		tooltip: [true, false],
	},
	getTarget: (page) => new PasswordFieldDriver(page),
	interactions: {
		hover: (field) => field.hover(),
		focus: (field) => field.focus(),
	},
	extra: (theme, textDirection) => {
		test('toggle visibility', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const field = new PasswordFieldDriver(page);
			await field.toggleButton.click();
			await expect(field.locator).toHaveScreenshot();
		});

		test('disabled ignores input', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: { disabled: true },
				textDirection,
			});
			const field = new PasswordFieldDriver(page);
			await field.fill('should not appear');
			await expect(field.locator).toHaveScreenshot();
		});
	},
});
