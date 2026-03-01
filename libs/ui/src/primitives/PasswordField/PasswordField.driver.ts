import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class PasswordFieldDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-password-field');
	}

	get input() {
		return this.locator.locator('input');
	}

	get toggleButton() {
		return this.locator.locator('button');
	}
}
