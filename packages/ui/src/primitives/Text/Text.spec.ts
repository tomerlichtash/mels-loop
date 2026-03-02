import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

const STORY_ID = 'content-text--default';

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
];
const colors = [
	'primary',
	'secondary',
	'success',
	'error',
	'warning',
	'info',
	'muted',
];
const weights = [400, 500, 600, 700];
const aligns = ['start', 'center', 'end'];

type Combo = { name: string; args: Record<string, string | number | boolean> };

const combinations: Combo[] = [
	...variants.flatMap((variant) =>
		colors.map((color) => ({
			name: `${variant} + ${color}`,
			args: { variant, color },
		})),
	),
	...variants.flatMap((variant) =>
		weights.map((weight) => ({
			name: `${variant} + ${weight}`,
			args: { variant, weight },
		})),
	),
	...variants.flatMap((variant) =>
		aligns.map((align) => ({
			name: `${variant} + ${align}`,
			args: { variant, align, fullWidth: true },
		})),
	),
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

testComponent({
	storyId: STORY_ID,
	cases: {
		variant: [...variants],
		color: [...colors],
		weight: [...weights],
		align: [...aligns],
		italic: [true, false],
		uppercase: [true, false],
		capitalize: [true, false],
		truncate: [true, false],
		lineClamp: [2],
		fullWidth: [true, false],
	},
	getTarget: (page) => ({ page }),
	extra: (theme, textDirection) => {
		test.describe('combinations', () => {
			for (const { name, args } of combinations) {
				test(name, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { args, textDirection });
					await expect(page).toHaveScreenshot();
				});
			}
		});
	},
});
