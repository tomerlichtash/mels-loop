import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class ToggleGroupDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-toggle-group');
	}

	get items() {
		return this.locator.locator('button');
	}

	item(label: string) {
		return this.locator.locator('button', { hasText: label });
	}

	activeItem() {
		return this.locator.locator('[data-state="on"]');
	}
}
