import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { Container } from './Container';

type ContainerStoryArgs = ComponentProps<typeof Container> & {
	items?: number;
	showBorder?: boolean;
};

const Placeholder = ({ label }: { label: string }) => (
	<div
		style={{
			background: 'var(--ml-background-color-alt)',
			border: '1px dashed var(--ml-border-color)',
			borderRadius: 'var(--ml-radius-sm)',
			padding: 'var(--ml-space-sm) var(--ml-space-md)',
			color: 'var(--ml-text-color)',
			fontSize: '14px',
		}}
	>
		{label}
	</div>
);

const meta: Meta<ContainerStoryArgs> = {
	title: 'Layout/Container',
	component: Container,
	argTypes: {
		children: { control: false },
		paddingHorizontal: {
			control: 'select',
			options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
		},
		paddingVertical: {
			control: 'select',
			options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
		},
		direction: {
			control: 'select',
			options: ['column', 'row'],
		},
		gap: {
			control: 'select',
			options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
		},
		justify: {
			control: 'select',
			options: ['start', 'center', 'end', 'between', 'evenly'],
		},
		wrap: { control: 'boolean' },
		shadow: {
			control: 'select',
			options: ['none', 'xs', 'sm', 'md', 'lg'],
		},
		items: { control: { type: 'number', min: 1, max: 12 } },
		showBorder: { control: 'boolean' },
	},
	render: ({ items = 3, showBorder, ...args }) => (
		<div
			style={{
				outline: showBorder ? '1px dashed var(--ml-border-color)' : undefined,
			}}
		>
			<Container {...args}>
				{Array.from({ length: items }, (_, i) => (
					<Placeholder key={i} label={`Item ${i + 1}`} />
				))}
			</Container>
		</div>
	),
};

export default meta;
type Story = StoryObj<ContainerStoryArgs>;

export const Default: Story = {
	args: {
		paddingHorizontal: 'none',
		paddingVertical: 'none',
		direction: 'column',
		gap: 'md',
		align: 'start',
		justify: 'start',
		shadow: 'none',
		wrap: false,
		items: 3,
		showBorder: true,
	},
};
