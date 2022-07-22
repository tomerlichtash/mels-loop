import { test, expect } from "@playwright/test";
import {
	getLocalePath,
	locales,
	getFrontMatter,
	translate,
} from "./utils/test-utils";

test.describe("Articles", () => {
	locales.map((locale) => {
		test(`${locale} > should navigate to the Preface article`, async ({
			page,
		}) => {
			const path = "docs/preface";
			const filename = "index";
			const { data } = getFrontMatter(`${path}/${filename}`, locale);

			await page.goto(getLocalePath(locale));
			await page.hover(
				`text=${translate(locale, "MENU_SECTION_LABEL_ARTICLES")}`
			);
			await page.click(
				`text=${translate(locale, "MENU_ITEM_LABEL_ID_PREFACE")}`
			);

			await expect(page).toHaveURL(getLocalePath(locale, path));
			await expect(page.locator("h1")).toHaveText(data.title as string);
		});
	});
});
