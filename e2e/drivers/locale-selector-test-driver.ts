import { Page, Locator } from "playwright-core";
import {
	DropdownTestDriver,
	IDropdownTestDriver,
} from "./dropdown-test-driver";

export interface ILocaleSelectorTestDriver {
	getLocaleSelector: () => Locator;
	getLocaleOption: (optionId: string) => Locator;
	dropdown: IDropdownTestDriver;
}

export class LocaleSelectorTestDriver implements ILocaleSelectorTestDriver {
	private page: Page;
	public dropdown: IDropdownTestDriver;

	constructor(page: Page) {
		this.page = page;
		this.dropdown = new DropdownTestDriver(page, ".locator-locale-select");
	}

	public getLocaleSelector(): Locator {
		return this.dropdown.component.getComponent();
	}

	public getLocaleOption(optionId: string): Locator {
		return this.page.locator(`.locator-option-id-${optionId}`).first();
	}
}
