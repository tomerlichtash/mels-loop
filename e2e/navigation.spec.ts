import { test, expect } from "@playwright/test";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import * as stylesheet from "../src/components/top-bar/top-bar.st.css";
import * as headerStylesheet from "../src/components/header/header.st.css";
import {
	getLocalePath,
	locales,
	getFrontMatter,
	translate,
} from "./utils/test-utils";

const domUtil = new StylableDOMUtil(stylesheet);
const headerDomUtil = new StylableDOMUtil(headerStylesheet);

const topBar = domUtil.scopeSelector(".root");
const siteTitle = headerDomUtil.scopeSelector(".siteTitle");

test.describe("TopBar Navigation", () => {
	locales.map((locale) => {
		test(`${locale} > should navigate to Homepage from Site Name button`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale, "about"));
			await page.locator(`${topBar} ${siteTitle}`).click();
			await expect(page).toHaveURL(getLocalePath(locale));
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
