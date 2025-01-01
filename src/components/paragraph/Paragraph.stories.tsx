import type { Meta, StoryObj } from '@storybook/react';
import Paragraph from './Paragraph';

const meta = {
	title: 'Semantic/Paragraph',
	component: Paragraph,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
	render: function Render() {
		return <Paragraph>Some content</Paragraph>;
	},
};

// export const FromChildren: Story = {
// 	args: {
// 		message: 'Some error occured',
// 	},
// 	render: function Render({ message }) {
// 		return <Paragraph>{message}</Paragraph>;
// 	},
// };
