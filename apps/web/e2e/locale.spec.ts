import { test, expect } from '@playwright/test';
import { t } from '@mels-loop/test-utils/i18n';
import { getLocalePath } from '@mels-loop/test-utils/locale';

test.describe('Locale Switcher', () => {
	test('switches from English to Hebrew', async ({ page }) => {
		await page.goto(getLocalePath('en'));

		// The locale switcher shows "עב" when on English (to switch to Hebrew)
		await page.getByRole('button', { name: /עב/i }).click();

		await expect(page).toHaveURL(/\/he\/?$/);
		const hebrewTitle = t('he', 'siteTitle');
		await expect(
			page.getByRole('link', { name: hebrewTitle }).first(),
		).toBeVisible();
	});

	test('switches from Hebrew to English', async ({ page }) => {
		await page.goto(getLocalePath('he'));

		// The locale switcher shows "EN" when on Hebrew (to switch to English)
		await page.getByRole('button', { name: /EN/i }).click();

		await expect(page).toHaveURL(/\/en\/?$/);
		const englishTitle = t('en', 'siteTitle');
		await expect(
			page.getByRole('link', { name: englishTitle }).first(),
		).toBeVisible();
	});
});
