import { test, expect } from "@playwright/test";
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
		test(`${locale} > should navigate to the contact page`, async ({
			page,
		}) => {
			const path = "contact";

			await page.goto(getLocalePath(locale));
			await page.hover(
				`text=${translate(locale, "MENU_ITEM_LABEL_ID_CONTACT")}`
			);
			await page.click(
				`text=${translate(locale, "MENU_ITEM_DESC_ID_CONTACT")}`
			);

			await expect(page).toHaveURL(getLocalePath(locale, path));
			await expect(page.locator("h1")).toHaveText(
				translate(locale, "CONTACT_PAGE_TITLE")
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
			await page.click(`text=${translate(locale, "MENU_ITEM_LABEL_ID_ABOUT")}`);

			await expect(page).toHaveURL(localePath);
			await expect(page.locator("h1")).toHaveText(data.title as string);
		});

		test(`${locale} > should navigate to the About page from Learn More link`, async ({
			page,
		}) => {
			const path = "about";
			const filename = "index";
			const { data } = getFrontMatter(`${path}/${filename}`, locale);
			const localePath = getLocalePath(locale, path);

			await page.goto(localePath);
			await page.hover(`text=${translate(locale, "MENU_ITEM_LABEL_ID_ABOUT")}`);
			await page.click(
				`text=${translate(locale, "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE")}`
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
			const localePath = getLocalePath(locale, path);

			await page.goto(localePath);
			await page.hover(
				`text=${translate(locale, "MENU_SECTION_LABEL_ARTICLES")}`
			);
			await page.click(
				`text=${translate(locale, "MENU_ITEM_LABEL_ID_RESOURCES")}`
			);

			await expect(page).toHaveURL(localePath);
			await expect(page.locator("h1")).toHaveText(data.title as string);
		});
	});
});
