import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
	title: 'Primitives/Loader',
	component: Loader,
	args: {
		variant: 'spinner',
		size: 'md',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['spinner', 'dots', 'pulse'],
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
		},
		color: {
			control: 'select',
			options: {
				inherit: '',
				primary: 'primary',
				secondary: 'secondary',
				surface: 'surface',
			},
		},
		label: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {};
