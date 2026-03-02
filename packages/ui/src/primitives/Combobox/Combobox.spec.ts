import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ComboboxDriver } from './Combobox.driver';

const STORY_ID = 'input-combobox--default';

testComponent({
	storyId: STORY_ID,
	cases: {
		size: ['sm', 'md', 'lg'],
		radius: ['none', 'sm', 'md', 'lg'],
		disabled: [true],
		fullWidth: [true],
		error: [true],
		required: [true],
	},
	getTarget: (page) => new ComboboxDriver(page),
	extra: (theme, textDirection) => {
		test('open dropdown', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const combobox = new ComboboxDriver(page);
			await combobox.open();
			await expect(page).toHaveScreenshot();
		});

		test('highlighted option', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const combobox = new ComboboxDriver(page);
			await combobox.open();
			await combobox.option('Canada').hover();
			await expect(page).toHaveScreenshot();
		});

		test('selected option', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const combobox = new ComboboxDriver(page);
			await combobox.open();
			await combobox.select('Canada');
			await expect(combobox.locator).toHaveScreenshot();
		});

		test('filter', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const combobox = new ComboboxDriver(page);
			await combobox.type('united');
			await expect(page).toHaveScreenshot();
		});

		test('no results', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const combobox = new ComboboxDriver(page);
			await combobox.type('zzz');
			await expect(page).toHaveScreenshot();
		});

		test.describe('multiple', () => {
			test('chips', async ({ page }) => {
				await loadStory(page, STORY_ID, theme, {
					args: { multiple: true },
					textDirection,
				});
				const combobox = new ComboboxDriver(page);
				await combobox.open();
				await combobox.select('Canada');
				await combobox.select('Germany');
				await combobox.select('Japan');
				await expect(combobox.locator).toHaveScreenshot();
			});

			test('open with chips', async ({ page }) => {
				await loadStory(page, STORY_ID, theme, {
					args: { multiple: true },
					textDirection,
				});
				const combobox = new ComboboxDriver(page);
				await combobox.open();
				await combobox.select('Canada');
				await combobox.select('Germany');
				await combobox.open();
				await expect(page).toHaveScreenshot();
			});

			test('filter with chips', async ({ page }) => {
				await loadStory(page, STORY_ID, theme, {
					args: { multiple: true },
					textDirection,
				});
				const combobox = new ComboboxDriver(page);
				await combobox.open();
				await combobox.select('Canada');
				await combobox.type('united');
				await expect(page).toHaveScreenshot();
			});
		});
	},
});
