import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			type: 'string',
		},
		onClick: {
			type: 'function',
		},
		asChild: {
			type: 'boolean',
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Click',
		title: 'Button title',
		asChild: false,
	},
	render: function Render({ title, children, asChild }) {
		return (
			<Button
				title={title}
				asChild={asChild}
			>
				{children}
			</Button>
		);
	},
};
