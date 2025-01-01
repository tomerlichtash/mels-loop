import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import NavItem from './NavItem';

const meta = {
	title: 'Site/Nav/NavItem',
	component: NavItem,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavBar: Story = {
	args: {
		icon: 'article',
		title: 'Nav Item 1',
		description: 'Item description',
		author: '',
	},
	render: function Render({ icon, title, description, author }) {
		return (
			<NavItem
				icon={icon}
				title={title}
				description={description}
				author={author}
			/>
		);
	},
};
