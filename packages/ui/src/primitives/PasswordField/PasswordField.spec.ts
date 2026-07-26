import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { PasswordFieldDriver } from './PasswordField.driver';

const STORY_ID = 'input-passwordfield--default';

testComponent({
	storyId: STORY_ID,
	cases: {
		size: ['sm', 'md', 'lg'],
		radius: ['none', 'sm', 'md', 'lg'],
		error: [true],
		disabled: [true],
		fullWidth: [true],
		required: [true],
		tooltip: [true],
	},
	getTarget: (page) => new PasswordFieldDriver(page),
	interactions: {
		hover: {
			run: (field) => field.locator.hover({ force: true }),
		},
		focus: {
			run: (field) => field.focus(),
			skip: (prop, value) => prop === 'disabled' && value === true,
		},
	},
	extra: (theme, textDirection) => {
		test('toggle visibility', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const field = new PasswordFieldDriver(page);
			await field.toggleButton.click();
			await expect(field.locator).toHaveScreenshot();
		});
	},
});
