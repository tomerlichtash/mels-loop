import { test, expect } from "@playwright/test";
import { LayoutTestDriver, ILayoutDriver } from "./drivers/layout-test-driver";
import {
	ILocaleSelectorTestDriver,
	LocaleSelectorTestDriver,
} from "./drivers/locale-selector-test-driver";
import { translateFunc } from "../src/locales/translate";

const EN_ID = "en";
const HE_ID = "he";
const SITE_TITLE_EN = translateFunc(EN_ID)("SITE_TITLE");
const SITE_TITLE_HE = translateFunc(HE_ID)("SITE_TITLE");

let localeSelector: ILocaleSelectorTestDriver;
let layout: ILayoutDriver;

test.describe("LocaleSelector", () => {
	test.beforeEach(async ({ page }) => {
		localeSelector = new LocaleSelectorTestDriver(page);
		layout = new LayoutTestDriver(page);
	});

	test("should start in English locale", async () => {
		await layout.gotoRootDir();
		expect(await layout.getSiteTitle).toEqual(SITE_TITLE_EN);
	});

	// test("should have selected English on load", async ({ page }) => {
	// 	await page.goto(ROOT_DIR);
	// 	expect(await localeSelectorDriver.getSelectedOption).toEqual("English");
	// });

	test("should start in Hebrew locale", async () => {
		await layout.gotoRootDirLocale(HE_ID);
		expect(await layout.getSiteTitle).toEqual(SITE_TITLE_HE);
	});

	test("should switch locale to Hebrew", async () => {
		await layout.gotoRootDirLocale(EN_ID);
		expect(await layout.getSiteTitle).toEqual(SITE_TITLE_EN);

		await localeSelector.dropdown.openDropdown();
		await localeSelector.dropdown.selectOption(HE_ID);
		expect(await layout.getSiteTitle).toEqual(SITE_TITLE_HE);
	});

	test("should switch locale to English", async () => {
		await layout.gotoRootDirLocale(HE_ID);
		expect(await layout.getSiteTitle).toEqual(SITE_TITLE_HE);

		await localeSelector.dropdown.openDropdown();
		await localeSelector.dropdown.selectOption(EN_ID);
		expect(await layout.getSiteTitle).toEqual(SITE_TITLE_EN);
	});
});
