import { test, expect } from "@playwright/test";
import { Page, Locator } from "playwright-core"

class LocaleSelectorDriver {
	public page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public async goto(path: string) {
		await this.page.goto("/");
	}

	public getLocaleSelector(): Locator {
		return this.page.locator(`.locator-locale-select`).first();
	}

	public openLocaleSelector() {
		this.getLocaleSelector().click()
	};

	public getLocaleOption(id: string): Locator {
		return this.page.locator(`.locator-option-id-${id}`).first();
	}

	public async selectOption(id: string) {
		await this.getLocaleOption(id).click()
	};

	public getSiteTitle(): Locator {
		return this.page.locator(`.locator-site-title`);
	};
}

test.describe("LocaleSelector", () => {
	test.only("should switch locale to Hebrew", async ({ page }) => {
		const driver = new LocaleSelectorDriver(page);
		await page.goto("/");

		driver.openLocaleSelector();
		driver.selectOption("he");

		// const siteTitle = driver.getSiteTitle().first();
		const siteTitle = page.locator(`.locator-site-title`).first();
		expect(siteTitle.innerText()).toEqual("לולאת מל");
	});

	test("should switch locale to English", async ({ page }) => {
		const driver = new LocaleSelectorDriver(page);
		await page.goto("/");

		driver.openLocaleSelector();
		await driver.selectOption("he");

		driver.openLocaleSelector();
		await driver.selectOption("en");

		const siteTitle = await driver.getSiteTitle();
		expect(siteTitle).toEqual("Mel's Loop");
	});
});
