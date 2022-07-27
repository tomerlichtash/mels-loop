import { test, expect } from "@playwright/test";
import {
	TOPBAR_MENU_LOCALE_SELECTOR_EN,
	TOPBAR_MENU_LOCALE_SELECTOR_HE,
} from "./utils/locators";

import { StylableDOMUtil } from "@stylable/dom-test-kit";
import * as stylesheet from "./../src/components/locale-selector/locale-selector.st.css";
// const domUtil = new StylableDOMUtil(stylesheet, document.body);
// const partElement = domUtil.select(".button");

// console.log(stylesheet);

test.describe("Locale Selector", () => {
	// TODO: validate selected lang

	test.only("should switch language to LTR", async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page.click(TOPBAR_MENU_LOCALE_SELECTOR_EN);
		await expect(page).toHaveURL("http://localhost:3000");
		await expect(page.locator("h1")).toHaveText("The Story of Mel");
	});

	test("[en] should not navigate to same language", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page.click(TOPBAR_MENU_LOCALE_SELECTOR_EN);
		await expect(page).toHaveURL("http://localhost:3000/");
		await expect(page.locator("h1")).toHaveText("The Story of Mel");
	});

	test("should switch language to RTL", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page.click(TOPBAR_MENU_LOCALE_SELECTOR_HE);
		await expect(page).toHaveURL("http://localhost:3000/he");
		await expect(page.locator("h1")).toHaveText("הסיפור על מל");
	});

	test("[he] should not navigate to same language", async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page.click(TOPBAR_MENU_LOCALE_SELECTOR_HE);
		await expect(page).toHaveURL("http://localhost:3000/he");
		await expect(page.locator("h1")).toHaveText("הסיפור על מל");
	});
});
