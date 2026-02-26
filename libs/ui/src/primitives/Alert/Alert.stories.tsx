import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
	title: 'Primitives/Alert',
	component: Alert,
	args: {
		title: 'Alert title',
		children: 'This is the alert body with additional context.',
		status: 'info',
	},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};
