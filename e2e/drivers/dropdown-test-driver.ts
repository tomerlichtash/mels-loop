import { Page, Locator } from "playwright-core";
import {
	ComponentTestDriver,
	IComponentTestDriver,
} from "./component-test-driver";

export interface IDropdownTestDriver {
	getOption: (optionId: string) => Locator;
	openDropdown: () => void;
	selectOption: (optionId: string) => Promise<void>;
	component: IComponentTestDriver;
}

export class DropdownTestDriver implements IDropdownTestDriver {
	private page: Page;
	public component: IComponentTestDriver;

	constructor(page: Page, selector: string) {
		this.page = page;
		this.component = new ComponentTestDriver(page, selector);
	}

	public getOption(id: string): Locator {
		return this.page.locator(`.locator-option-id-${id}`).first();
	}

	public openDropdown() {
		this.component.getComponent().click();
	}

	public async selectOption(id: string) {
		await this.getOption(id).click();
	}
}
