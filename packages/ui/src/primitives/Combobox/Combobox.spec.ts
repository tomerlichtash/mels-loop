import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { ComboboxDriver } from './Combobox.driver';

const STORY_ID = 'input-combobox--default';

const cases = {
	size: ['sm', 'md', 'lg'],
	radius: ['none', 'sm', 'md', 'lg'],
	disabled: [true],
	fullWidth: [true],
	error: [true],
	required: [true],
};

for (const theme of THEMES) {
	test.describe(theme, () => {
		for (const [prop, values] of Object.entries(cases)) {
			test.describe(prop, () => {
				for (const value of values) {
					test(`${value}`, async ({ page }) => {
						await loadStory(page, STORY_ID, theme, {
							args: { [prop]: value },
						});
						const combobox = new ComboboxDriver(page);
						await expect(combobox.locator).toHaveScreenshot();
					});
				}
			});
		}

		test('open dropdown', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const combobox = new ComboboxDriver(page);
			await combobox.open();
			await expect(page).toHaveScreenshot();
		});

		test('highlighted option', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const combobox = new ComboboxDriver(page);
			await combobox.open();
			await combobox.option('Canada').hover();
			await expect(page).toHaveScreenshot();
		});

		test('selected option', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const combobox = new ComboboxDriver(page);
			await combobox.open();
			await combobox.select('Canada');
			await expect(combobox.locator).toHaveScreenshot();
		});

		test('filter', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const combobox = new ComboboxDriver(page);
			await combobox.type('united');
			await expect(page).toHaveScreenshot();
		});

		test('no results', async ({ page }) => {
			await loadStory(page, STORY_ID, theme);
			const combobox = new ComboboxDriver(page);
			await combobox.type('zzz');
			await expect(page).toHaveScreenshot();
		});

		test.describe('multiple', () => {
			test('chips', async ({ page }) => {
				await loadStory(page, STORY_ID, theme, {
					args: { multiple: true },
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
				});
				const combobox = new ComboboxDriver(page);
				await combobox.open();
				await combobox.select('Canada');
				await combobox.type('united');
				await expect(page).toHaveScreenshot();
			});
		});
	});
}
