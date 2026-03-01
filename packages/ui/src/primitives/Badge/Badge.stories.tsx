import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
	title: 'Content/Badge',
	component: Badge,
	args: {
		children: 'Badge',
		bordered: false,
	},
	argTypes: {
		children: { control: 'text' },
		color: { control: 'color' },
		radius: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg', 'pill'],
		},
		bordered: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
