import type { Meta, StoryObj } from '@storybook/react';

import { List } from './List';
import { ListItem } from './ListItem';

const meta: Meta<typeof List> = {
	title: 'Primitives/List',
	component: List,
	argTypes: {
		ordered: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
	render: (args) => (
		<List {...args}>
			<ListItem>First item</ListItem>
			<ListItem>Second item</ListItem>
			<ListItem>Third item</ListItem>
		</List>
	),
};
