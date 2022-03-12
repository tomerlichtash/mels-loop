import { test, expect } from "@playwright/test";
import { LayoutTestDriver, ILayoutDriver } from "./drivers/layout-driver";
import {
	ILocaleSelectorTestDriver,
	LocaleSelectorTestDriver,
} from "./drivers/locale-selector-driver";

import { translateFunc } from "../src/locales/translate";

const EN_ID = "en";
const HE_ID = "he";

const ROOT_DIR = "/";
const ROOT_DIR_EN = `${ROOT_DIR}${EN_ID}`;
const ROOT_DIR_HE = `${ROOT_DIR}${HE_ID}`;

const SITE_TITLE_EN = translateFunc(EN_ID)("SITE_TITLE");
const SITE_TITLE_HE = translateFunc(HE_ID)("SITE_TITLE");

let localeSelectorDriver: ILocaleSelectorTestDriver;
let layoutDriver: ILayoutDriver;

test.describe("LocaleSelector", () => {
	test.beforeEach(async ({ page }) => {
		localeSelectorDriver = new LocaleSelectorTestDriver(page);
		layoutDriver = new LayoutTestDriver(page);
	});

	test("should start in English locale", async ({ page }) => {
		await page.goto(ROOT_DIR);
		expect(await layoutDriver.getSiteTitle).toEqual(SITE_TITLE_EN);
	});

	test("should start in Hebrew locale", async ({ page }) => {
		await page.goto(ROOT_DIR_HE);
		expect(await layoutDriver.getSiteTitle).toEqual(SITE_TITLE_HE);
	});

	test("should switch locale to Hebrew", async ({ page }) => {
		await page.goto(ROOT_DIR_EN);
		expect(await layoutDriver.getSiteTitle).toEqual(SITE_TITLE_EN);

		localeSelectorDriver.openLocaleSelector();
		await localeSelectorDriver.selectOption(HE_ID);
		expect(await layoutDriver.getSiteTitle).toEqual(SITE_TITLE_HE);
	});

	test("should switch locale to English", async ({ page }) => {
		await page.goto(ROOT_DIR_HE);
		expect(await layoutDriver.getSiteTitle).toEqual(SITE_TITLE_HE);

		localeSelectorDriver.openLocaleSelector();
		await localeSelectorDriver.selectOption(EN_ID);
		expect(await layoutDriver.getSiteTitle).toEqual(SITE_TITLE_EN);
	});
});
