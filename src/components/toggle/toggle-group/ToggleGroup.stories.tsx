import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ToggleGroup from './ToggleGroup';

const meta = {
	title: 'UI/Toggle/Group',
	component: ToggleGroup,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		type: 'single',
		defaultValue: '1',
	},
	render: function Render({ type, defaultValue }) {
		return (
			<ToggleGroup type={type} defaultValue={defaultValue}>
				<span data-value="1">Item 1</span>
				<span data-value="2">Item 2</span>
				<span data-value="3">Item 3</span>
			</ToggleGroup>
		);
	},
};
