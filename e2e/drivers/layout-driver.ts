import { Page } from "playwright-core";

export interface ILayoutDriver {
	get getSiteTitle(): Promise<string>;
}

export class LayoutTestDriver implements ILayoutDriver {
	public page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public get getSiteTitle() {
		return this.page.locator(`.locator-site-title`).first().innerText();
	}
}
