import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
	title: 'Feedback/Alert',
	component: Alert,
	args: {
		title: 'Alert title',
		children: 'This is the alert body with additional context.',
		status: 'info',
		radius: 'md',
	},
	argTypes: {
		status: {
			control: 'select',
			options: ['success', 'error', 'warning', 'info'],
		},
		radius: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg', 'pill'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};
