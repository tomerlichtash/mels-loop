import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
	title: 'Primitives/Text',
	component: Text,
	tags: ['autodocs'],
	args: {
		children: 'The quick brown fox jumps over the lazy dog.',
	},
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Text size="xs">xs — The quick brown fox</Text>
			<Text size="sm">sm — The quick brown fox</Text>
			<Text size="md">md — The quick brown fox</Text>
			<Text size="lg">lg — The quick brown fox</Text>
		</div>
	),
};

export const Dimmed: Story = {
	args: { color: 'dimmed' },
};

export const Error: Story = {
	args: { color: 'error', children: 'Something went wrong.' },
};

export const Italic: Story = {
	args: { italic: true },
};

export const Uppercase: Story = {
	args: { uppercase: true },
};

export const Weights: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Text weight={400}>weight 400</Text>
			<Text weight={500}>weight 500</Text>
			<Text weight={600}>weight 600</Text>
			<Text weight={700}>weight 700</Text>
		</div>
	),
};
