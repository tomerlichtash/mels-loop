import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'Overlay/Tooltip',
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
			options: ['', 'xs', 'sm', 'md', 'lg'],
			mapping: { '': undefined, xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' },
		},
		paddingVertical: {
			control: 'select',
			options: ['', 'xs', 'sm', 'md', 'lg'],
			mapping: { '': undefined, xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' },
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
