import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
	title: 'Primitives/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	args: {
		label: 'Tooltip content',
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	render: (args) => (
		<Tooltip {...args}>
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	),
};

export const Sides: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '32px',
				padding: '64px',
				justifyContent: 'center',
			}}
		>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Tooltip key={side} label={`Side: ${side}`} side={side}>
					<Button variant="outline">{side}</Button>
				</Tooltip>
			))}
		</div>
	),
};
