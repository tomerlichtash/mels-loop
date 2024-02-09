import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Strip from '../components/strip/Strip';

const meta = {
	title: 'Strip',
	component: Strip,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Strip>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseStory: Story = {
	args: {},
	render: function Render() {
		return <Strip />;
	},
};

export const Desktop: Story = BaseStory;

export const Mobile: Story = {
	...BaseStory,
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
};
