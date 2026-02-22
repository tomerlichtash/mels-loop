import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
	title: 'Primitives/Heading',
	component: Heading,
	tags: ['autodocs'],
	args: {
		children: 'The quick brown fox',
	},
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const Scale: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Heading order={1}>h1 — The quick brown fox</Heading>
			<Heading order={2}>h2 — The quick brown fox</Heading>
			<Heading order={3}>h3 — The quick brown fox</Heading>
			<Heading order={4}>h4 — The quick brown fox</Heading>
			<Heading order={5}>h5 — The quick brown fox</Heading>
			<Heading order={6}>h6 — The quick brown fox</Heading>
		</div>
	),
};
