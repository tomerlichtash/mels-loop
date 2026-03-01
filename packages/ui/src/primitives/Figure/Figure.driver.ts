import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class FigureDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'figure');
	}

	get caption() {
		return this.locator.locator('figcaption');
	}

	get image() {
		return this.locator.locator('img');
	}
}
