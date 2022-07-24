import { test, expect } from "@playwright/test";
import {
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
} from "./utils/locators";
import { TEXT_NOT_EMPTY } from "./utils/validators";
import {
	getGlossaryData,
	getMarkdownLinks,
	getTermSelector,
} from "./utils/terms";
import type { ITermTestData } from "./utils/types";

test.describe.skip("Glossary", () => {
	locales.map((locale) => {
		const terms = getGlossaryData(locale);
		const codexTerms = getMarkdownLinks(
			"codex/index",
			// "[^](annotations/",
			"](glossary/",
			locale
		);

		codexTerms.map((key: string) => {
			// const { key, content } = term;
			const { term_key, content } = terms.filter((t) => t.key === key);

			test.only(`${locale} > should open codex term: ${key}`, async ({
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
				await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
					TEXT_NOT_EMPTY
				);
				await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
					stripMarkdown(content as string)
				);
			});
		});

		terms.map((term: ITermTestData) => {
			const { key, content } = term;
			test(`${locale} > should open term: ${key}`, async ({ page }) => {
				await page.goto(getLocalePath(locale));
				await page
					.locator(getTermSelector({ type: "glossary", key }))
					.first()
					.click();
				await page.$$(PORTAL_SELECTOR);

				const { term_key } = term;

				await expect(page.locator(NOTE_LABEL_SELECTOR)).toHaveText(
					translate(locale, "NOTE_LABEL_GLOSSARY")
				);
				await expect(page.locator(NOTE_TITLE_SELECTOR)).toHaveText(
					translate(locale, term_key)
				);
				await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
					TEXT_NOT_EMPTY
				);
				await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
					stripMarkdown(content)
				);
			});
		});
	});
});
