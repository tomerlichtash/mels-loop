import type { Meta, StoryObj } from '@storybook/react';
import CodeBlock from './CodeBlock';

const meta = {
	title: 'UI/CodeBlock',
	component: CodeBlock,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: `const example = () => {\n  console.log('test')\n}`,
	},
	render: function Render({ children }) {
		return <CodeBlock>{children}</CodeBlock>;
	},
};
