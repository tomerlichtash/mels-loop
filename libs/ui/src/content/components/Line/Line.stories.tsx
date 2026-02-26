import type { Meta, StoryObj } from '@storybook/react';

import { Line } from './Line';

const meta: Meta<typeof Line> = {
	title: 'Content/Line',
	component: Line,
	args: {
		children: 'This is a line of content.',
	},
};

export default meta;
type Story = StoryObj<typeof Line>;

export const Default: Story = {};

export const WithAnchor: Story = {
	args: {
		id: 'line-42',
		children: 'This line has an anchor link.',
	},
};
