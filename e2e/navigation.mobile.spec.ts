import { test, expect } from "@playwright/test";
import {
	MOBILE_MENU_BUTTON_BURGER_ICON,
	MOBILE_MENU_BUTTON_ABOUT,
	MOBILE_MENU_BUTTON_BLOG,
	MOBILE_MENU_BUTTON_RESOURCES,
} from "./utils/locators";
import {
	getLocalePath,
	locales,
	getFrontMatter,
	translate,
} from "./utils/test-utils";

test.describe("TopBar Navigation", () => {
	locales.map((locale) => {
		test.fixme(
			`${locale} > should navigate to Homepage from Site Name button`,
			async ({ page }) => {
				const SITE_NAME_LOCATOR = `[data-test-id="site_name"]`;

				await page.goto(getLocalePath(locale, "about"));
				await page.locator(SITE_NAME_LOCATOR).click();

				await expect(page).toHaveURL(getLocalePath(locale));
				await expect(page.locator(SITE_NAME_LOCATOR)).toHaveText(
					translate(locale, "SITE_TITLE")
				);
			}
		);
	});
});

test.describe("Static Pages", () => {
	locales.map((locale) => {
		test(`${locale} > should navigate to Contact page`, async ({ page }) => {
			await page.goto(getLocalePath(locale));
			await page.click(MOBILE_MENU_BUTTON_BURGER_ICON);
			await page.click(
				`text=${translate(locale, "MENU_ITEM_DESC_ID_CONTACT")}`
			);

			await expect(page).toHaveURL(getLocalePath(locale, "contact"));
			await expect(page.locator("h1")).toHaveText(
				translate(locale, "CONTACT_PAGE_TITLE")
			);
		});

		test(`${locale} > should navigate to Blog page`, async ({ page }) => {
			await page.goto(getLocalePath(locale));
			await page.click(MOBILE_MENU_BUTTON_BURGER_ICON);
			await page.click(MOBILE_MENU_BUTTON_BLOG);

			await expect(page).toHaveURL(getLocalePath(locale, "posts"));
			await expect(page.locator("h1")).toHaveText(
				translate(locale, "SECTION_LABEL_POSTS")
			);
		});
	});
});

test.describe("Dynamic Pages", () => {
	locales.map((locale) => {
		test(`${locale} > should navigate to the About page`, async ({ page }) => {
			const path = "about";
			const filename = "index";
			const { data } = getFrontMatter(`${path}/${filename}`, locale);
			const localePath = getLocalePath(locale, path);

			await page.goto(localePath);
			await page.click(MOBILE_MENU_BUTTON_BURGER_ICON);
			await page.click(MOBILE_MENU_BUTTON_ABOUT);

			await expect(page).toHaveURL(localePath);
			await expect(page.locator("h1")).toHaveText(data.title as string);
		});

		test.fixme(
			`${locale} > should navigate to the Resources page`,
			async ({ page }) => {
				const path = "docs/resources";
				const filename = "index";
				const { data } = getFrontMatter(`${path}/${filename}`, locale);
				const localePath = getLocalePath(locale, path);

				await page.goto(localePath);
				await page.click(MOBILE_MENU_BUTTON_BURGER_ICON);
				await page.click(MOBILE_MENU_BUTTON_RESOURCES);

				await expect(page).toHaveURL(localePath);
				await expect(page.locator("h1")).toHaveText(data.title as string);
			}
		);
	});
});