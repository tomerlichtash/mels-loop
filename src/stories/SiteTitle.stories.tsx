import type { Meta, StoryObj } from '@storybook/react';
// import "!style-loader!css-loader!sass-loader!./../../src/styles/app.scss";
import { TextLink } from '@components/text-link';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'TextLink',
	component: TextLink,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		label: 'title',
		linked: false,
	},
	render: function Render(args) {
		return <TextLink {...args} />;
	},
};
