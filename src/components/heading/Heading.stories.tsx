import type { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading';

const meta = {
	title: 'Semantic/Heading',
	component: Heading,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		level: 1,
	},
	render: function Render({ level }) {
		return <Heading level={level}>Heading</Heading>;
	},
};
