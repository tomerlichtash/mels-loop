import { test, expect } from "@playwright/test";

test("should navigate to the story page", async ({ page }) => {
	await page.goto("/");
	const storyLink = page.locator("nav a:has-text('The Story')");
	await storyLink.click();
	await expect(page).toHaveURL("/story");
	await expect(page.locator("h2")).toContainText("The Story of Mel");
});
