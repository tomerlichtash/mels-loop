import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class ToggleButtonDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-toggle-button');
	}

	async isPressed() {
		return (await this.locator.getAttribute('data-state')) === 'on';
	}
}
