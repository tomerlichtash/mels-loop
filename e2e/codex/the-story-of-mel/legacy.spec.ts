import { test, expect } from '@playwright/test';
import { getFrontMatter } from '../../utils/mdTestUtils';
import { getLocalePath, locales } from '../../utils/localeTestUtils';

test.describe('Legacy Paths', () => {
	const legacyDocs = ['preface', 'mels-hack-the-missing-bits', 'resources'];
	legacyDocs.map((legacyDocName) => {
		locales.map((locale) => {
			test(`${locale} > should support single doc URL to ${legacyDocName}`, async ({
				page,
			}) => {
				const docId = 'docs/the-story-of-mel';
				const filename = 'index';
				const { data } = getFrontMatter(
					docId,
					`pages/${legacyDocName}/${filename}`,
					locale
				);
				await page.goto(`localhost:3000/${locale}/docs/${legacyDocName}`);
				await expect(page).toHaveURL(
					getLocalePath(locale, docId, `pages/${legacyDocName}`)
				);
				await expect(page.locator('h1')).toHaveText(data.title as string);
			});
		});
	});
});
