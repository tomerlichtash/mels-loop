import { test, expect } from '@playwright/test';
import {
	getLocalePath,
	locales,
	getFrontMatter,
	translate,
} from '../../utils/testUtils';

test.describe('Articles', () => {
	const docId = 'docs/the-story-of-mel';

	locales.map((locale) => {
		test(`${locale} > should navigate to the Preface article`, async ({
			page,
		}) => {
			const path = 'pages/preface';
			const filename = 'index';
			const { data } = getFrontMatter(docId, `${path}/${filename}`, locale);

			await page.goto(getLocalePath(locale, docId));

			await page
				.getByRole('button', {
					name: translate(locale, 'nav.sections.articles.label'),
				})
				.hover();

			await page.click(
				`text=${translate(locale, 'nav.items.articles.som.intro.label')}`
			);

			await expect(page).toHaveURL(getLocalePath(locale, docId, path));
			await expect(page.locator('h1')).toHaveText(data.title as string);
		});

		test(`${locale} > should navigate to the Missing Bits article`, async ({
			page,
		}) => {
			const path = 'pages/mels-hack-the-missing-bits';
			const filename = 'index';
			const { data } = getFrontMatter(docId, `${path}/${filename}`, locale);

			await page.goto(getLocalePath(locale, docId));
			await page.hover(
				`text=${translate(locale, 'nav.sections.articles.label')}`
			);
			await page.click(
				`text=${translate(locale, 'nav.items.articles.som.missingBits.label')}`
			);

			await expect(page).toHaveURL(getLocalePath(locale, docId, path));
			await expect(page.locator('h1')).toHaveText(data.title as string);
		});

		test(`${locale} > should navigate to the CV article`, async ({ page }) => {
			const path = 'pages/mel-kaye-cv';
			const filename = 'index';
			const { data } = getFrontMatter(docId, `${path}/${filename}`, locale);

			await page.goto(getLocalePath(locale, docId));
			await page.hover(
				`text=${translate(locale, 'nav.sections.articles.label')}`
			);
			await page.click(
				`text=${translate(locale, 'nav.items.articles.som.bio.label')}`
			);

			await expect(page).toHaveURL(getLocalePath(locale, docId, path));
			await expect(page.locator('h1')).toHaveText(data.title as string);
		});

		test(`${locale} > should navigate to the Resources page`, async ({
			page,
		}) => {
			const path = 'pages/resources';
			const filename = 'index';
			const { data } = getFrontMatter(docId, `${path}/${filename}`, locale);
			const localePath = getLocalePath(locale, docId, path);

			await page.goto(localePath);
			await page.hover(
				`text=${translate(locale, 'nav.sections.articles.label')}`
			);
			await page.click(`text=${translate(locale, 'pages.resources.label')}`);

			await expect(page).toHaveURL(localePath);
			await expect(page.locator('h1')).toHaveText(data.title as string);
		});
	});
});
