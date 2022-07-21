import { test, expect } from "@playwright/test";
import { _translate } from "../src/locales/translate";
import { Languages } from "../src/locales";
// import { ILocaleKeys } from "../src/locales/languages/types/common";

export interface ITermTestData {
	type: "glossary" | "annotation";
	key: string;
	term_key?: string;
}

const annotationsData = require("./mock/terms-annotations.json");
const glossaryData = require("./mock/terms-glossary.json");

const TEXT_NOT_EMPTY = /^$|\s+/;
const PORTAL_SELECTOR = `[data-radix-portal]`;
const NOTE_CONTENT_SELECTOR = `[data-test-id="note_contents"]`;
const NOTE_LABEL_SELECTOR = `[data-test-id="note_label"]`;
const NOTE_TITLE_SELECTOR = `[data-test-id="note_title"]`;
const GLOSSARY_LABEL_KEY = "NOTE_LABEL_GLOSSARY";

const getAnnotationSelector = ({ type, key }: ITermTestData) =>
	`[data-test-annotation-type="${type}"][data-test-target="${key}"]`;

test.describe.configure({ mode: "parallel" });

/**
 * Open a specific annotation term in English
 */
test("[en] should open a specific Annotation Term", async ({ page }) => {
	// const translate = _translate("en", Languages);
	await page.goto("http://localhost:3000/");
	await page
		.locator(`[data-test-annotation-type="annotation"][data-test-seq="2"]`)
		.first()
		.click();
	await page.$$(PORTAL_SELECTOR);
	await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(TEXT_NOT_EMPTY);
});

/**
 * Open a specific annotation term in Hebrew
 */
test("[he] should open a specific Annotation Term", async ({ page }) => {
	// const translate = _translate("he", Languages);
	await page.goto("http://localhost:3000/he");
	await page
		.locator(`[data-test-annotation-type="annotation"][data-test-seq="2"]`)
		.first()
		.click();
	await page.$$(PORTAL_SELECTOR);
	await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(TEXT_NOT_EMPTY);
});

annotationsData.map((term: ITermTestData) => {
	const { type, key } = term;
	// const translate = _translate("en", Languages);
	test(`[en] should open ${type} "${key}"`, async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page.locator(getAnnotationSelector({ type, key })).first().click();
		await page.$$(PORTAL_SELECTOR);
		await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
			TEXT_NOT_EMPTY
		);
	});
});

annotationsData.map((term: ITermTestData) => {
	const { type, key } = term;
	test(`[he] should open ${type} "${key}"`, async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page.locator(getAnnotationSelector({ type, key })).first().click();
		await page.$$(PORTAL_SELECTOR);
		await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
			TEXT_NOT_EMPTY
		);
	});
});

glossaryData.map((term: ITermTestData) => {
	const { type, key } = term;
	const translate = _translate("en", Languages);
	test(`[en] should open ${type} "${key}"`, async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page.locator(getAnnotationSelector({ type, key })).first().click();
		await page.$$(PORTAL_SELECTOR);
		const { term_key } = term;
		await expect(page.locator(NOTE_LABEL_SELECTOR)).toHaveText(
			translate(GLOSSARY_LABEL_KEY)
		);
		await expect(page.locator(NOTE_TITLE_SELECTOR)).toHaveText(
			translate(term_key)
		);
	});
});

glossaryData.map((term: ITermTestData) => {
	const { type, key } = term;
	const translate = _translate("he", Languages);
	test(`[he] should open ${type} "${key}"`, async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page.locator(getAnnotationSelector({ type, key })).first().click();
		await page.$$(PORTAL_SELECTOR);
		const { term_key } = term;
		await expect(page.locator(NOTE_LABEL_SELECTOR)).toHaveText(
			translate(GLOSSARY_LABEL_KEY)
		);
		await expect(page.locator(NOTE_TITLE_SELECTOR)).toHaveText(
			translate(term_key)
		);
	});
});

/**
 * Iterate all terms in Hebrew
annotationsData.map((term: ITermTestData) => {
	const { type, key } = term;
	const translate = _translate("he", Languages);
	test(`should open ${type} "${key}" [he]`, async ({ page }) => {
		await page.goto("http://localhost:3000/he");
		await page.locator(getAnnotationSelector({ type, key })).first().click();
		await page.$$(PORTAL_SELECTOR);
		switch (type) {
			case "annotation":
				await expect(page.locator(NOTE_CONTENT_SELECTOR)).toHaveText(
					TEXT_NOT_EMPTY
				);
				break;
			case "glossary":
				const { term_key } = term;
				await expect(page.locator(`[data-test-id="note_label"]`)).toHaveText(
					translate(GLOSSARY_LABEL_KEY)
				);
				await expect(page.locator(NOTE_TITLE_SELECTOR)).toHaveText(
					translate(term_key)
				);
				break;
		}
	});
});
 */
