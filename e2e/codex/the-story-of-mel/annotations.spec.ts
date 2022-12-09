import { test, expect, Page } from "@playwright/test";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import * as stylesheet from "../../../src/components/note/note.st.css";
import {
	getFrontMatter,
	getLocalePath,
	locales,
	stripMarkdown,
} from "../../utils/test-utils";
import {
	getAnnotationsData,
	getMarkdownLinks,
	getTermSelector,
} from "../../utils/terms";
import { NOTE_CONTENT_SELECTOR } from "../../utils/locators";
import { SINGLE_WHITE_SPACE } from "../../utils/patterns";
import { docIds } from "../doc-ids";

const domUtil = new StylableDOMUtil(stylesheet);
const contentSelector = domUtil.scopeSelector(NOTE_CONTENT_SELECTOR);

test.describe.configure({ mode: "serial" });

test.describe("Annotations", () =>
	docIds.map((docId) => {
		return locales.map((locale) => {
			let page: Page;

			test.beforeAll(async ({ browser }) => {
				page = await browser.newPage();
				await page.goto(getLocalePath(locale));
			});

			test.afterAll(async () => await page.close());

			const { content } = getFrontMatter(docId, "codex/index", locale);
			const codexTerms = getMarkdownLinks(content as string, "annotations");
			const terms = getAnnotationsData(locale, docId);

			const getRawTerm = (term: string) =>
				stripMarkdown(terms.filter((ann) => ann.key === term)[0].content);

			codexTerms.map(async (term: string) => {
				test(`${locale} > ${term}`, async () => {
					await page
						.locator(
							getTermSelector({
								type: "annotation",
								key: term,
							})
						)
						.first()
						.click();
					await page.waitForSelector(contentSelector);
					const textContent = await page.locator(contentSelector).textContent();
					expect(textContent.length, "term cannot be empty").toBeGreaterThan(0);
					expect(
						textContent.split(SINGLE_WHITE_SPACE).length,
						"minimum words per term"
					).toBeGreaterThan(0);
					// expect(
					// 	Object.keys(getRawTerm(term)),
					// 	"missing markdown file"
					// ).toEqual(["term", "content"]);
					expect(
						stripMarkdown(textContent),
						"term content should be equal to source"
					).toEqual(getRawTerm(term));
					await page.locator(".popoverClose").click();
				});
			});
		});
	}));
