import type { Meta, StoryObj } from '@storybook/react';

import { Group } from './Group';

const items = ['Alpha', 'Beta', 'Gamma', 'Delta'];

const meta: Meta<typeof Group> = {
	title: 'Primitives/Group',
	component: Group,
	args: {
		children: items.map((item) => (
			<div
				key={item}
				style={{
					padding: '8px 16px',
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
type Story = StoryObj<typeof Group>;

export const Default: Story = {};
