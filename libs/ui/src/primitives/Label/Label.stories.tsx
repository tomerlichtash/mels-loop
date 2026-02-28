import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label';

const meta: Meta<typeof Label> = {
	title: 'Primitives/Label',
	component: Label,
	args: {
		children: 'Email address',
	},
	argTypes: {
		children: { control: 'text' },
		required: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
	args: {
		required: false,
	},
};
