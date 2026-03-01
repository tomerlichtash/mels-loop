import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class TooltipDriver extends BaseDriver {
	constructor(page: Page, triggerClass: string) {
		super(page, triggerClass);
	}

	async open() {
		await this.locator.hover();
		await this.page.getByRole('tooltip').waitFor({ state: 'visible' });
	}
}
