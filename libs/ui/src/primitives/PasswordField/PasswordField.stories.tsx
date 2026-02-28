import { LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { PasswordField } from './PasswordField';

const iconMap: Record<string, React.ReactNode> = {
	none: undefined,
	lock: <LockClosedIcon />,
	person: <PersonIcon />,
};

const iconOptions = Object.keys(iconMap);

const meta: Meta<typeof PasswordField> = {
	title: 'Input/PasswordField',
	component: PasswordField,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		radius: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg'],
		},
		label: { control: 'text' },
		error: { control: 'boolean' },
		errorMessage: { control: 'text' },
		fullWidth: { control: 'boolean' },
		disabled: { control: 'boolean' },
		readOnly: { control: 'boolean' },
		required: { control: 'boolean' },
		placeholder: { control: 'text' },
		tooltip: { control: 'boolean' },
		iconStart: {
			control: 'select',
			options: iconOptions,
			mapping: iconMap,
		},
	},
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {
	args: {
		label: 'Password',
		placeholder: 'Enter password...',
		size: 'md',
		radius: 'md',
		error: false,
		errorMessage: '',
		fullWidth: false,
		disabled: false,
		readOnly: false,
		required: false,
		tooltip: false,
		iconStart: 'lock' as unknown as React.ReactNode,
	},
};
