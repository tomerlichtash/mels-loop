import type { Meta, StoryObj } from '@storybook/react';
import Term from './Term';

const meta = {
	title: 'UI/Term',
	component: Term,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Term>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
	render: function Render() {
		return (
			<>
				Term<Term></Term>
			</>
		);
	},
};
