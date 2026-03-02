import { BaseInputDriver } from '@e2e/base-input-driver';
import type { Page } from '@playwright/test';

export class PasswordFieldDriver extends BaseInputDriver {
	constructor(page: Page) {
		super(page, 'ml-password-field');
	}

	get toggleButton() {
		return this.locator.locator('button');
	}
}
