import { test, expect } from "@playwright/test";
import {
	NOTE_CONTENT_SELECTOR,
	POPOVER_LOADING_INDICATOR,
	PORTAL_SELECTOR,
} from "./utils/locators";
import { TEXT_NOT_EMPTY } from "./utils/patterns";
import { translate } from "./utils/test-utils";

test.describe("Popover", () => {
	test.fixme(
		"should show loading animation during content fetching",
		async ({ page }) => {
			await page.goto("http://localhost:3000/");
			await page
				.locator(`[data-test-annotation-type="annotation"][data-test-seq="1"]`)
				.first()
				.click();
			await page.pause();
			await page.$$(PORTAL_SELECTOR);

			await page.$$(POPOVER_LOADING_INDICATOR);

			await expect(page.locator(POPOVER_LOADING_INDICATOR)).toHaveText(
				translate("en", "PRELOADER_LABEL")
			);
		}
	);

	// TODO: Should be a part of the API spec, not E2E
	// test.fixme("should show error if term is not found", async ({ page }) => {
	// 	await page.goto("http://localhost:3000/");
	// 	await page
	// 		.locator(
	// 			getAnnotationSelector({ type: "annotation", key: "some_unknown_key" })
	// 		)
	// 		.first()
	// 		.click();
	// 	await page.$$(PORTAL_SELECTOR);
	// 	await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText("not found");
	// });

	test("[en] should open a specific Annotation Term", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page
			.locator(`[data-test-annotation-type="annotation"][data-test-seq="2"]`)
			.first()
			.click();
		await page.$$(PORTAL_SELECTOR);
		await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
			TEXT_NOT_EMPTY
		);
	});

	test("[he] should open a specific Annotation Term", async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page
			.locator(`[data-test-annotation-type="annotation"][data-test-seq="2"]`)
			.first()
			.click();
		await page.$$(PORTAL_SELECTOR);
		await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
			TEXT_NOT_EMPTY
		);
	});
});
