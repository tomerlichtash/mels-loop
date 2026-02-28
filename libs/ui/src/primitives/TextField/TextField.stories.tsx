import {
	Cross2Icon,
	EnvelopeClosedIcon,
	LockClosedIcon,
	MagnifyingGlassIcon,
	PersonIcon,
} from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { InputAction } from '../_internal/InputAction/InputAction';
import { TextField } from './TextField';

const iconMap: Record<string, React.ReactNode> = {
	none: undefined,
	search: <MagnifyingGlassIcon />,
	person: <PersonIcon />,
	envelope: <EnvelopeClosedIcon />,
	lock: <LockClosedIcon />,
	close: <Cross2Icon />,
};

const iconOptions = Object.keys(iconMap);

const meta: Meta<typeof TextField> = {
	title: 'Input/TextField',
	component: TextField,
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
		iconStart: {
			control: 'select',
			options: iconOptions,
			mapping: iconMap,
		},
		iconEnd: {
			control: 'select',
			options: iconOptions,
			mapping: iconMap,
		},
	},
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
	args: {
		label: 'Label',
		placeholder: 'Enter text...',
		size: 'md',
		radius: 'md',
		error: false,
		errorMessage: '',
		fullWidth: false,
		disabled: false,
		readOnly: false,
		required: false,
		iconStart: 'none' as unknown as React.ReactNode,
		iconEnd: 'none' as unknown as React.ReactNode,
	},
};

function ClearableExample() {
	const [value, setValue] = useState('Hello world');
	return (
		<TextField
			label="Search"
			placeholder="Type to see clear button..."
			iconStart={<MagnifyingGlassIcon />}
			iconEnd={
				value ? (
					<InputAction aria-label="Clear" onClick={() => setValue('')}>
						<Cross2Icon />
					</InputAction>
				) : undefined
			}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}

export const Clearable: Story = {
	render: () => <ClearableExample />,
};
