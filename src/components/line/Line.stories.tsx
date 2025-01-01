import type { Meta, StoryObj } from '@storybook/react';
import Line from './Line';

const meta = {
	title: 'UI/Line',
	component: Line,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Line>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		index: 1,
	},
	render: function Render({ index }) {
		return (
			<Line index={index}>
				<span>text1</span>
				<span> </span>
				<span>text2</span>
			</Line>
		);
	},
};
