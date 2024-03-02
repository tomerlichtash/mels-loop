import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import NavItemContent from './NavItemContent';

const meta = {
	title: 'Site/Nav/NavItemContent',
	component: NavItemContent,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof NavItemContent>;

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
			<NavItemContent
				icon={icon}
				title={title}
				description={description}
				author={author}
			/>
		);
	},
};
