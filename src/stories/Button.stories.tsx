import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button';
// import { Link } from "@components/content/content-blocks";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		// href: {
		// 	type: 'string',
		// },
		// target: {
		// 	options: ['', '_blank'],
		// 	control: { type: 'select' },
		// },
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
		// target: '_blank',
		// href: '#',
		children: 'Click',
		title: 'Button title',
		asChild: false,
	},
	render: function Render({ title, children, asChild }) {
		return (
			<Button title={title} asChild={asChild}>
				{children}
			</Button>
		);
	},
};

// export const LinkButton: Story = {
// 	args: {
// 		children: 'Click',
// 		title: 'Button title',
// 		asChild: true,
// 	},
// 	render: function Render({ title, children, asChild }) {
// 		return (
// 			<Button title={title} asChild={asChild}>
// 				<Link href={href} target={target}>
// 					{children}
// 				</Link>
// 			</Button>
// 		);
// 	},
// };
