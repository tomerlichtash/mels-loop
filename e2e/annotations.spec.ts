import { test, expect } from "@playwright/test";
import { getLocalePath, locales, stripMarkdown } from "./utils/test-utils";
import { PORTAL_SELECTOR, NOTE_CONTENT_SELECTOR } from "./utils/locators";
import { TEXT_NOT_EMPTY } from "./utils/validators";
import { getAnnotationsData, getTermSelector } from "./utils/terms";
import type { ITermTestData } from "./utils/types";

test.describe("Annotations", () => {
	return locales.map((locale) => {
		return getAnnotationsData(locale).map((term: ITermTestData) => {
			const { key, content } = term;
			test(`${locale} > should open term: ${key}`, async ({ page }) => {
				await page.goto(getLocalePath(locale));

				await page
					.locator(getTermSelector({ type: "annotation", key }))
					.first()
					.click();
				await page.$$(PORTAL_SELECTOR);

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
