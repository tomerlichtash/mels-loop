import type { Meta, StoryObj } from '@storybook/react';

import { Code } from '../Code/Code';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
	title: 'Content/CodeBlock',
	component: CodeBlock,
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
	render: () => (
		<CodeBlock>
			<Code>
				{'function greet(name: string) {\n  return `Hello, ${name}!`;\n}'}
			</Code>
		</CodeBlock>
	),
};
