import { BaseInputDriver } from '@e2e/base-input-driver';
import type { Page } from '@playwright/test';

export class TextFieldDriver extends BaseInputDriver {
	constructor(page: Page) {
		super(page, 'ml-text-field');
	}
}
