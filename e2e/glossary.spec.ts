import { test, expect } from "@playwright/test";
import { _translate } from "../src/locales/translate";
import { Languages } from "../src/locales";
import { getAnnotationSelector } from "./utils/test-utils";
import {
	PORTAL_SELECTOR,
	NOTE_LABEL_SELECTOR,
	NOTE_TITLE_SELECTOR,
} from "./utils/locators";
import { getGlossaryData } from "./utils/terms";
import type { ITermTestData } from "./utils/types";

export const GLOSSARY_LABEL_KEY = "NOTE_LABEL_GLOSSARY";

const glossaryData = getGlossaryData();

test.describe.configure({ mode: "parallel" });

test.describe("Glossary", () => {
	glossaryData.map((term: ITermTestData) => {
		const { type, key } = term;
		const translate = _translate("en", Languages);
		test(`[en] should open ${type} "${key}"`, async ({ page }) => {
			await page.goto("http://localhost:3000/");
			await page.locator(getAnnotationSelector({ type, key })).first().click();
			await page.$$(PORTAL_SELECTOR);
			const { term_key } = term;
			await expect(page.locator(NOTE_LABEL_SELECTOR)).toHaveText(
				translate(GLOSSARY_LABEL_KEY)
			);
			await expect(page.locator(NOTE_TITLE_SELECTOR)).toHaveText(
				translate(term_key)
			);
		});
	});

	glossaryData.map((term: ITermTestData) => {
		const { type, key } = term;
		const translate = _translate("he", Languages);
		test(`[he] should open ${type} "${key}"`, async ({ page }) => {
			await page.goto("http://localhost:3000/he");
			await page.locator(getAnnotationSelector({ type, key })).first().click();
			await page.$$(PORTAL_SELECTOR);
			const { term_key } = term;
			await expect(page.locator(NOTE_LABEL_SELECTOR)).toHaveText(
				translate(GLOSSARY_LABEL_KEY)
			);
			await expect(page.locator(NOTE_TITLE_SELECTOR)).toHaveText(
				translate(term_key)
			);
		});
	});
});
