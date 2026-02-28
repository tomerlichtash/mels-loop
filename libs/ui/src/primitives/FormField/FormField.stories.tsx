import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Label/Label';
import { TextInput } from '../TextInput/TextInput';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
	title: 'Primitives/FormField',
	component: FormField,
	argTypes: {
		error: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
	args: {
		error: '',
	},
	render: ({ error }) => (
		<FormField error={error}>
			<Label htmlFor="email">Email address</Label>
			<TextInput id="email" placeholder="you@example.com" error={!!error} />
		</FormField>
	),
};
