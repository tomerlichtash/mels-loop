import { test, expect } from "@playwright/test";

const REAL_PROGRAMMER_CONTNTETS_EN = `Slang term for a subculture in hacker culture. For the "Real Programmer", the challenge lies in the complexity of a problem, the elegance of the solution, and its efficiency. The product and its users are secondary, if considered at all.`;

test("should open first glossary term", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page
		.locator(`[data-test-type="glossary"][data-test-seq="1"]`)
		.first()
		.click();
	await page.$$(`[data-radix-portal]`);
	await expect(page.locator(`[data-test-id="note_label"]`)).toHaveText(
		"Glossary"
	);
	await expect(page.locator(`[data-test-id="note_contents"]`)).toContainText(
		REAL_PROGRAMMER_CONTNTETS_EN
	);
});

test("should open a specific Glossary Term in English", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.locator(`[data-test-target="real-programmer"]`).first().click();
	await page.$$(`[data-radix-portal]`);
	await expect(page.locator(`[data-test-id="note_label"]`)).toHaveText(
		"Glossary"
	);
	await expect(page.locator(`[data-test-id="note_title"]`)).toHaveText(
		"Real Programmer"
	);
	await expect(page.locator(`[data-test-id="note_contents"]`)).toContainText(
		REAL_PROGRAMMER_CONTNTETS_EN
	);
});

test("should open a specific Glossary Term in Hebrew", async ({ page }) => {
	await page.goto("http://localhost:3000/he");
	await page.locator(`[data-test-target="real-programmer"]`).first().click();
	await page.$$(`[data-radix-portal]`);
	await expect(page.locator(`[data-test-id="note_label"]`)).toHaveText(
		"מילון מונחים"
	);
	await expect(page.locator(`[data-test-id="note_title"]`)).toHaveText(
		"מתכנת/ת אמיתי/ת"
	);
	await expect(page.locator(`[data-test-id="note_term"]`)).toHaveText(
		"Real Programmer"
	);
	await expect(page.locator(`[data-test-id="note_contents"]`)).toContainText(
		`סלנג`
	);
});
