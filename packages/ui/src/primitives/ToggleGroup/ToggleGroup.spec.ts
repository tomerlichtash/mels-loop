import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ToggleGroupDriver } from './ToggleGroup.driver';

const STORY_ID = 'action-togglegroup--default';

for (const theme of THEMES) {
	test.describe(theme, () => {
		test('renders with initial selection', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const group = new ToggleGroupDriver(page);

			await expect(group.locator).toBeVisible();
			await expect(group.activeItem()).toHaveText('Option A');
		});

		test('switches selection on click', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const group = new ToggleGroupDriver(page);

			await group.item('Option B').click();
			await expect(group.activeItem()).toHaveText('Option B');

			await group.item('Option C').click();
			await expect(group.activeItem()).toHaveText('Option C');
		});

		test('does not deselect when clicking active item', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const group = new ToggleGroupDriver(page);

			await group.activeItem().click();
			await expect(group.activeItem()).toHaveText('Option A');
		});
	});
}
