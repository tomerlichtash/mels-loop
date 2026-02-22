import { t } from '@mels-loop/test-utils/i18n';
import { getLocalePath, locales } from '@mels-loop/test-utils/locale';
import { expect, test } from '@playwright/test';

for (const locale of locales) {
	test.describe(`Navigation (${locale})`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(getLocalePath(locale));
		});

		test('clicking site title navigates to homepage', async ({ page }) => {
			const siteTitle = t(locale, 'siteTitle');
			await page.getByRole('link', { name: siteTitle }).first().click();
			await expect(page).toHaveURL(new RegExp(`/${locale}/?$`));
		});

		test('nav contains expected items', async ({ page }) => {
			const nav = page.getByRole('navigation');
			const expectedItems = ['nav.about', 'nav.glossary', 'nav.contact'];
			for (const key of expectedItems) {
				const label = t(locale, key);
				await expect(nav.getByRole('link', { name: label })).toBeVisible();
			}
		});

		test('clicking About navigates to about page', async ({ page }) => {
			const aboutLabel = t(locale, 'nav.about');
			await page
				.getByRole('navigation')
				.getByRole('link', { name: aboutLabel })
				.click();
			await expect(page).toHaveURL(getLocalePath(locale, '/about'));
		});

		test('clicking Glossary navigates to glossary page', async ({ page }) => {
			const glossaryLabel = t(locale, 'nav.glossary');
			await page
				.getByRole('navigation')
				.getByRole('link', { name: glossaryLabel })
				.click();
			await expect(page).toHaveURL(getLocalePath(locale, '/glossary'));
		});

		test('clicking Contact navigates to contact page', async ({ page }) => {
			const contactLabel = t(locale, 'nav.contact');
			await page
				.getByRole('navigation')
				.getByRole('link', { name: contactLabel })
				.click();
			await expect(page).toHaveURL(getLocalePath(locale, '/contact'));
		});

		test('Blog link points to external blog', async ({ page }) => {
			const blogLabel = t(locale, 'nav.blog');
			const blogLink = page
				.getByRole('navigation')
				.getByRole('link', { name: blogLabel });
			await expect(blogLink).toHaveAttribute('target', '_blank');
			await expect(blogLink).toHaveAttribute('href', /blog\.melsloop\.com/);
		});
	});
}
