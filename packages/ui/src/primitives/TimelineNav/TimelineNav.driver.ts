import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class TimelineNavDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-timeline-nav');
	}

	get sections() {
		return this.locator.locator('.ml-timeline-section');
	}

	get items() {
		return this.locator.locator('.ml-timeline-item');
	}

	get activeItems() {
		return this.locator.locator('.ml-timeline-item-active');
	}

	get sectionHeaders() {
		return this.locator.locator('h3');
	}
}
