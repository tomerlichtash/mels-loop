import type { Meta, StoryObj } from '@storybook/react';
// import "!style-loader!css-loader!sass-loader!./../../src/styles/app.scss";
import Link from './Link';

const meta = {
	title: 'UI/Link',
	component: Link,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		href: '#',
		children: 'Link',
	},
	render: function Render(args) {
		return <Link {...args}>Link</Link>;
	},
};
