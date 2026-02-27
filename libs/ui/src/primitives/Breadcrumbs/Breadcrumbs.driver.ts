import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class BreadcrumbsDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-breadcrumbs');
	}

	get items() {
		return this.locator.locator('li');
	}

	get links() {
		return this.locator.locator('a');
	}

	get currentItem() {
		return this.locator.locator('[aria-current="page"]');
	}
}
