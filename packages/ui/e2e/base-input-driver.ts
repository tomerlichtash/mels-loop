import type { Page } from '@playwright/test';

import { BaseDriver } from './base-driver';

export class BaseInputDriver extends BaseDriver {
	constructor(
		page: Page,
		componentClass: string,
		readonly inputSelector = 'input',
	) {
		super(page, componentClass);
	}

	get inputElement() {
		return this.locator.locator(this.inputSelector);
	}

	focus() {
		return this.inputElement.focus();
	}

	fill(value: string) {
		return this.inputElement.fill(value);
	}
}
