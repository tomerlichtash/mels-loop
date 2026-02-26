import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from './Stack';

const items = ['Item one', 'Item two', 'Item three'];

const meta: Meta<typeof Stack> = {
	title: 'Primitives/Stack',
	component: Stack,
	args: {
		children: items.map((item) => (
			<div
				key={item}
				style={{
					padding: '8px',
					background: 'var(--ml-color-surface)',
					border: '1px solid var(--ml-color-border)',
				}}
			>
				{item}
			</div>
		)),
	},
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {};
