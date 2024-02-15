import { test, expect, Page } from '@playwright/test';
import { getLocalePath, locales } from './utils/localeTestUtils';
import getT from 'next-translate/getT';
import { Translate } from 'next-translate';
import i18n from '../i18n';
import docIds from './codex/docIds';
import {
	getGlossaryData,
	getMarkdownLinks,
	getTermSelector,
} from './utils/termsTestUtils';
import { WHITE_SPACE } from './utils/patterns';
import { getFrontMatter, stripMarkdown } from './utils/mdTestUtils';

global.i18nConfig = i18n;

test.describe('Glossary', () => {
	for (const docId of docIds) {
		for (const locale of locales) {
			let t: Translate;
			let tEng: Translate;
			let page: Page;

			test.beforeAll(async ({ browser }) => {
				page = await browser.newPage();
				await page.goto(getLocalePath(locale));
			});

			test.afterAll(async () => await page.close());

			test.beforeEach(async () => {
				t = await getT(locale, ['common', 'glossary']);
				tEng = await getT('en', 'glossary');
			});

			const { content } = getFrontMatter(docId, 'codex/index', locale);
			const terms = getMarkdownLinks(content, 'glossary');
			const glossaryData = getGlossaryData(locale);

			terms.map((term: string) => {
				const { term_key, content } = glossaryData.find(
					({ key }) => key === term
				);

				return test(`[${locale}] ${term}`, async () => {
					await page
						.locator(
							getTermSelector({
								type: 'glossary',
								key: term,
							})
						)
						.first()
						.click();

					const dialogLocator = page.getByRole('dialog');

					await expect(dialogLocator).toBeVisible();

					const captionLocator = await dialogLocator
						.getByRole('caption')
						.textContent();

					// expect(validateStringTranslation(captionLocator)).toBeTruthy();
					expect(captionLocator).toEqual(t('common:caption:glossary'));

					const termLocator = await dialogLocator
						.getByRole('term')
						.textContent();

					expect(termLocator).toEqual(t(`glossary:term:${term_key}`));

					if (locale !== 'en') {
						const translatedTerm = await dialogLocator
							.getByRole('definition')
							.textContent();

						// Non-English glossary entries should include original term in English
						expect(translatedTerm).toEqual(tEng(`glossary:term:${term_key}`));
					}

					const noteLocator = dialogLocator.getByRole('note');

					expect((await noteLocator.textContent()).length).toBeGreaterThan(1);

					// minimum words per term
					expect(
						(await noteLocator.textContent()).split(WHITE_SPACE).length
					).toBeGreaterThan(0);

					const sanitizedContent = stripMarkdown(content);

					// term content equal to source
					expect(await noteLocator.textContent()).toEqual(sanitizedContent);

					await page.getByRole('toolbar').getByRole('button').click();

					await expect(dialogLocator).not.toBeVisible();
				});
			});
		}
	}
});
