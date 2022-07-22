import { test, expect } from "@playwright/test";
import { getAnnotationSelector } from "./utils/test-utils";
import { PORTAL_SELECTOR, NOTE_CONTENT_SELECTOR } from "./utils/locators";
import { TEXT_NOT_EMPTY } from "./utils/validators";
import type { ITermTestData } from "./utils/types";
import { getAnnotationsData } from "./utils/terms";

const annotationsData = getAnnotationsData();

test.describe.configure({ mode: "parallel" });

test.describe("Annotations", () => {
	annotationsData.map((term: ITermTestData) => {
		const { type, key } = term;
		test(`[en] should open ${type} "${key}"`, async ({ page }) => {
			await page.goto("http://localhost:3000/");
			await page.locator(getAnnotationSelector({ type, key })).first().click();
			await page.$$(PORTAL_SELECTOR);
			await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
				TEXT_NOT_EMPTY
			);
		});
	});

	annotationsData.map((term: ITermTestData) => {
		const { type, key } = term;
		test(`[he] should open ${type} "${key}"`, async ({ page }) => {
			await page.goto("http://localhost:3000/he");
			await page.locator(getAnnotationSelector({ type, key })).first().click();
			await page.$$(PORTAL_SELECTOR);
			await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
				TEXT_NOT_EMPTY
			);
		});
	});
});
