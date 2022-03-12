import { test, expect } from "@playwright/test";
import { LayoutTestDriver, ILayoutDriver } from "./drivers/layout-driver";
import {
	ILocaleSelectorTestDriver,
	LocaleSelectorTestDriver,
} from "./drivers/locale-selector-driver";

const ENGLISH_LOCALE_ID = "en";
const HEBREW_LOCALE_ID = "he";

const ROOT_DIR = "/";
const ROOT_ENGLISH_LOCALE = `/${ENGLISH_LOCALE_ID}`;
const ROOT_HEBREW_LOCALE = `/${HEBREW_LOCALE_ID}`;

let localeSelectorDriver: ILocaleSelectorTestDriver;
let layoutDriver: ILayoutDriver;

test.describe("LocaleSelector", () => {
	test.beforeEach(async ({ page }) => {
		localeSelectorDriver = new LocaleSelectorTestDriver(page);
		layoutDriver = new LayoutTestDriver(page);
	});

	test("should start in English locale", async ({ page }) => {
		await page.goto(ROOT_DIR);
		expect(await layoutDriver.getSiteTitle()).toEqual("Mel's Loop");
	});

	test("should start in Hebrew locale", async ({ page }) => {
		await page.goto(ROOT_HEBREW_LOCALE);
		expect(await layoutDriver.getSiteTitle()).toEqual("לולאת מל");
	});

	test("should switch locale to Hebrew", async ({ page }) => {
		await page.goto(ROOT_ENGLISH_LOCALE);
		expect(await layoutDriver.getSiteTitle()).toEqual("Mel's Loop");

		localeSelectorDriver.openLocaleSelector();
		await localeSelectorDriver.selectOption(HEBREW_LOCALE_ID);
		expect(await layoutDriver.getSiteTitle()).toEqual("לולאת מל");
	});

	test("should switch locale to English", async ({ page }) => {
		await page.goto(ROOT_HEBREW_LOCALE);
		expect(await layoutDriver.getSiteTitle()).toEqual("לולאת מל");

		localeSelectorDriver.openLocaleSelector();
		await localeSelectorDriver.selectOption(ENGLISH_LOCALE_ID);
		expect(await layoutDriver.getSiteTitle()).toEqual("Mel's Loop");
	});
});
