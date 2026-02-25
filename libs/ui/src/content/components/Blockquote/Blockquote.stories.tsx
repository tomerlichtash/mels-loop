import type { Meta, StoryObj } from '@storybook/react';

import { Blockquote } from './Blockquote';

const meta: Meta<typeof Blockquote> = {
	title: 'Content/Blockquote',
	component: Blockquote,
	tags: ['autodocs'],
	args: {
		children: 'The only way to do great work is to love what you do.',
	},
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {};
