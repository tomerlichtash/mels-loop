import type { Locator, Page } from '@playwright/test';

export class BaseDriver {
	readonly locator: Locator;

	constructor(
		readonly page: Page,
		componentClass: string,
	) {
		this.locator = page.locator(`.${componentClass}`);
	}

	click() {
		return this.locator.click();
	}

	hover() {
		return this.locator.hover();
	}

	isVisible() {
		return this.locator.isVisible();
	}

	isDisabled() {
		return this.locator.isDisabled();
	}

	screenshot() {
		return this.locator.screenshot();
	}

	async clip(padding?: number) {
		const box = await this.locator.boundingBox();
		if (!box) throw new Error('Element not found');
		if (padding === undefined) return box;
		return {
			x: Math.max(0, box.x - padding),
			y: Math.max(0, box.y - padding),
			width: box.width + padding * 2,
			height: box.height + padding * 2,
		};
	}
}
