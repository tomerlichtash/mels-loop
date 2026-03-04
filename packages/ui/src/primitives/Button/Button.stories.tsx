import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Action/Button',
	component: Button,
	args: {
		children: 'Button',
	},
	argTypes: {
		children: { control: 'text' },
		variant: {
			control: 'select',
			options: ['contained', 'outlined', 'text'],
		},
		color: {
			control: 'select',
			options: ['primary', 'secondary'],
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
		},
		radius: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg', 'pill'],
		},
		loading: { control: 'boolean' },
		disabled: { control: 'boolean' },
		fullWidth: { control: 'boolean' },
		asChild: { control: 'boolean' },
	},
	render: ({ children, asChild, ...args }) => (
		<Button asChild={asChild} {...args}>
			{asChild ? <a href="#">{children}</a> : children}
		</Button>
	),
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

Default.args = {
	variant: 'contained',
	color: 'primary',
	size: 'md',
	radius: 'md',
	loading: false,
	asChild: false,
	fullWidth: false,
	disabled: false,
};
