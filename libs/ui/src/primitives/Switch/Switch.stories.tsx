import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Switch, type SwitchProps } from './Switch';

function SwitchExample(args: SwitchProps) {
	const [checked, setChecked] = useState(false);
	return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
}

const meta: Meta<typeof Switch> = {
	title: 'Input/Switch',
	component: Switch,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		label: { control: 'text' },
		disabled: { control: 'boolean' },
		required: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
	args: {
		label: 'Enable notifications',
		size: 'md',
		disabled: false,
		required: false,
	},
	render: (args) => <SwitchExample {...args} />,
};
