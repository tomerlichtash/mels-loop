import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import HorizontalNav from 'components/HorizontalMenu/HorizontalNav';

const meta = {
	title: 'HorizontalNav',
	component: HorizontalNav,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof HorizontalNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const Desktop: Story = {
	args: {
		items: [],
	},
	render: function Render() {
		return <HorizontalNav items={[]} />;
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
