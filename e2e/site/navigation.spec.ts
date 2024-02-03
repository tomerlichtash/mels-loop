import { test, expect } from '@playwright/test';
import {
	getLocalePath,
	locales,
	getFrontMatter,
	translate,
} from '../utils/test-utils';

test.describe('TopBar Navigation', () => {
	locales.map((locale) => {
		test(`${locale} > should navigate to Homepage from Site Name button`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale, '', 'about'));
			await page
				.getByRole('link', {
					name: translate(locale, 'site.title'),
					exact: true,
				})
				.click();
			const p = getLocalePath(locale, '', 'about');
			await expect(page).toHaveURL(p);
		});
	});
});

test.describe('Dynamic Pages', () => {
	locales.map((locale) => {
		test(`${locale} > should navigate to the About page`, async ({ page }) => {
			const path = 'about';
			const filename = 'index';
			const { data } = getFrontMatter('', `${path}/${filename}`, locale);
			const localePath = getLocalePath(locale, path);

			await page.goto(localePath);
			await page.click(`text=${translate(locale, 'MENU_ITEM_LABEL_ID_ABOUT')}`);

			await expect(page).toHaveURL(localePath);
			await expect(page.locator('h1')).toHaveText(data.title as string);
		});

		test.skip(`${locale} > should navigate to the About page from Learn More link`, async ({
			page,
		}) => {
			const path = 'about';
			const filename = 'index';
			const { data } = getFrontMatter('', `${path}/${filename}`, locale);
			const localePath = getLocalePath(locale, path);

			await page.goto(localePath);
			await page.hover(`text=${translate(locale, 'MENU_ITEM_LABEL_ID_ABOUT')}`);
			await page.click(
				`text=${translate(locale, 'MENU_ITEM_LABEL_EXCERPT_SHOW_MORE')}`
			);

			await expect(page).toHaveURL(localePath);
			await expect(page.locator('h1')).toHaveText(data.title as string);
		});
	});
});
