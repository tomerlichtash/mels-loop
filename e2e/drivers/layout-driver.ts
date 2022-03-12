import { Page } from "playwright-core";

export interface ILayoutDriver {
	goto: (path: string) => Promise<void>;
	getSiteTitle: () => Promise<string>;
}

export class LayoutTestDriver implements ILayoutDriver {
	public page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public async goto(path: string) {
		await this.page.goto(path);
	}

	public getSiteTitle() {
		return this.page.locator(`.locator-site-title`).first().innerText();
	}
}
