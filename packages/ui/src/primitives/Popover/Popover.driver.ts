import type { Page } from '@playwright/test';

export class PopoverDriver {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	get content() {
		return this.page.getByRole('dialog');
	}

	get trigger() {
		return this.page.locator('.ml-button');
	}
}
