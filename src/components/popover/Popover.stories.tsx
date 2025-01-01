import type { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';

const meta = {
	title: 'UI/Popover',
	component: Popover,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		trigger: 'Trigger',
		locale: 'en',
		side: 'right',
	},
	render: function Render({ trigger, locale, side }) {
		return (
			<Popover trigger={trigger} locale={locale} side={side}>
				Content
			</Popover>
		);
	},
};

// export const FromChildren: Story = {
// 	args: {
// 		message: 'Some error occured',
// 	},
// 	render: function Render({ message }) {
// 		return <Popover>{message}</Popover>;
// 	},
// };
