import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'Primitives/Tooltip',
	component: Tooltip,
	args: {
		label: 'Tooltip content',
		side: 'bottom',
		delayDuration: 0,
	},
	argTypes: {
		label: { control: 'text' },
		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
		},
		delayDuration: { control: { type: 'number', min: 0, step: 100 } },
		paddingHorizontal: {
			control: 'select',
			options: { none: '', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' },
		},
		paddingVertical: {
			control: 'select',
			options: { none: '', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' },
		},
		children: { table: { disable: true } },
		className: { table: { disable: true } },
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	render: (args) => (
		<div
			style={{
				padding: 100,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: 300,
			}}
		>
			<Tooltip {...args}>
				<Button>Hover me</Button>
			</Tooltip>
		</div>
	),
};

export const Sides: Story = {
	render: () => (
		<div
			style={{
				padding: 100,
				display: 'flex',
				gap: 24,
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: 300,
			}}
		>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Tooltip key={side} label={`${side} tooltip`} side={side}>
					<Button>{side}</Button>
				</Tooltip>
			))}
		</div>
	),
};
