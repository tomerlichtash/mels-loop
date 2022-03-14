import { test, expect } from "@playwright/test";

test("should navigate to the about page", async ({ page }) => {
	// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("/");
	// Find an element with the text 'About Page' and click on it
	await page.click("text=About");
	// The new url should be "/about" (baseURL is used there)
	await expect(page).toHaveURL("/about");
	// The new page should contain an h1 with "About Page"
	await expect(page.locator("h1")).toContainText("About Mel's Loop Project");
});
