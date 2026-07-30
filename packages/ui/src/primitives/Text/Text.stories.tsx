import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
	title: 'Content/Text',
	component: Text,
	args: {
		children: 'The quick brown fox jumps over the lazy dog.',
		italic: false,
		uppercase: false,
		capitalize: false,
		truncate: false,
		fullWidth: false,
	},
	argTypes: {
		children: { control: false },
		variant: {
			control: 'select',
			options: [
				'h1',
				'h2',
				'h3',
				'h4',
				'subtitle1',
				'subtitle2',
				'body1',
				'body2',
				'caption',
				'label',
			],
		},
		color: {
			control: 'select',
			options: [
				'',
				'primary',
				'secondary',
				'success',
				'error',
				'warning',
				'info',
				'muted',
			],
			mapping: {
				'': undefined,
				primary: 'primary',
				secondary: 'secondary',
				success: 'success',
				error: 'error',
				warning: 'warning',
				info: 'info',
				muted: 'muted',
			},
		},
		weight: {
			control: 'select',
			options: [400, 500, 600, 700],
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
		},
		italic: { control: 'boolean' },
		uppercase: { control: 'boolean' },
		capitalize: { control: 'boolean' },
		truncate: { control: 'boolean' },
		lineClamp: { control: { type: 'number', min: 1, max: 10 } },
		fullWidth: { control: 'boolean' },
		component: {
			control: 'select',
			options: [
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'p',
				'span',
				'div',
				'label',
				'em',
				'strong',
			],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
	args: {
		variant: 'body1',
	},
};
