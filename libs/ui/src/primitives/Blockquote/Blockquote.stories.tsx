import type { Meta, StoryObj } from '@storybook/react';

import { Blockquote } from './Blockquote';

const meta: Meta<typeof Blockquote> = {
	title: 'Primitives/Blockquote',
	component: Blockquote,
	args: {
		children: 'The only way to do great work is to love what you do.',
	},
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {};
