import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { CardDriver } from './Card.driver';

const STORY_ID = 'primitives-card--default';
const CLIP_PADDING = 20;

const cases = {
	variant: ['outlined', 'inset'],
	radius: ['none', 'sm', 'md', 'lg'],
	padding: ['none', 'sm', 'md', 'lg'],
	shadow: ['none', 'xs', 'sm', 'md', 'lg'],
	interactive: [true],
	selected: [true],
	disabled: [true],
	direction: ['horizontal'],
	headerText: ['Card Title'],
	bodyText: ['Card body content'],
	footerText: ['Footer actions'],
	withActions: [true],
	mediaSrc: ['', 'https://dummyimage.com/400x200/cccccc/999999&text=Test'],
	mediaOverlayText: ['Overlay text'],
	loading: [true],
	href: ['#'],
};

const combinations: {
	name: string;
	args: Record<string, string | number | boolean>;
}[] = [
	{
		name: 'interactive + selected',
		args: { interactive: true, selected: true },
	},
	{
		name: 'interactive + disabled',
		args: { interactive: true, disabled: true },
	},
	{
		name: 'interactive + selected + disabled',
		args: { interactive: true, selected: true, disabled: true },
	},
	{ name: 'href + disabled', args: { href: '#', disabled: true } },
	{
		name: 'inset + interactive',
		args: { variant: 'inset', interactive: true },
	},
	{
		name: 'horizontal + withActions',
		args: { direction: 'horizontal', withActions: true },
	},
];

for (const theme of THEMES) {
	test.describe(theme, () => {
		for (const [prop, values] of Object.entries(cases)) {
			test.describe(prop, () => {
				for (const value of values) {
					test(`${value}`, async ({ page }) => {
						await loadStory(page, STORY_ID, theme, {
							args: { [prop]: value },
						});
						const card = new CardDriver(page);
						await expect(page).toHaveScreenshot({
							clip: await card.clip(CLIP_PADDING),
						});
					});
				}
			});
		}

		test.describe('interactive', () => {
			test('hover', async ({ page }) => {
				await loadStory(page, STORY_ID, theme, {
					args: { interactive: true },
				});
				const card = new CardDriver(page);
				await card.locator.hover();
				await expect(page).toHaveScreenshot({
					clip: await card.clip(CLIP_PADDING),
				});
			});

			test('active', async ({ page }) => {
				await loadStory(page, STORY_ID, theme, {
					args: { interactive: true },
				});
				const card = new CardDriver(page);
				await card.locator.dispatchEvent('mousedown');
				await expect(page).toHaveScreenshot({
					clip: await card.clip(CLIP_PADDING),
				});
			});
		});

		test.describe('combinations', () => {
			for (const { name, args } of combinations) {
				test(name, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { args });
					const card = new CardDriver(page);
					await expect(page).toHaveScreenshot({
						clip: await card.clip(CLIP_PADDING),
					});
				});
			}
		});

		test('grid', async ({ page }) => {
			await loadStory(page, 'primitives-card--grid', theme);
			await expect(page).toHaveScreenshot();
		});

		test('masonry', async ({ page }) => {
			await loadStory(page, 'primitives-card--masonry', theme);
			await expect(page).toHaveScreenshot();
		});
	});
}
