import { BaseInputDriver } from '@e2e/base-input-driver';
import type { Page } from '@playwright/test';

export class TextAreaDriver extends BaseInputDriver {
	constructor(page: Page) {
		super(page, 'ml-text-area');
	}

	get inputElement() {
		return this.locator;
	}
}
