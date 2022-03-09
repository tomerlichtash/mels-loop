import { test, expect } from "@playwright/test";

const getLocaleSelector = (page) => {
	return page.locator(".locator-locale-selector").first();
};

const getLocaleOption = (page, optionId) => {
	return page.locator("span:has-text(optionId)").first();
};

const openLocaleSelector = (page) => {
	return getLocaleSelector(page).click();
};

test.describe("LocaleSelector", () => {
	test.only("should switch locale", async ({ page }) => {
		await page.goto("/");
		openLocaleSelector(page);
		// await expect(page).toHaveURL("/story");
		expect(true).toBe(false);
	});
});
