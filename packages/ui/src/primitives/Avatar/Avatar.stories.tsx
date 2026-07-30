import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
	title: 'Content/Avatar',
	component: Avatar,
	args: {
		alt: 'Mel Kaye',
		size: 'md',
	},
	argTypes: {
		src: { control: 'text' },
		alt: { control: 'text' },
		fallback: { control: 'text' },
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	args: {
		src: 'https://mels-loop-media.s3.eu-north-1.amazonaws.com/mel-kaye-profile-picture-1951_aark5e.jpg',
	},
};

export const Fallback: Story = {
	args: {
		src: undefined,
		alt: 'Mel Kaye',
	},
};
