import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
	title: 'UI/Text',
	component: Text,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: 'h1',
	},
	render: function Render({ variant }) {
		return <Text variant={variant}>Some text</Text>;
	},
};
