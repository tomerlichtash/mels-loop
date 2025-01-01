import type { Meta, StoryObj } from '@storybook/react';
import Figure from './Figure';

const meta = {
	title: 'UI/Figure',
	component: Figure,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Figure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		elementId: 'test',
	},
	render: function Render({ elementId }) {
		return <Figure elementId={elementId}>Some content</Figure>;
	},
};

// export const FromChildren: Story = {
// 	args: {
// 		message: 'Some error occured',
// 	},
// 	render: function Render({ message }) {
// 		return <Figure>{message}</Figure>;
// 	},
// };
