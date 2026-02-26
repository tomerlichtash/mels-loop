import type { Meta, StoryObj } from '@storybook/react';

import { Container } from './Container';

const meta: Meta<typeof Container> = {
	title: 'Primitives/Container',
	component: Container,
	args: {
		children: (
			<div
				style={{
					background: 'var(--ml-color-surface)',
					border: '1px dashed var(--ml-color-border)',
					padding: '8px',
				}}
			>
				Content
			</div>
		),
	},
	decorators: [
		(Story) => (
			<div
				style={{
					background: 'var(--ml-color-bg)',
					outline: '1px dashed var(--ml-color-border)',
				}}
			>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {};
