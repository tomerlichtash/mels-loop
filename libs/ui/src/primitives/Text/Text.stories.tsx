import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
	title: 'Primitives/Text',
	component: Text,
	args: {
		children: 'The quick brown fox jumps over the lazy dog.',
		size: 'md',
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg'],
		},
		color: {
			control: 'select',
			options: [undefined, 'dimmed', 'error'],
		},
		weight: {
			control: 'select',
			options: [400, 500, 600, 700],
		},
		italic: { control: 'boolean' },
		uppercase: { control: 'boolean' },
		capitalize: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};
