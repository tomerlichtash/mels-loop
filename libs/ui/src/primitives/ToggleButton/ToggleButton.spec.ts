import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ToggleButtonDriver } from './ToggleButton.driver';

const STORY_ID = 'primitives-togglebutton--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('renders unpressed by default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const toggle = new ToggleButtonDriver(page);

			await expect(toggle.locator).toBeVisible();
			expect(await toggle.isPressed()).toBe(false);
		});

		test('toggles on click', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const toggle = new ToggleButtonDriver(page);

			await toggle.click();
			expect(await toggle.isPressed()).toBe(true);

			await toggle.click();
			expect(await toggle.isPressed()).toBe(false);
		});
	});
}
