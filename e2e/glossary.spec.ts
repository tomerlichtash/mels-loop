import { test, expect } from "@playwright/test";
import { getLocalePath, locales, translate } from "./utils/test-utils";
import {
	PORTAL_SELECTOR,
	NOTE_LABEL_SELECTOR,
	NOTE_TITLE_SELECTOR,
	NOTE_CONTENT_SELECTOR,
} from "./utils/locators";
import { getGlossaryData, getTermSelector } from "./utils/terms";
import type { ITermTestData } from "./utils/types";

const STRIP_MD = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;

test.describe("Glossary", () => {
	return locales.map((locale) => {
		return getGlossaryData(locale).map((term: ITermTestData) => {
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
					content.replace(STRIP_MD, "$1")
				);
			});
		});
	});
});
