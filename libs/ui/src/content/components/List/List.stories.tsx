import type { Meta, StoryObj } from '@storybook/react';

import { ListItem } from '../ListItem/ListItem';
import { List } from './List';

const meta: Meta<typeof List> = {
	title: 'Content/List',
	component: List,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
	render: () => (
		<List>
			<ListItem>First item</ListItem>
			<ListItem>Second item</ListItem>
			<ListItem>Third item</ListItem>
		</List>
	),
};

export const Ordered: Story = {
	render: () => (
		<List ordered>
			<ListItem>First item</ListItem>
			<ListItem>Second item</ListItem>
			<ListItem>Third item</ListItem>
		</List>
	),
};
