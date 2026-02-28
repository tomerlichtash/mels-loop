import type { Meta, StoryObj } from '@storybook/react';

import { FormField } from '../FormField/FormField';
import { Label } from '../Label/Label';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
	title: 'Primitives/Textarea',
	component: Textarea,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		error: { control: 'boolean' },
		disabled: { control: 'boolean' },
		readOnly: { control: 'boolean' },
		required: { control: 'boolean' },
		placeholder: { control: 'text' },
		label: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
	args: {
		label: 'Label',
		placeholder: 'Enter message...',
		size: 'md',
		error: false,
		disabled: false,
		readOnly: false,
		required: false,
	},
	render: ({ required, error, label, ...args }) => (
		<FormField error={error ? 'This field is required' : undefined}>
			<Label htmlFor="textarea" required={required}>
				{label}
			</Label>
			<Textarea id="textarea" required={required} error={error} {...args} />
		</FormField>
	),
};
