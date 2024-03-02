import type { Meta, StoryObj } from '@storybook/react';
import CustomImage from './CustomImage';

const meta = {
	title: 'UI/CustomImage',
	component: CustomImage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CustomImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		src: 'http://dummyimage.com/500x500/a6a49c/20201e.png',
	},
	render: function Render({ src }) {
		return <CustomImage src={src} />;
	},
};
