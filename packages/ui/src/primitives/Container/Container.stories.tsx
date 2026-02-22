import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
	title: 'Primitives/Container',
	component: Container,
	tags: ['autodocs'],
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

export const PaddingHorizontal: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
			{(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
				<div
					key={size}
					style={{
						background: 'var(--ml-color-bg)',
						outline: '1px dashed var(--ml-color-border)',
					}}
				>
					<Container paddingHorizontal={size}>
						<div
							style={{
								background: 'var(--ml-color-surface)',
								border: '1px dashed var(--ml-color-border)',
								padding: '4px',
								fontSize: '12px',
							}}
						>
							paddingHorizontal="{size}"
						</div>
					</Container>
				</div>
			))}
		</div>
	),
};

export const PaddingVertical: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
			{(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
				<div
					key={size}
					style={{
						background: 'var(--ml-color-bg)',
						outline: '1px dashed var(--ml-color-border)',
					}}
				>
					<Container paddingVertical={size}>
						<div
							style={{
								background: 'var(--ml-color-surface)',
								border: '1px dashed var(--ml-color-border)',
								padding: '4px',
								fontSize: '12px',
							}}
						>
							paddingVertical="{size}"
						</div>
					</Container>
				</div>
			))}
		</div>
	),
};
