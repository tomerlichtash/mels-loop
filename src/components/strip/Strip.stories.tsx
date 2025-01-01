import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Strip from './Strip';

const meta = {
	title: 'UI/Strip',
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

export const Primary: Story = {
	render: function Render() {
		return <Strip />;
	},
};
