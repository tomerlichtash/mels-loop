import { test, expect } from "@playwright/test";

const getLocaleSelector = (page) => {
	return page.locator(`.locator-locale-select`).first();
};

const getLocaleOption = (page, id: string) => {
	return page.locator(`.locator-option-id-${id}`);
};

const openLocaleSelector = (page) => {
	return getLocaleSelector(page).click();
};

const getSiteTitle = (page) => {
	return page.locator(`.locator-site-title`).first();
};

test.describe("LocaleSelector", () => {
	test("should switch locale to Hebrew", async ({ page }) => {
		await page.goto("/");
		openLocaleSelector(page);
		const opts = getLocaleOption(page, "he").first();
		await opts.click();
		const siteTitle = await getSiteTitle(page).innerText();
		expect(siteTitle).toEqual("לולאת מל");
	});

	test("should switch locale to English", async ({ page }) => {
		await page.goto("/");

		openLocaleSelector(page);
		const opts = getLocaleOption(page, "he").first();
		await opts.click();

		openLocaleSelector(page);
		const opts2 = getLocaleOption(page, "en").first();
		await opts2.click();

		const siteTitle = await getSiteTitle(page).innerText();
		expect(siteTitle).toEqual("Mel's Loop");
	});
});
