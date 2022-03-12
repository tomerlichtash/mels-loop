import { Page, Locator } from "playwright-core";

export interface ILocaleSelectorTestDriver {
	getLocaleSelector: () => Locator;
	getLocaleOption: (optionId: string) => Locator;
	openLocaleSelector: () => void;
	selectOption: (optionId: string) => Promise<void>;
}

export class LocaleSelectorTestDriver implements ILocaleSelectorTestDriver {
	public page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public getLocaleSelector(): Locator {
		return this.page.locator(`.locator-locale-select`).first();
	}

	public getLocaleOption(optionId: string): Locator {
		return this.page.locator(`.locator-option-id-${optionId}`).first();
	}

	public openLocaleSelector() {
		this.getLocaleSelector().click();
	}

	public async selectOption(optionId: string) {
		await this.getLocaleOption(optionId).click();
	}
}
