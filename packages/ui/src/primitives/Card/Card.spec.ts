import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { CardDriver } from './Card.driver';

const STORY_ID = 'layout-card--default';
const CLIP_PADDING = 20;

const presets: {
	name: string;
	args: Record<string, string | number | boolean>;
}[] = [
	// layout
	{
		name: 'horizontal media',
		args: { orientation: 'horizontal', withMedia: true },
	},
	{
		name: 'horizontal actions',
		args: { orientation: 'horizontal', withActions: true },
	},
	// media
	{ name: 'inset media', args: { variant: 'inset', withMedia: true } },
	{
		name: 'media overlay',
		args: { withMedia: true, mediaOverlayText: 'Overlay text' },
	},
	// content
	{ name: 'with footer', args: { footerText: 'Footer actions' } },
	{ name: 'link card', args: { href: '#' } },
	// state
	{ name: 'selected interactive', args: { interactive: true, selected: true } },
	{ name: 'disabled interactive', args: { interactive: true, disabled: true } },
	{ name: 'disabled link', args: { href: '#', disabled: true } },
	// loading
	{ name: 'loading with media', args: { loading: true, withMedia: true } },
	{ name: 'loading with actions', args: { loading: true, withActions: true } },
	{
		name: 'loading horizontal',
		args: { loading: true, orientation: 'horizontal', withMedia: true },
	},
];

testComponent({
	storyId: STORY_ID,
	cases: {
		variant: ['outlined', 'inset'],
		radius: ['none', 'sm', 'md', 'lg'],
		padding: ['none', 'sm', 'md', 'lg'],
		shadow: ['none', 'xs', 'sm', 'md', 'lg'],
		interactive: [true],
		selected: [true],
		disabled: [true],
		orientation: ['horizontal'],
		headerText: [
			'A very long card title that should wrap onto multiple lines in the header',
		],
		bodyText: ['Short.'],
		withActions: [true],
		withMedia: [true],
		loading: [true],
	},
	getTarget: (page) => new CardDriver(page),
	clipPadding: CLIP_PADDING,
	extra: (theme, textDirection) => {
		test.describe('interactive', () => {
			test('hover', async ({ page }) => {
				await loadStory(page, STORY_ID, theme, {
					args: { interactive: true },
					textDirection,
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
					textDirection,
				});
				const card = new CardDriver(page);
				await card.locator.dispatchEvent('mousedown');
				await expect(page).toHaveScreenshot({
					clip: await card.clip(CLIP_PADDING),
				});
			});
		});

		test.describe('presets', () => {
			for (const { name, args } of presets) {
				test(name, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { args, textDirection });
					const card = new CardDriver(page);
					await expect(page).toHaveScreenshot({
						clip: await card.clip(CLIP_PADDING),
					});
				});
			}
		});
	},
});
