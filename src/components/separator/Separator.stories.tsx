import type { Meta, StoryObj } from '@storybook/react';
import Separator from './Separator';

const meta = {
	title: 'UI/Separator',
	component: Separator,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		orientation: 'horizontal',
	},
	render: function Render({ orientation }) {
		return <Separator orientation={orientation} />;
	},
};
