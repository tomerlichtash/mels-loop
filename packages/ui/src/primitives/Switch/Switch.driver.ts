import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class SwitchDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-switch');
	}

	get control() {
		return this.locator.locator('button');
	}

	async getState() {
		return this.control.getAttribute('data-state');
	}
}
