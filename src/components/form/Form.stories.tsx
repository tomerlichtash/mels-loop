import type { Meta, StoryObj } from '@storybook/react';
import Form, { FormFieldProps } from './Form';
import * as yup from 'yup';

const meta = {
	title: 'Site/Form',
	component: Form,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const formFields: FormFieldProps[] = [
	{
		name: 'fullName',
		initialValue: '',
		required: true,
		label: 'Name',
		placeholder: 'Enter name',
		icon: 'person',
		component: 'input',
		type: 'text',
		validation: yup.string().required(),
	},
	{
		name: 'email',
		initialValue: '',
		required: true,
		label: 'Email',
		placeholder: 'Enter email',
		icon: 'closed-envelope',
		component: 'input',
		type: 'email',
		validation: yup.string().email().required(),
	},
];

export const Primary: Story = {
	args: {
		name: 'StoryForm',
		fields: formFields,
	},
	render: function Render({ name, fields }) {
		return <Form name={name} fields={fields} />;
	},
};
