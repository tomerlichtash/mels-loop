import type { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from './Paragraph';

const meta: Meta<typeof Paragraph> = {
	title: 'Content/Paragraph',
	component: Paragraph,
	args: {
		children:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {};
