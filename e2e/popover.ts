import { test, expect } from "@playwright/test";
import { TEXT_NOT_EMPTY } from "./utils/validators";
import type { ITermTestData } from "./utils/types";

const PORTAL_SELECTOR = `[data-radix-portal]`;
const NOTE_CONTENT_SELECTOR = `[data-test-id="note_contents"]`;

const getAnnotationSelector = ({ type, key }: ITermTestData) =>
	`[data-test-annotation-type="${type}"][data-test-target="${key}"]`;

test.describe.configure({ mode: "parallel" });

test.describe("Popover", () => {
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

	test.fixme("should show error if term is not found", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page
			.locator(
				getAnnotationSelector({ type: "annotation", key: "some_unknown_key" })
			)
			.first()
			.click();
		await page.$$(PORTAL_SELECTOR);
		await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText("not found");
	});
});
