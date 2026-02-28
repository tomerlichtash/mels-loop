import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class ChipDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-chip');
	}

	get dismissButton() {
		return this.locator.locator('button');
	}
}
