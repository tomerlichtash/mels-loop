import { BaseDriver } from '@e2e/base-driver';
import type { Page } from '@playwright/test';

export class CodeBlockDriver extends BaseDriver {
	constructor(page: Page) {
		super(page, 'ml-code-block');
	}
}
