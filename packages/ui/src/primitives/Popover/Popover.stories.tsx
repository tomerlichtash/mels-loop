import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
	title: 'Overlay/Popover',
	component: Popover,
	args: {
		side: 'bottom',
		align: 'center',
		sideOffset: 8,
		defaultOpen: true,
		trigger: <Button>Toggle Popover</Button>,
		children: <Text variant="body2">Popover content goes here.</Text>,
	},
	argTypes: {
		side: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right'],
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
		},
		sideOffset: { control: { type: 'number', min: 0, max: 32 } },
		defaultOpen: { control: 'boolean' },
	},
	render: (args) => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '400px',
			}}
		>
			<Popover {...args} />
		</div>
	),
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {};

export const Right: Story = {
	args: { side: 'right' },
};

export const Left: Story = {
	args: { side: 'left' },
};

export const Top: Story = {
	args: { side: 'top' },
};
