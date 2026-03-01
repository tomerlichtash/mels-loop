import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class ComboboxDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-combobox');
	}

	get input() {
		return this.locator.locator('[role="combobox"]');
	}

	get listbox() {
		return this.page.locator('[role="listbox"]');
	}

	get options() {
		return this.listbox.locator('[role="option"]');
	}

	get chips() {
		return this.locator.locator('.ml-chip');
	}

	get clearButton() {
		return this.locator.locator('.ml-input-action').first();
	}

	option(label: string) {
		return this.listbox.locator('[role="option"]', { hasText: label });
	}

	async open() {
		await this.input.click();
		await this.listbox.waitFor({ state: 'visible' });
	}

	async type(text: string) {
		await this.input.fill(text);
		await this.listbox.waitFor({ state: 'visible' });
	}

	async select(label: string) {
		await this.option(label).click();
	}
}
