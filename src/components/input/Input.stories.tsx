import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
	title: 'UI/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		label: 'Input',
		name: 'name',
		required: true,
		icon: 'pencil',
		placeholder: 'Placeholder',
		type: 'text',
		translateFn: (s: string) => `%${s.toUpperCase()}%`,
	},
	render: ({ label, name, icon, required, placeholder, type, translateFn }) => (
		<Input
			label={label}
			name={name}
			icon={icon}
			required={required}
			placeholder={placeholder}
			type={type}
			translateFn={translateFn}
		/>
	),
};
