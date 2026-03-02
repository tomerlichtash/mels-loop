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

	get input() {
		return this.locator.locator(this.inputSelector);
	}

	focus() {
		return this.input.focus();
	}

	fill(value: string) {
		return this.input.fill(value);
	}
}
