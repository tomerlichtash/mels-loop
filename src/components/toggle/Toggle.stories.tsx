import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Toggle from 'components/toggle/Toggle';

const meta = {
	title: 'UI/Toggle',
	component: Toggle,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		isToggled: false,
		title: 'Toggle Button',
	},
	render: function Render({ title, isToggled }) {
		return <Toggle title={title} isToggled={isToggled} />;
	},
};
