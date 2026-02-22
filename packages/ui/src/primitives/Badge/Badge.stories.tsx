import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
	title: 'Primitives/Badge',
	component: Badge,
	tags: ['autodocs'],
	args: {
		children: 'Badge',
	},
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Pink: Story = {
	args: { color: 'pink' },
};

export const Blue: Story = {
	args: { color: 'blue' },
};
