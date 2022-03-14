import { Page } from "playwright-core";

export interface ILayoutDriver {
	gotoRootDir;
	gotoRootDirLocale(locale: "en" | "he");
	get getSiteTitle(): Promise<string>;
}

const ROOT_DIR = "/";

export class LayoutTestDriver implements ILayoutDriver {
	public page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public gotoRootDir() {
		return this.page.goto(`${ROOT_DIR}`);
	}

	public async gotoRootDirLocale(locale: string) {
		return this.page.goto(`${ROOT_DIR}${locale}`);
	}

	public get getSiteTitle() {
		return this.page.locator(`.locator-site-title`).first().innerText();
	}
}
