import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { TextAreaDriver } from './TextArea.driver';

const STORY_ID = 'input-textarea--default';

testComponent({
	storyId: STORY_ID,
	cases: {
		size: ['sm', 'md', 'lg'],
		radius: ['none', 'sm', 'md', 'lg'],
		error: [true, false],
		disabled: [true, false],
		fullWidth: [true, false],
		readOnly: [true, false],
	},
	getTarget: (page) => new TextAreaDriver(page),
	interactions: {
		hover: (field) => field.hover(),
		focus: (field) => field.focus(),
	},
	extra: (theme, textDirection) => {
		test('disabled ignores input', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: { disabled: true },
				textDirection,
			});
			const field = new TextAreaDriver(page);
			await field.fill('should not appear');
			await expect(field.locator).toHaveScreenshot();
		});

		test('readOnly ignores input', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: { readOnly: true, value: 'read only value' },
				textDirection,
			});
			const field = new TextAreaDriver(page);
			await field.fill('should not change');
			await expect(field.locator).toHaveScreenshot();
		});
	},
});
