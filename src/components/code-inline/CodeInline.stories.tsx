import type { Meta, StoryObj } from '@storybook/react';
import CodeInline from './CodeInline';

const meta = {
	title: 'UI/CodeInline',
	component: CodeInline,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CodeInline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: `Jump`,
	},
	render: function Render({ children }) {
		return <CodeInline>{children}</CodeInline>;
	},
};
