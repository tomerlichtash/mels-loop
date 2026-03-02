import type { Locator, Page } from '@playwright/test';

export class FigureDriver {
	readonly locator: Locator;

	constructor(readonly page: Page) {
		this.locator = page.locator('figure');
	}

	get caption() {
		return this.locator.locator('figcaption');
	}

	get image() {
		return this.locator.locator('img');
	}
}
