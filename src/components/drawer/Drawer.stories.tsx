import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './Drawer';

const meta = {
	title: 'UI/Drawer',
	component: Drawer,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		open: true,
		direction: 'right',
	},
	render: function Render({ open, direction }) {
		return (
			<Drawer open={open} direction={direction}>
				Drawer content
			</Drawer>
		);
	},
};
