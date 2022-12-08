import { test, expect, Page } from "@playwright/test";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import * as stylesheet from "../../../src/components/note/note.st.css";
import {
	getFrontMatter,
	getLocalePath,
	locales,
	stripMarkdown,
} from "../../utils/test-utils";
import { NOTE_CONTENT_SELECTOR } from "../../utils/locators";
import {
	getAnnotationsData,
	getMarkdownLinks,
	getTermSelector,
} from "../../utils/terms";
import { SINGLE_WHITE_SPACE } from "../../utils/patterns";

const domUtil = new StylableDOMUtil(stylesheet);
const contentSelector = domUtil.scopeSelector(NOTE_CONTENT_SELECTOR);
const docId = "docs/the-story-of-mel";

test.describe.configure({ mode: "serial" });

test.describe("page", () =>
	locales.map((locale) => {
		let page: Page;

		test.beforeAll(async ({ browser }) => {
			page = await browser.newPage();
			await page.goto(getLocalePath(locale));
		});

		test.afterAll(async () => {
			await page.close();
		});

		const { content } = getFrontMatter(docId, "codex/index", locale);
		const codexTerms = getMarkdownLinks(content as string, "annotations");
		const terms = getAnnotationsData(locale, docId);

		const getRawTerm = (term: string) =>
			stripMarkdown(terms.filter((ann) => ann.key === term)[0].content);

		codexTerms.map(async (term: string) => {
			test(`Annotation: ${locale}: ${term}`, async () => {
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
				expect(
					stripMarkdown(textContent),
					"term content should be equal to source"
				).toEqual(getRawTerm(term));
				await page.locator(".popoverClose").click();
			});
		});
	}));

// import { test, expect } from "@playwright/test";
// import { StylableDOMUtil } from "@stylable/dom-test-kit";
// import * as stylesheet from "../../../src/components/note/note.st.css";
// import {
// 	getFrontMatter,
// 	getLocalePath,
// 	locales,
// 	stripMarkdown,
// } from "../../utils/test-utils";
// import { PORTAL_SELECTOR, NOTE_CONTENT_SELECTOR } from "../../utils/locators";
// import {
// 	getAnnotationsData,
// 	getMarkdownLinks,
// 	getTermSelector,
// } from "../../utils/terms";
// import type { ITermTestData } from "../../utils/types";
// import { SINGLE_WHITE_SPACE } from "../../utils/patterns";

// const domUtil = new StylableDOMUtil(stylesheet);

// const contentSelector = domUtil.scopeSelector(NOTE_CONTENT_SELECTOR);

// test.describe("Annotations", () => {
// 	locales.map((locale) => {
// 		const { content } = getFrontMatter(
// 			"docs/the-story-of-mel",
// 			"codex/index",
// 			locale
// 		);
// 		const codexTerms = getMarkdownLinks(content as string, "annotations");
// 		const terms = getAnnotationsData(locale, "docs/the-story-of-mel");
// 		return codexTerms.map((key: string) => {
// 			return test(`${locale} > should open annotation: ${key}`, async ({
// 				page,
// 			}) => {
// 				await page.goto(getLocalePath(locale));
// 				await page
// 					.locator(getTermSelector({ type: "annotation", key }))
// 					.first()
// 					.click();
// 				await page.$$(PORTAL_SELECTOR);

// 				const textContent = await page.locator(contentSelector).textContent();

// 				expect(textContent.length, "term cannot be empty").toBeGreaterThan(0);
// 				expect(
// 					textContent.split(SINGLE_WHITE_SPACE).length,
// 					"minimum words per term"
// 				).toBeGreaterThan(0);

// 				const { content } = terms.filter(
// 					(t: ITermTestData) => t.key === key
// 				)[0];
// 				const raw = stripMarkdown(content as string);
// 				const sample = stripMarkdown(
// 					await page.locator(contentSelector).textContent()
// 				);

// 				expect(
// 					sample.length,
// 					"sanitized content samples should have equal length"
// 				).toEqual(sample.length);

// 				expect(sample, "term content should be equal to source").toEqual(raw);
// 			});
// 		});
// 	});
// });
