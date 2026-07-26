import type { Meta, StoryObj } from '@storybook/react';

import { IndexMarker } from './IndexMarker';

const meta: Meta<typeof IndexMarker> = {
	title: 'Data Display/IndexMarker',
	component: IndexMarker,
	args: {
		index: 1,
		padLength: 2,
	},
	argTypes: {
		index: { control: { type: 'number', min: 1 } },
		padLength: { control: { type: 'number', min: 1, max: 4 } },
	},
};

export default meta;
type Story = StoryObj<typeof IndexMarker>;

export const Default: Story = {};

export const SingleDigit: Story = {
	args: { index: 5, padLength: 1 },
};

export const Padded: Story = {
	args: { index: 3, padLength: 2 },
};

export const LargeIndex: Story = {
	args: { index: 42, padLength: 3 },
};

export const InContext: Story = {
	render: () => (
		<p style={{ fontSize: '16px', lineHeight: 1.6 }}>
			A recent article devoted to the <em>macho</em> side of programming
			<IndexMarker index={1} padLength={2} /> made the bold and unvarnished
			statement: Real Programmers write in FORTRAN.
			<IndexMarker index={2} padLength={2} /> Maybe they do now, in this
			decadent era of Lite beer, hand calculators
			<IndexMarker index={3} padLength={2} /> and user-friendly software.
		</p>
	),
};
