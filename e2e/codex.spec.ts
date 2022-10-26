import { test, expect } from "@playwright/test";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import * as stylesheet from "../src/components/note/note.st.css";
import {
	getFrontMatter,
	getLocalePath,
	locales,
	stripMarkdown,
	translate,
} from "./utils/test-utils";
import {
	PORTAL_SELECTOR,
	NOTE_LABEL_SELECTOR,
	NOTE_TITLE_SELECTOR,
	NOTE_CONTENT_SELECTOR,
	NOTE_TITLE_TERM_ORIGIN,
} from "./utils/locators";
import {
	getAnnotationsData,
	getGlossaryData,
	getMarkdownLinks,
	getTermSelector,
} from "./utils/terms";
import type { ITermTestData } from "./utils/types";
import { SINGLE_WHITE_SPACE } from "./utils/patterns";

const domUtil = new StylableDOMUtil(stylesheet);

const contentSelector = domUtil.scopeSelector(NOTE_CONTENT_SELECTOR);
const labelSelector = domUtil.scopeSelector(NOTE_LABEL_SELECTOR);
const titleSelector = domUtil.scopeSelector(NOTE_TITLE_SELECTOR);
const termSelector = domUtil.scopeSelector(NOTE_TITLE_TERM_ORIGIN);

function validateStringTranslation(str: string) {
	const indexRegExp = "^.{0}[%]";
	const firstChar = new RegExp(indexRegExp);
	const lastChar = new RegExp(indexRegExp.replace("{0}", `{${str.length - 1}}`));
	return expect(
		firstChar.test(str) && lastChar.test(str),
		"Non-English glossary entries should be properply translated to English"
	)

}

test.describe("Codex", () => {
	locales.map((locale) => {
		const { content } = getFrontMatter("codex/index", locale);
		const codexTerms = getMarkdownLinks(content as string, "glossary");
		const terms = getGlossaryData(locale);
		return codexTerms.map((key: string) => {
			const { term_key, content } = terms.filter(
				(t: ITermTestData) => t.key === key
			)[0];

			return test.only(`${locale} > should open glossary: ${key}`, async ({
				page,
			}) => {
				await page.goto(getLocalePath(locale));
				await page
					.locator(getTermSelector({ type: "glossary", key }))
					.first()
					.click();
				await page.$$(PORTAL_SELECTOR);

				const glossaryLabel = await page.locator(labelSelector).textContent();
				validateStringTranslation(glossaryLabel).toBeFalsy();
				expect(glossaryLabel).toEqual(translate(locale, "NOTE_LABEL_GLOSSARY"));

				await expect(page.locator(titleSelector)).toHaveText(
					translate(locale, term_key as string)
				);

				if (locale !== "en") {
					const originTerm = translate("en", term_key as string);
					const translatedTerm = await page.locator(termSelector).textContent();

					validateStringTranslation(translatedTerm).toBeFalsy();

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
			});
		});
	});

	locales.map((locale) => {
		const { content } = getFrontMatter("codex/index", locale);
		const codexTerms = getMarkdownLinks(content as string, "annotations");
		const terms = getAnnotationsData(locale);
		return codexTerms.map((key: string) => {
			return test(`${locale} > should open annotation: ${key}`, async ({
				page,
			}) => {
				await page.goto(getLocalePath(locale));
				await page
					.locator(getTermSelector({ type: "annotation", key }))
					.first()
					.click();
				await page.$$(PORTAL_SELECTOR);

				const textContent = await page.locator(contentSelector).textContent();

				expect(textContent.length, "term cannot be empty").toBeGreaterThan(0);
				expect(
					textContent.split(SINGLE_WHITE_SPACE).length,
					"minimum words per term"
				).toBeGreaterThan(0);

				const { content } = terms.filter(
					(t: ITermTestData) => t.key === key
				)[0];
				const raw = stripMarkdown(content as string);
				const sample = stripMarkdown(
					await page.locator(contentSelector).textContent()
				);

				expect(
					sample.length,
					"sanitized content samples should have equal length"
				).toEqual(sample.length);

				expect(sample, "term content should be equal to source").toEqual(raw);
			});
		});
	});
});
