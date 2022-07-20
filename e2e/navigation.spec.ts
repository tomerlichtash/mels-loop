import { test, expect } from "@playwright/test";

test("should navigate home from site name in top bar", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.click("text=About");
	await expect(page).toHaveURL("http://localhost:3000/about");
	await page.locator(`[data-test-id="site_name"]`).click();
	await expect(page).toHaveURL("http://localhost:3000");
});

test("should navigate to the about page", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.click("text=About");
	await expect(page).toHaveURL("http://localhost:3000/about");
	await expect(page.locator("h1")).toHaveText("About Mel's Loop Project");
});

test("should navigate to the contact page", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.hover("text=Contact");
	await page.click("text=Drop us a line");
	await expect(page).toHaveURL("http://localhost:3000/contact");
	await expect(page.locator("h1")).toHaveText("Contact Us");
});

test("should navigate to the resources page", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.hover("text=Articles");
	await page.click("text=Resources");
	await expect(page).toHaveURL("http://localhost:3000/docs/resources");
	await expect(page.locator("h1")).toHaveText("Resources");
});

test("should navigate to the preface page", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.hover("text=Articles");
	await page.click("text=Preface");
	await expect(page).toHaveURL("http://localhost:3000/docs/preface");
	await expect(page.locator("h1")).toHaveText(
		"A Software Legend That Really Happened"
	);
});
