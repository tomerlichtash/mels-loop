import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import MenuBar from 'components/nav/menu-bar/MenuBar';

const meta = {
	title: 'Site/MenuBar',
	component: MenuBar,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof MenuBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Desktop: Story = {
	args: {
		items: [],
	},
	render: function Render() {
		return <MenuBar items={[]} />;
	},
};

export const Mobile: Story = {
	...Desktop,
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
};
