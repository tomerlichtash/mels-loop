import { test, expect } from "@playwright/test";
import {
	getLocalePath,
	locales,
	sanitizeContent,
	translate,
} from "./utils/test-utils";
import {
	PORTAL_SELECTOR,
	NOTE_LABEL_SELECTOR,
	NOTE_TITLE_SELECTOR,
	NOTE_CONTENT_SELECTOR,
} from "./utils/locators";
import {
	getAnnotationsData,
	getGlossaryData,
	getMarkdownLinks,
	getTermSelector,
} from "./utils/terms";
import type { ITermTestData } from "./utils/types";

test.describe("Codex", () => {
	const delim = "glossary";
	locales.map((locale) => {
		const codexTerms = getMarkdownLinks("codex/index", delim, locale);
		const terms = getGlossaryData(locale);
		return codexTerms.map((key: string) => {
			const { term_key, content } = terms.filter(
				(t: ITermTestData) => t.key === key
			)[0];

			return test(`${locale} > should open glossary: ${key}`, async ({
				page,
			}) => {
				await page.goto(getLocalePath(locale));
				await page
					.locator(getTermSelector({ type: delim, key }))
					.first()
					.click();
				await page.$$(PORTAL_SELECTOR);

				await expect(page.locator(NOTE_LABEL_SELECTOR)).toHaveText(
					translate(locale, "NOTE_LABEL_GLOSSARY")
				);
				await expect(page.locator(NOTE_TITLE_SELECTOR)).toHaveText(
					translate(locale, term_key as string)
				);

				const textContent = await page
					.locator(NOTE_CONTENT_SELECTOR)
					.textContent();

				expect(textContent.length, "term cannot be empty").toBeGreaterThan(0);
				expect(
					textContent.split(" ").length,
					"minimum words per term"
				).toBeGreaterThan(0);

				const sanitizedContent = sanitizeContent(content as string);

				await expect(
					page.locator(NOTE_CONTENT_SELECTOR),
					"term content equal to source"
				).toHaveText(sanitizedContent);
			});
		});
	});

	locales.map((locale) => {
		const delim = "annotations";
		const codexTerms = getMarkdownLinks("codex/index", delim, locale);
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

				const textContent = await page
					.locator(NOTE_CONTENT_SELECTOR)
					.textContent();

				expect(textContent.length, "term cannot be empty").toBeGreaterThan(0);
				expect(
					textContent.split(" ").length,
					"minimum words per term"
				).toBeGreaterThan(0);

				const { content } = terms.filter(
					(t: ITermTestData) => t.key === key
				)[0];
				const sanitizedRawContent = sanitizeContent(content as string);
				const sanitizedTextContent = sanitizeContent(
					await page.locator(NOTE_CONTENT_SELECTOR).textContent()
				);

				expect(
					sanitizedTextContent,
					"term content should be equal to source"
				).toEqual(sanitizedRawContent);
			});
		});
	});
});
