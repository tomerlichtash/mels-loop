import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'Primitives/Tooltip',
	component: Tooltip,
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
