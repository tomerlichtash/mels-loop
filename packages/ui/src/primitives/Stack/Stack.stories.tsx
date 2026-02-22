import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const items = ['Item one', 'Item two', 'Item three'];

const meta: Meta<typeof Stack> = {
	title: 'Primitives/Stack',
	component: Stack,
	tags: ['autodocs'],
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

export const Gaps: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
					<Stack gap={gap}>
						{items.map((item) => (
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
						))}
					</Stack>
				</div>
			))}
		</div>
	),
};

export const AlignCenter: Story = {
	args: { align: 'center' },
};
