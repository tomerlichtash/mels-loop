import type { Page } from '@playwright/test';

export class DialogDriver {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	get overlay() {
		return this.page
			.locator('[data-radix-dialog-overlay]', {
				hasNot: this.page.locator('[data-radix-dialog-overlay] *'),
			})
			.first();
	}

	get content() {
		return this.page.locator('[role="dialog"]');
	}

	get closeButton() {
		return this.content.locator('button[aria-label="Close"]');
	}

	get trigger() {
		return this.page.locator('button', { hasText: 'Open Dialog' });
	}
}
