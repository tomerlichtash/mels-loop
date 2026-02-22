import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
	title: 'Primitives/Card',
	component: Card,
	tags: ['autodocs'],
	args: {
		children: 'Card content goes here.',
	},
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithBorder: Story = {
	args: { withBorder: true },
};

export const Paddings: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Card padding="sm" withBorder>
				sm padding
			</Card>
			<Card padding="md" withBorder>
				md padding
			</Card>
			<Card padding="lg" withBorder>
				lg padding
			</Card>
		</div>
	),
};
