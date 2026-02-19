import { test, expect } from "@playwright/test";
import { t } from "@mels-loop/test-utils/i18n";
import { locales, getLocalePath } from "@mels-loop/test-utils/locale";

for (const locale of locales) {
	test.describe(`Navigation (${locale})`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(getLocalePath(locale));
		});

		test("clicking site title navigates to homepage", async ({ page }) => {
			const siteTitle = t(locale, "siteTitle");
			await page.getByRole("link", { name: siteTitle }).first().click();
			await expect(page).toHaveURL(new RegExp(`/${locale}/?$`));
		});

		test("nav contains expected items", async ({ page }) => {
			const nav = page.getByRole("navigation");

			// Local links
			for (const key of ["nav.blog", "nav.contact"]) {
				const label = t(locale, key);
				await expect(nav.getByRole("link", { name: label })).toBeVisible();
			}

			// External links (glossary, about point to main site)
			for (const key of ["nav.glossary", "nav.about"]) {
				const label = t(locale, key);
				const link = nav.getByRole("link", { name: label });
				await expect(link).toBeVisible();
				await expect(link).toHaveAttribute("target", "_blank");
			}
		});

		test("clicking Blog navigates to posts page", async ({ page }) => {
			const blogLabel = t(locale, "nav.blog");
			await page
				.getByRole("navigation")
				.getByRole("link", { name: blogLabel })
				.click();
			await expect(page).toHaveURL(getLocalePath(locale, "/posts"));
		});

		test("clicking Contact navigates to contact page", async ({ page }) => {
			const contactLabel = t(locale, "nav.contact");
			await page
				.getByRole("navigation")
				.getByRole("link", { name: contactLabel })
				.click();
			await expect(page).toHaveURL(getLocalePath(locale, "/contact"));
		});

		test("Glossary link points to main site", async ({ page }) => {
			const glossaryLabel = t(locale, "nav.glossary");
			const link = page
				.getByRole("navigation")
				.getByRole("link", { name: glossaryLabel });
			await expect(link).toHaveAttribute("href", /melsloop\.com/);
		});

		test("About link points to main site", async ({ page }) => {
			const aboutLabel = t(locale, "nav.about");
			const link = page
				.getByRole("navigation")
				.getByRole("link", { name: aboutLabel });
			await expect(link).toHaveAttribute("href", /melsloop\.com/);
		});
	});
}
