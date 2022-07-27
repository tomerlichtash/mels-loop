import { test, expect } from "@playwright/test";
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

test.describe("Codex", () => {
	locales.map((locale) => {
		const { content } = getFrontMatter("codex/index", locale);
		const codexTerms = getMarkdownLinks(content as string, "glossary");
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
					.locator(getTermSelector({ type: "glossary", key }))
					.first()
					.click();
				await page.$$(PORTAL_SELECTOR);

				await expect(page.locator(NOTE_LABEL_SELECTOR)).toHaveText(
					translate(locale, "NOTE_LABEL_GLOSSARY")
				);

				await expect(page.locator(NOTE_TITLE_SELECTOR)).toHaveText(
					translate(locale, term_key as string)
				);

				if (locale !== "en") {
					await expect(
						page.locator(NOTE_TITLE_TERM_ORIGIN),
						"Non-English glossary entries should show original term in English"
					).toHaveText(translate("en", term_key as string));
				}

				const textContent = await page
					.locator(NOTE_CONTENT_SELECTOR)
					.textContent();

				expect(textContent.length, "term cannot be empty").toBeGreaterThan(0);
				expect(
					textContent.split(SINGLE_WHITE_SPACE).length,
					"minimum words per term"
				).toBeGreaterThan(0);

				const sanitizedContent = stripMarkdown(content as string);

				await expect(
					page.locator(NOTE_CONTENT_SELECTOR),
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

				const textContent = await page
					.locator(NOTE_CONTENT_SELECTOR)
					.textContent();

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
					await page.locator(NOTE_CONTENT_SELECTOR).textContent()
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
