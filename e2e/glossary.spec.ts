import { test, expect, Page } from '@playwright/test';
import {
	getFrontMatter,
	getLocalePath,
	locales,
	stripMarkdown,
	translate,
	validateStringTranslation,
} from './utils/testUtils';
import {
	getGlossaryData,
	getMarkdownLinks,
	getTermSelector,
} from './utils/terms';
import { WHITE_SPACE } from './utils/patterns';
import docIds from './codex/doc-ids';

// test.describe.configure({ mode: 'serial' });

test.describe('Glossary', () => {
	docIds.map((docId) => {
		locales.map((locale) => {
			let page: Page;

			const { content } = getFrontMatter(docId, 'codex/index', locale);
			const terms = getMarkdownLinks(content, 'glossary');
			const glossaryData = getGlossaryData(locale);

			test.beforeAll(async ({ browser }) => {
				page = await browser.newPage();
				await page.goto(getLocalePath(locale));
			});

			test.afterAll(async () => await page.close());

			terms.map((term: string) => {
				const { term_key, content } = glossaryData.filter(
					(t) => t.key === term
				)[0];

				test(`${locale} > ${term}`, async () => {
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

					expect(validateStringTranslation(captionLocator)).toBeTruthy();
					expect(captionLocator).toEqual(
						translate(locale, 'popover.glossary.caption')
					);

					const termLocator = await dialogLocator
						.getByRole('term')
						.textContent();

					expect(termLocator).toEqual(translate(locale, term_key as string));

					if (locale !== 'en') {
						const translatedTerm = await dialogLocator
							.getByRole('definition')
							.textContent();

						expect(validateStringTranslation(translatedTerm)).toBeTruthy();

						expect(
							translatedTerm,
							'Non-English glossary entries should include original term in English'
						).toEqual(translate('en', term_key as string));
					}

					const noteLocator = await dialogLocator
						.getByRole('note')
						.textContent();

					expect(noteLocator.length, 'term cannot be empty').toBeGreaterThan(0);

					expect(
						noteLocator.split(WHITE_SPACE).length,
						'minimum words per term'
					).toBeGreaterThan(0);

					const sanitizedContent = stripMarkdown(content);

					expect(noteLocator, 'term content equal to source').toEqual(
						sanitizedContent
					);

					await page.getByRole('toolbar').getByRole('button').click();

					await expect(dialogLocator).not.toBeVisible();
				});
			});
		});
	});
});
