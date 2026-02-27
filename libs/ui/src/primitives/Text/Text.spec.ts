import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

const STORY_ID = 'primitives-text--default';

const cases = {
	variant: [
		'h1',
		'h2',
		'h3',
		'h4',
		'subtitle1',
		'subtitle2',
		'body1',
		'body2',
		'caption',
		'label',
	],
	color: [
		'primary',
		'secondary',
		'success',
		'error',
		'warning',
		'info',
		'muted',
	],
	weight: [400, 500, 600, 700],
	align: ['start', 'center', 'end'],
	italic: [true],
	uppercase: [true],
	capitalize: [true],
	truncate: [true],
	lineClamp: [2],
	fullWidth: [true],
};

const variants = [
	'h1',
	'h2',
	'h3',
	'h4',
	'subtitle1',
	'subtitle2',
	'body1',
	'body2',
	'caption',
	'label',
] as const;
const colors = [
	'primary',
	'secondary',
	'success',
	'error',
	'warning',
	'info',
	'muted',
] as const;
const weights = [400, 500, 600, 700] as const;
const aligns = ['start', 'center', 'end'] as const;

type Combo = { name: string; args: Record<string, string | number | boolean> };

const combinations: Combo[] = [
	// variant × color
	...variants.flatMap((variant) =>
		colors.map((color) => ({
			name: `${variant} + ${color}`,
			args: { variant, color },
		})),
	),
	// variant × weight
	...variants.flatMap((variant) =>
		weights.map((weight) => ({
			name: `${variant} + ${weight}`,
			args: { variant, weight },
		})),
	),
	// variant × align
	...variants.flatMap((variant) =>
		aligns.map((align) => ({
			name: `${variant} + ${align}`,
			args: { variant, align, fullWidth: true },
		})),
	),
	// style combinations
	{ name: 'italic + uppercase', args: { italic: true, uppercase: true } },
	{ name: 'italic + capitalize', args: { italic: true, capitalize: true } },
	{ name: 'h1 + italic', args: { variant: 'h1', italic: true } },
	{
		name: 'h2 + bold + muted',
		args: { variant: 'h2', weight: 700, color: 'muted' },
	},
	{
		name: 'truncate + fullWidth',
		args: { truncate: true, fullWidth: true },
	},
	{ name: 'lineClamp 3', args: { lineClamp: 3 } },
	{
		name: 'h1 + center + fullWidth',
		args: { variant: 'h1', align: 'center', fullWidth: true },
	},
	{
		name: 'subtitle1 + italic + muted',
		args: { variant: 'subtitle1', italic: true, color: 'muted' },
	},
	{
		name: 'caption + uppercase + 600',
		args: { variant: 'caption', uppercase: true, weight: 600 },
	},
	{
		name: 'label + 500',
		args: { variant: 'label', weight: 500 },
	},
	{
		name: 'body1 + primary + italic',
		args: { variant: 'body1', color: 'primary', italic: true },
	},
	{
		name: 'h3 + secondary',
		args: { variant: 'h3', color: 'secondary' },
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
						await expect(page).toHaveScreenshot();
					});
				}
			});
		}

		test.describe('combinations', () => {
			for (const { name, args } of combinations) {
				test(name, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { args });
					await expect(page).toHaveScreenshot();
				});
			}
		});
	});
}
