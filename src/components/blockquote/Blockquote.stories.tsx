import type { Meta, StoryObj } from '@storybook/react';
import Blockquote from './Blockquote';

const meta = {
	title: 'Semantic/Blockquote',
	component: Blockquote,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	render: function Render() {
		return (
			<Blockquote>
				<p>Some quoted content</p>
				<cite>Cite</cite>
			</Blockquote>
		);
	},
};
