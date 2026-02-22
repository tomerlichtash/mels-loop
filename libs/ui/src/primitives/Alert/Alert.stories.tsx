import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
	title: 'Primitives/Alert',
	component: Alert,
	tags: ['autodocs'],
	args: {
		title: 'Alert title',
		children: 'This is the alert body with additional context.',
	},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
	args: { color: 'green' },
};

export const Error: Story = {
	args: {
		color: 'red',
		title: 'Error occurred',
		children: 'Something went wrong. Please try again.',
	},
};

export const TitleOnly: Story = {
	args: { children: undefined },
};

export const BodyOnly: Story = {
	args: { title: undefined },
};
