import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Combobox, type ComboboxOption } from './Combobox';

const countries: ComboboxOption[] = [
	{ value: 'us', label: 'United States' },
	{ value: 'gb', label: 'United Kingdom' },
	{ value: 'ca', label: 'Canada' },
	{ value: 'au', label: 'Australia' },
	{ value: 'de', label: 'Germany' },
	{ value: 'fr', label: 'France' },
	{ value: 'jp', label: 'Japan' },
	{ value: 'br', label: 'Brazil' },
	{ value: 'in', label: 'India' },
	{ value: 'mx', label: 'Mexico' },
	{ value: 'it', label: 'Italy' },
	{ value: 'es', label: 'Spain' },
];

const meta: Meta<typeof Combobox> = {
	title: 'Input/Combobox',
	component: Combobox,
	argTypes: {
		multiple: { control: 'boolean' },
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
		required: { control: 'boolean' },
		placeholder: { control: 'text' },
		emptyMessage: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Combobox>;

function DefaultExample({
	multiple,
	...args
}: React.ComponentProps<typeof Combobox>) {
	const [singleValue, setSingleValue] = useState('');
	const [multiValue, setMultiValue] = useState<string[]>([]);

	if (multiple) {
		return (
			<Combobox
				{...args}
				multiple
				options={countries}
				value={multiValue}
				onValueChange={setMultiValue}
			/>
		);
	}

	return (
		<Combobox
			{...args}
			options={countries}
			value={singleValue}
			onValueChange={setSingleValue}
		/>
	);
}

export const Default: Story = {
	args: {
		label: 'Country',
		placeholder: 'Select a country...',
		multiple: false,
		size: 'md',
		radius: 'md',
		error: false,
		errorMessage: '',
		fullWidth: false,
		disabled: false,
		required: false,
		emptyMessage: 'No results found',
	},
	render: (args) => <DefaultExample {...args} />,
};
