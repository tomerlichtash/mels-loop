import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
	title: 'Content/Badge',
	component: Badge,
	args: {
		children: 'Badge',
		variant: 'outlined',
		bordered: false,
	},
	argTypes: {
		children: { control: 'text' },
		variant: {
			control: 'select',
			options: ['outlined', 'contained', 'count'],
		},
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
