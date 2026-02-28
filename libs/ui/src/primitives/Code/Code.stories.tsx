import type { Meta, StoryObj } from '@storybook/react';

import { Code } from './Code';

const meta: Meta<typeof Code> = {
	title: 'Content/Code',
	component: Code,
	args: {
		children: 'console.log("hello")',
	},
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {};
