import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Logo from 'layout/logo/Logo';

const meta = {
	title: 'Site/Logo',
	component: Logo,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		mode: 'light',
	},
	render: function Render({ mode }) {
		return <Logo mode={mode} />;
	},
};
