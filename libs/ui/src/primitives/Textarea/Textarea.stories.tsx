import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
	title: 'Input/TextArea',
	component: TextArea,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		label: { control: 'text' },
		error: { control: 'boolean' },
		errorMessage: { control: 'text' },
		disabled: { control: 'boolean' },
		readOnly: { control: 'boolean' },
		required: { control: 'boolean' },
		placeholder: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
	args: {
		label: 'Label',
		placeholder: 'Enter message...',
		size: 'md',
		error: false,
		errorMessage: '',
		disabled: false,
		readOnly: false,
		required: false,
	},
};
