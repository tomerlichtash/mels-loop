import { test, expect } from "@playwright/test";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import * as stylesheet from "../src/components/mobile-menu/mobile-menu.st.css";
import * as headerStylesheet from "../src/components/header/header.st.css";
import { LocaleSymbols } from "./../src/locales/languages/common/locale_common";
import {
	getLocalePath,
	locales,
	getFrontMatter,
	translate,
} from "./utils/test-utils";

const { LOCALE_LABEL_EN, LOCALE_LABEL_HE } = LocaleSymbols;
export const MOBILE_MENU_TRIGGER = `.bm-burger-button`;

const domUtil = new StylableDOMUtil(stylesheet);
const headerDomUtil = new StylableDOMUtil(headerStylesheet);

const mobileMenu = domUtil.scopeSelector(".root");
const siteTitle = headerDomUtil.scopeSelector(".siteTitle");

test.describe.skip("Mobile Menu", () => {
	test.describe("TopBar Navigation", () => {
		locales.map((locale) => {
			test(`${locale} > should navigate to Homepage from Mobile Menu Site Name button`, async ({
				page,
			}) => {
				await page.goto(getLocalePath(locale, "about"));
				await page.locator(MOBILE_MENU_TRIGGER).click();
				await page.locator(`${mobileMenu} ${siteTitle}`).click();
				await expect(page).toHaveURL(getLocalePath(locale));
			});
		});
	});

	test.describe("Locale Selector", () => {
		// TODO: validate selected lang

		test("should switch language to LTR", async ({ page }) => {
			await page.goto("http://localhost:3000/he");
			await page.click(MOBILE_MENU_TRIGGER);
			await page
				.locator(
					`${domUtil.scopeSelector(".localeSelector")} [type="button"]`,
					{
						hasText: LOCALE_LABEL_EN,
					}
				)
				.click();
			await expect(page).toHaveURL("http://localhost:3000");
			await expect(page.locator("h1")).toHaveText("The Story of Mel");
		});

		test("[en] should not navigate to same language", async ({ page }) => {
			await page.goto("http://localhost:3000/");
			await page.click(MOBILE_MENU_TRIGGER);
			await page
				.locator(domUtil.scopeSelector(".localeSelector"), {
					hasText: LOCALE_LABEL_EN,
				})
				.click();
			await expect(page).toHaveURL("http://localhost:3000/");
			await expect(page.locator("h1")).toHaveText("The Story of Mel");
		});

		test("should switch language to RTL", async ({ page }) => {
			await page.goto("http://localhost:3000/");
			await page.click(MOBILE_MENU_TRIGGER);
			await page
				.locator(
					`${mobileMenu} ${domUtil.scopeSelector(
						".localeSelector"
					)} [type="button"]`,
					{
						hasText: LOCALE_LABEL_HE,
					}
				)
				.click();
			await expect(page).toHaveURL("http://localhost:3000/he");
			await expect(page.locator("h1")).toHaveText("הסיפור על מל");
		});

		test("[he] should not navigate to same language", async ({ page }) => {
			await page.goto("http://localhost:3000/he");
			await page.click(MOBILE_MENU_TRIGGER);
			await page
				.locator(`${mobileMenu} ${domUtil.scopeSelector(".localeSelector")}`, {
					hasText: LOCALE_LABEL_HE,
				})
				.click();
			await expect(page).toHaveURL("http://localhost:3000/he");
			await expect(page.locator("h1")).toHaveText("הסיפור על מל");
		});
	});

	test.describe("Static Pages", () => {
		locales.map((locale) => {
			test(`${locale} > should navigate to Contact page`, async ({ page }) => {
				// const buttonTitle = translate(locale, "MENU_ITEM_LABEL_ID_CONTACT");
				const selector = domUtil.scopeSelector(`.menuItemButton:id(contact)`);

				await page.goto(getLocalePath(locale));
				await page.click(MOBILE_MENU_TRIGGER);

				await page.locator(selector).click();

				await expect(page).toHaveURL(getLocalePath(locale, "contact"));
				// await expect(page.locator("h1")).toHaveText(buttonTitle);
			});

			test(`${locale} > should navigate to Blog page`, async ({ page }) => {
				await page.goto(getLocalePath(locale));
				await page.click(MOBILE_MENU_TRIGGER);

				await page.click(
					`${mobileMenu} ${domUtil.scopeSelector(`.menuItemButton:id(blog)`)}`
				);

				await expect(page).toHaveURL(getLocalePath(locale, "posts"));
				await expect(page.locator("h1")).toHaveText(
					translate(locale, "SECTION_LABEL_POSTS")
				);
			});
		});
	});

	test.describe("Dynamic Pages", () => {
		locales.map((locale) => {
			test(`${locale} > should navigate to the About page`, async ({
				page,
			}) => {
				const id = "about";
				const filename = "index";
				const { data } = getFrontMatter(`${id}/${filename}`, locale);
				const localePath = getLocalePath(locale, id);

				await page.goto(localePath);
				await page.click(MOBILE_MENU_TRIGGER);

				await page.click(
					domUtil.scopeSelector(
						`${mobileMenu} .menuItemButton:id(about-mobile)`
					)
				);

				await expect(page).toHaveURL(localePath);
				await expect(page.locator("h1")).toHaveText(data.title as string);
			});

			test(`${locale} > should navigate to the Resources page`, async ({
				page,
			}) => {
				const path = "docs/resources";
				const filename = "index";
				const { data } = getFrontMatter(`${path}/${filename}`, locale);
				const localePath = getLocalePath(locale);

				await page.goto(localePath);
				await page.click(MOBILE_MENU_TRIGGER);

				await page.click(
					domUtil.scopeSelector(`.menuItemButton:id(resources)`)
				);

				await expect(page).toHaveURL(getLocalePath(locale, path));
				await expect(page.locator("h1")).toHaveText(data.title as string);
			});
		});
	});
});
