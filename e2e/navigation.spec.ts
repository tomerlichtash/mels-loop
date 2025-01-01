import { test, expect } from '@playwright/test';
import { getLocalePath, locales } from './utils/localeTestUtils';
import getT from 'next-translate/getT';
import i18n from '../i18n';
import { Translate } from 'next-translate';

global.i18nConfig = i18n;

test.describe('Topbar Navigation', () => {
	for (const locale of locales) {
		let t: Translate;

		test.beforeEach(async () => {
			t = await getT(locale, ['common', 'glossary']);
		});

		test(`[${locale}] navigate to Homepage from Site Name button`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale, '', 'about'));
			await page
				.getByRole('link', {
					name: t('common:site:title'),
					exact: true,
				})
				.click();
			const p = getLocalePath(locale, '', 'about');
			await expect(page).toHaveURL(p);
		});
	}
});
