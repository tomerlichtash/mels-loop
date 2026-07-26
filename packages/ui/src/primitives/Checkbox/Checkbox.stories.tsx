import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Checkbox, type CheckboxProps } from './Checkbox';

function CheckboxExample(args: CheckboxProps) {
	const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
	return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
}

const meta: Meta<typeof Checkbox> = {
	title: 'Input/Checkbox',
	component: Checkbox,
	argTypes: {
		checked: {
			control: 'select',
			options: [true, false, 'indeterminate'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		label: { control: 'text' },
		error: { control: 'boolean' },
		errorMessage: { control: 'text' },
		disabled: { control: 'boolean' },
		required: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		label: 'Accept terms',
		size: 'md',
		error: false,
		errorMessage: '',
		disabled: false,
		required: false,
	},
	render: (args) => <CheckboxExample {...args} />,
};
