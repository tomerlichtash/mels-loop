import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class ContainerDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-container');
	}
}
