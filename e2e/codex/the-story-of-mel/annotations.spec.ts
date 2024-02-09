import { test, expect, Page } from '@playwright/test';
import {
	getFrontMatter,
	getLocalePath,
	locales,
	stripMarkdown,
} from '../../utils/testUtils';
import {
	getAnnotationsData,
	getMarkdownLinks,
	getTermSelector,
} from '../../utils/terms';
import { WHITE_SPACE } from '../../utils/patterns';
import docIds from '../doc-ids';

test.describe('Annotations', () =>
	docIds.map((docId: string) => {
		return locales.map((locale) => {
			let page: Page;

			const { content } = getFrontMatter(docId, 'codex/index', locale);
			const terms = getMarkdownLinks(content, 'annotations');
			const annotationData = getAnnotationsData(locale, docId);

			const getRawTerm = (term: string) =>
				stripMarkdown(
					annotationData.filter((ann) => ann.key === term)[0].content
				);

			test.beforeAll(async ({ browser }) => {
				page = await browser.newPage();
				await page.goto(getLocalePath(locale));
			});

			test.afterAll(async () => await page.close());

			terms.map((term: string) => {
				test(`${locale} > ${term}`, async () => {
					await page
						.locator(
							getTermSelector({
								type: 'annotation',
								key: term,
							})
						)
						.first()
						.click();

					await expect(page.getByRole('dialog')).toBeVisible();

					const textContent = await page
						.getByRole('dialog')
						.getByRole('note')
						.textContent();

					expect(textContent.length, 'term cannot be empty').toBeGreaterThan(0);

					expect(
						textContent.split(WHITE_SPACE).length,
						'minimum words per term'
					).toBeGreaterThan(0);

					// expect(
					// 	Object.keys(getRawTerm(term)),
					// 	"missing markdown file"
					// ).toEqual(["term", "content"]);

					expect(
						stripMarkdown(textContent),
						'term content should be equal to source'
					).toEqual(getRawTerm(term));

					await page.getByRole('toolbar').getByRole('button').click();
				});
			});
		});
	}));
