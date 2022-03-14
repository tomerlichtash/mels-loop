import { Page, Locator } from "playwright-core";

export interface IComponentTestDriver {
	getComponent: () => Locator;
}

export class ComponentTestDriver implements IComponentTestDriver {
	private page: Page;
	private selector: string;

	constructor(page: Page, selector: string) {
		this.page = page;
		this.selector = selector;
	}

	public getComponent(): Locator {
		return this.page.locator(this.selector).first();
	}
}
