import type { Meta, StoryObj } from '@storybook/react';

import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
	title: 'Content/ListItem',
	component: ListItem,
	args: {
		children: 'A list item.',
	},
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {};
