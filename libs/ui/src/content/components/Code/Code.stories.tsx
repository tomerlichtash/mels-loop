import type { Meta, StoryObj } from '@storybook/react';

import { CodeBlock } from '../CodeBlock/CodeBlock';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
	title: 'Content/Code',
	component: Code,
	args: {
		children: 'console.log("hello")',
	},
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {};

export const InsideCodeBlock: Story = {
	render: () => (
		<CodeBlock>
			<Code>{'const x = 42;\nconsole.log(x);'}</Code>
		</CodeBlock>
	),
};
