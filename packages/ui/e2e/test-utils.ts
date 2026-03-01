import { expect, type Page } from '@playwright/test';

const DISABLE_ANIMATIONS_CSS = `
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
  caret-color: transparent !important;
}
`;

export type Theme = 'light' | 'dark';
export const THEMES: readonly Theme[] = ['light', 'dark'];

export interface LoadStoryOptions {
	args?: Record<string, string | number | boolean>;
}

function buildStoryUrl(storyId: string, options?: LoadStoryOptions) {
	let url = `/iframe.html?id=${storyId}&viewMode=story`;

	if (options?.args) {
		const argsStr = Object.entries(options.args)
			.map(([k, v]) => `${k}:${v}`)
			.join(';');
		url += `&args=${argsStr}`;
	}

	return url;
}

export async function loadStory(
	page: Page,
	storyId: string,
	theme: Theme,
	options?: LoadStoryOptions,
) {
	await page.goto(buildStoryUrl(storyId, options), {
		waitUntil: 'networkidle',
	});

	await page.evaluate(() => document.fonts.ready);
	await page.addStyleTag({ content: DISABLE_ANIMATIONS_CSS });

	await page.evaluate((t) => {
		document.documentElement.dataset.colorScheme = t;
	}, theme);

	await page.waitForTimeout(100);

	await expect(page.locator('#storybook-root')).toBeVisible();

	return page;
}
