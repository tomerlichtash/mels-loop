// import { test, expect } from "@playwright/test";
// import {
// 	getLocalePath,
// 	locales,
// 	stripMarkdown,
// 	translate,
// } from "../utils/test-utils";
// import {
// 	PORTAL_SELECTOR,
// 	NOTE_LABEL_SELECTOR,
// 	NOTE_TITLE_SELECTOR,
// 	NOTE_CONTENT_SELECTOR,
// } from "../utils/locators";
// import { TEXT_NOT_EMPTY } from "../utils/validators";
// import { getGlossaryData, getTermSelector } from "../utils/terms";
// import type { ITermTestData } from "../utils/types";

// test.describe.skip("Glossary", () => {
// 	locales.map((locale) => {
// 		const terms = getGlossaryData(locale);

// 		terms.map((term: ITermTestData) => {
// 			const { key, content } = term;
// 			test(`${locale} > should open term: ${key}`, async ({ page }) => {
// 				await page.goto(getLocalePath(locale));
// 				await page
// 					.locator(getTermSelector({ type: "glossary", key }))
// 					.first()
// 					.click();
// 				await page.$$(PORTAL_SELECTOR);

// 				const { term_key } = term;

// 				await expect(page.locator(NOTE_LABEL_SELECTOR)).toHaveText(
// 					translate(locale, "NOTE_LABEL_GLOSSARY")
// 				);
// 				await expect(page.locator(NOTE_TITLE_SELECTOR)).toHaveText(
// 					translate(locale, term_key)
// 				);
// 				await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
// 					TEXT_NOT_EMPTY
// 				);
// 				await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
// 					stripMarkdown(content)
// 				);
// 			});
// 		});
// 	});
// });
