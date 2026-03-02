import { expect, type Page, test } from '@playwright/test';

const E2E_RESET_CSS = `
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
  caret-color: transparent !important;
  -webkit-font-smoothing: none !important;
  -moz-osx-font-smoothing: unset !important;
  font-smooth: never !important;
  text-rendering: optimizeSpeed !important;
}
`;

export type Theme = 'light' | 'dark';
export type TextDirection = 'ltr' | 'rtl';
export const THEMES: readonly Theme[] = ['light', 'dark'];
export const TEXT_DIRECTIONS: readonly TextDirection[] = ['ltr', 'rtl'];

export interface LoadStoryOptions {
	args?: Record<string, string | number | boolean>;
	textDirection?: TextDirection;
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
	await page.addStyleTag({ content: E2E_RESET_CSS });

	const dir = options?.textDirection ?? 'ltr';
	await page.evaluate(
		({ t, d }) => {
			document.documentElement.dataset.colorScheme = t;
			document.documentElement.dir = d;
		},
		{ t: theme, d: dir },
	);

	await page.waitForTimeout(100);

	await expect(page.locator('#storybook-root')).toBeVisible();

	return page;
}

type Cases = Record<string, (string | number | boolean)[]>;

type ScreenshotTarget =
	| { page: Page }
	| { locator: import('@playwright/test').Locator }
	| {
			clip: (padding: number) => Promise<{
				x: number;
				y: number;
				width: number;
				height: number;
			}>;
	  };

interface TestComponentOptions<T extends ScreenshotTarget> {
	name: string;
	storyId: string;
	cases?: Cases;
	getTarget?: (page: Page) => T;
	themes?: readonly Theme[];
	textDirections?: readonly TextDirection[];
	clipPadding?: number;
	interactions?: Record<string, (target: T) => Promise<void>>;
	extra?: (theme: Theme, textDirection: TextDirection) => void;
}

async function screenshotTarget<T extends ScreenshotTarget>(
	page: Page,
	target: T,
	clipPadding?: number,
) {
	if ('clip' in target && clipPadding !== undefined) {
		await expect(page).toHaveScreenshot({
			clip: await target.clip(clipPadding),
		});
	} else if ('locator' in target) {
		await expect(target.locator).toHaveScreenshot();
	} else {
		await expect(page).toHaveScreenshot();
	}
}

export function testComponent<T extends ScreenshotTarget>({
	name,
	storyId,
	cases,
	getTarget,
	themes = THEMES,
	textDirections = TEXT_DIRECTIONS,
	clipPadding,
	interactions,
	extra,
}: TestComponentOptions<T>) {
	test.describe(name, () => {
		for (const theme of themes) {
			for (const textDirection of textDirections) {
				test.describe(`${theme} ${textDirection}`, () => {
					if (cases && getTarget) {
						for (const [prop, values] of Object.entries(cases)) {
							test.describe(prop, () => {
								for (const value of values) {
									test(`${value}`, async ({ page }) => {
										await loadStory(page, storyId, theme, {
											args: { [prop]: value },
											textDirection,
										});
										const target = getTarget(page);
										await screenshotTarget(page, target, clipPadding);
									});

									if (interactions) {
										for (const [name, interact] of Object.entries(
											interactions,
										)) {
											test(`${value} ${name}`, async ({ page }) => {
												await loadStory(page, storyId, theme, {
													args: { [prop]: value },
													textDirection,
												});
												const target = getTarget(page);
												await interact(target);
												await screenshotTarget(page, target, clipPadding);
											});
										}
									}
								}
							});
						}
					}
					extra?.(theme, textDirection);
				});
			}
		}
	});
}
