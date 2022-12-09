import { test, expect, Page } from "@playwright/test";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import * as stylesheet from "../../src/components/note/note.st.css";
import {
	getFrontMatter,
	getLocalePath,
	locales,
	stripMarkdown,
	translate,
	validateStringTranslation,
} from "../utils/test-utils";
import {
	PORTAL_SELECTOR,
	NOTE_LABEL_SELECTOR,
	NOTE_TITLE_SELECTOR,
	NOTE_CONTENT_SELECTOR,
	NOTE_TITLE_TERM_ORIGIN,
} from "../utils/locators";
import {
	getGlossaryData,
	getMarkdownLinks,
	getTermSelector,
} from "../utils/terms";
import type { ITermTestData } from "../utils/types";
import { SINGLE_WHITE_SPACE } from "../utils/patterns";
import { docIds } from "../codex/doc-ids";

const domUtil = new StylableDOMUtil(stylesheet);
const contentSelector = domUtil.scopeSelector(NOTE_CONTENT_SELECTOR);

const labelSelector = domUtil.scopeSelector(NOTE_LABEL_SELECTOR);
const titleSelector = domUtil.scopeSelector(NOTE_TITLE_SELECTOR);
const termSelector = domUtil.scopeSelector(NOTE_TITLE_TERM_ORIGIN);

test.describe.configure({ mode: "serial" });

test.describe("Glossary", () => {
	docIds.map((docId) => {
		locales.map((locale) => {
			let page: Page;

			test.beforeAll(async ({ browser }) => {
				page = await browser.newPage();
				await page.goto(getLocalePath(locale));
			});

			test.afterAll(async () => await page.close());

			const { content } = getFrontMatter(docId, "codex/index", locale);
			const codexTerms = getMarkdownLinks(content as string, "glossary");
			const terms = getGlossaryData(locale);

			codexTerms.map(async (term: string) => {
				const { term_key, content } = terms.filter(
					(t: ITermTestData) => t.key === term
				)[0];

				test(`${locale} > ${term}`, async () => {
					await page
						.locator(
							getTermSelector({
								type: "glossary",
								key: term,
							})
						)
						.first()
						.click();
					await page.waitForSelector(PORTAL_SELECTOR);

					const glossaryLabel = await page.locator(labelSelector).textContent();
					expect(validateStringTranslation(glossaryLabel)).toBeTruthy();
					expect(glossaryLabel).toEqual(
						translate(locale, "NOTE_LABEL_GLOSSARY")
					);

					await expect(page.locator(titleSelector)).toHaveText(
						translate(locale, term_key as string)
					);

					if (locale !== "en") {
						const originTerm = translate("en", term_key as string);
						const translatedTerm = await page
							.locator(termSelector)
							.textContent();

						expect(validateStringTranslation(translatedTerm)).toBeTruthy();

						await expect(
							page.locator(termSelector),
							"Non-English glossary entries should show original term in English"
						).toHaveText(originTerm);
					}

					const textContent = await page.locator(contentSelector).textContent();

					expect(textContent.length, "term cannot be empty").toBeGreaterThan(0);

					expect(
						textContent.split(SINGLE_WHITE_SPACE).length,
						"minimum words per term"
					).toBeGreaterThan(0);

					const sanitizedContent = stripMarkdown(content as string);

					await expect(
						page.locator(contentSelector),
						"term content equal to source"
					).toHaveText(sanitizedContent);

					await page.locator(".popoverClose").click();
				});
			});
		});
	});
});
