import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Primitives/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'Button',
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Subtle: Story = {
	args: { variant: 'subtle' },
};

export const Outline: Story = {
	args: { variant: 'outline' },
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
			<Button size="xs">xs</Button>
			<Button size="sm">sm</Button>
			<Button size="md">md</Button>
			<Button size="lg">lg</Button>
			<Button size="xl">xl</Button>
		</div>
	),
};

export const Loading: Story = {
	args: { loading: true },
};

export const Disabled: Story = {
	args: { disabled: true },
};
