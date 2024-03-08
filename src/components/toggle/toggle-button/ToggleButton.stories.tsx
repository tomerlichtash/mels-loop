import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ToggleButton from './ToggleButton';

const meta = {
	title: 'UI/Toggle/Button',
	component: ToggleButton,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		isToggled: false,
		title: 'Toggle Button',
	},
	render: function Render({ title, isToggled }) {
		return (
			<ToggleButton
				title={title}
				isToggled={isToggled}
			/>
		);
	},
};
