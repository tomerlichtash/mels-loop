import { test, expect } from "@playwright/test";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import * as stylesheet from "../../src/components/locale-selector/locale-selector.st.css";
// import {
// 	TOPBAR_MENU_LOCALE_SELECTOR_EN,
// 	TOPBAR_MENU_LOCALE_SELECTOR_HE,
// } from "./utils/locators";

const domUtil = new StylableDOMUtil(stylesheet);

test.describe("Locale Selector", () => {
	// TODO: validate selected lang
	test("should switch language to LTR", async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page.click(domUtil.scopeSelector(`.button:locale(en)`));
		await expect(page).toHaveURL("http://localhost:3000");
		await expect(page.locator("h1")).toHaveText("The Story of Mel");
	});

	test("[en] should not navigate to same language", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page.click(domUtil.scopeSelector(`.button:locale(en)`));
		await expect(page).toHaveURL("http://localhost:3000/");
		await expect(page.locator("h1")).toHaveText("The Story of Mel");
	});

	test("should switch language to RTL", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page.click(domUtil.scopeSelector(`.button:locale(he)`));
		await expect(page).toHaveURL("http://localhost:3000/he");
		await expect(page.locator("h1")).toHaveText("הסיפור על מל");
	});

	test("[he] should not navigate to same language", async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page.click(domUtil.scopeSelector(`.button:locale(he)`));
		await expect(page).toHaveURL("http://localhost:3000/he");
		await expect(page.locator("h1")).toHaveText("הסיפור על מל");
	});
});
