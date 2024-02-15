import { test, expect } from '@playwright/test';
import { getFrontMatter } from '../../utils/mdTestUtils';
import { getLocalePath, locales } from '../../utils/localeTestUtils';
import getT from 'next-translate/getT';
import { Translate } from 'next-translate';
import i18n from '../../../i18n';
import docIds from '../docIds';

global.i18nConfig = i18n;

test.describe('Articles', () => {
	for (const docId of docIds) {
		for (const locale of locales) {
			let t: Translate;

			test.beforeEach(async () => {
				t = await getT(locale, ['common', 'nav']);
			});

			test(`[${locale}] navigate to the Preface article`, async ({ page }) => {
				const path = 'pages/preface';
				const filename = 'index';
				const { data } = getFrontMatter(docId, `${path}/${filename}`, locale);

				await page.goto(getLocalePath(locale, docId));

				await page.hover(`text=${t('nav:sections:articles:label')}`);
				await page.click(`text=${t('nav:items:articles:som:intro:label')}`);

				await expect(page).toHaveURL(getLocalePath(locale, docId, path));
				await expect(page.locator('h1')).toHaveText(data.title as string);
			});

			test(`[${locale}] navigate to the Missing Bits article`, async ({
				page,
			}) => {
				const path = 'pages/mels-hack-the-missing-bits';
				const filename = 'index';
				const { data } = getFrontMatter(docId, `${path}/${filename}`, locale);

				await page.goto(getLocalePath(locale, docId));

				await page.hover(`text=${t('nav:sections:articles:label')}`);
				await page.click(
					`text=${t('nav:items:articles:som:missingBits:label')}`
				);

				await expect(page).toHaveURL(getLocalePath(locale, docId, path));
				await expect(page.locator('h1')).toHaveText(data.title as string);
			});

			test(`[${locale}] navigate to the CV article`, async ({ page }) => {
				const path = 'pages/mel-kaye-cv';
				const filename = 'index';
				const { data } = getFrontMatter(docId, `${path}/${filename}`, locale);

				await page.goto(getLocalePath(locale, docId));

				await page.hover(`text=${t('nav:sections:articles:label')}`);
				await page.click(`text=${t('nav:items:articles:som:bio:label')}`);

				await expect(page).toHaveURL(getLocalePath(locale, docId, path));
				await expect(page.locator('h1')).toHaveText(data.title as string);
			});

			test(`[${locale}] navigate to the Resources page`, async ({ page }) => {
				const path = 'pages/resources';
				const filename = 'index';
				const { data } = getFrontMatter(docId, `${path}/${filename}`, locale);
				const localePath = getLocalePath(locale, docId, path);

				await page.goto(localePath);

				await page.hover(`text=${t('nav:sections:articles:label')}`);
				await page.click(`text=${t('nav:items:pages:resources:label')}`);

				await expect(page).toHaveURL(localePath);
				await expect(page.locator('h1')).toHaveText(data.title as string);
			});
		}
	}
});
