import { test, expect } from "@playwright/test";

test.describe("Locale Selector", () => {
	test("should switch language to RTL", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page.click(`[data-test-id="Button_LocaleSelector_he"]`);
		await expect(page).toHaveURL("http://localhost:3000/he");
		await expect(page.locator("h1")).toHaveText("הסיפור על מל");
	});

	test("should switch language to LTR", async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page.click(`[data-test-id="Button_LocaleSelector_en"]`);
		await expect(page).toHaveURL("http://localhost:3000");
		await expect(page.locator("h1")).toHaveText("The Story of Mel");
	});

	test("[en] should not navigate to same language", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page.click(`[data-test-id="Button_LocaleSelector_en"]`);
		await expect(page).toHaveURL("http://localhost:3000/");
		await expect(page.locator("h1")).toHaveText("The Story of Mel");
	});

	test("[he] should not navigate to same language", async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page.click(`[data-test-id="Button_LocaleSelector_he"]`);
		await expect(page).toHaveURL("http://localhost:3000/he");
		await expect(page.locator("h1")).toHaveText("הסיפור על מל");
	});
});
