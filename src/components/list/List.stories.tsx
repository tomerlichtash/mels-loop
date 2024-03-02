import type { Meta, StoryObj } from '@storybook/react';
import List from './List';
import { ListItem } from '..';

const meta = {
	title: 'UI/List',
	component: List,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
	render: function Render({}) {
		return (
			<List>
				<ListItem>Item 1</ListItem>
				<ListItem>Item 2</ListItem>
			</List>
		);
	},
};
