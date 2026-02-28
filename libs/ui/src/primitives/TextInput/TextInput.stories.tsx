import type { Meta, StoryObj } from '@storybook/react';

import { FormField } from '../FormField/FormField';
import { Label } from '../Label/Label';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
	title: 'Primitives/TextInput',
	component: TextInput,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		radius: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg'],
		},
		error: { control: 'boolean' },
		fullWidth: { control: 'boolean' },
		disabled: { control: 'boolean' },
		readOnly: { control: 'boolean' },
		required: { control: 'boolean' },
		placeholder: { control: 'text' },
		label: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
	args: {
		label: 'Label',
		placeholder: 'Enter text...',
		size: 'md',
		radius: 'md',
		error: false,
		fullWidth: false,
		disabled: false,
		readOnly: false,
		required: false,
	},
	render: ({ required, error, label, ...args }) => (
		<FormField error={error ? 'This field is required' : undefined}>
			<Label htmlFor="text-input" required={required}>
				{label}
			</Label>
			<TextInput id="text-input" required={required} error={error} {...args} />
		</FormField>
	),
};
