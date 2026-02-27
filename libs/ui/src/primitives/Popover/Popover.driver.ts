import type { Page } from '@playwright/test';

export class PopoverDriver {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	get content() {
		return this.page.locator('[data-radix-popover-content]');
	}

	get trigger() {
		return this.page.locator('button', { hasText: 'Toggle Popover' });
	}
}
