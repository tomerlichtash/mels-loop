import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
	title: 'Primitives/Loader',
	component: Loader,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Loader size="sm" />
			<Loader size="md" />
			<Loader size="lg" />
		</div>
	),
};
