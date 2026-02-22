import type { Meta, StoryObj } from '@storybook/react';

import { Group } from './Group';

const items = ['Alpha', 'Beta', 'Gamma', 'Delta'];

const meta: Meta<typeof Group> = {
	title: 'Primitives/Group',
	component: Group,
	tags: ['autodocs'],
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

export const Gaps: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
				<div key={gap}>
					<div
						style={{
							fontSize: '12px',
							marginBottom: '4px',
							color: 'var(--ml-color-text-dimmed)',
						}}
					>
						gap="{gap}"
					</div>
					<Group gap={gap}>
						{items.map((item) => (
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
						))}
					</Group>
				</div>
			))}
		</div>
	),
};

export const JustifyBetween: Story = {
	args: { justify: 'space-between' },
};

export const JustifyCenter: Story = {
	args: { justify: 'center' },
};
