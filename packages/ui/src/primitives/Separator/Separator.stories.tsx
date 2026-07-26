import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
	title: 'Layout/Separator',
	component: Separator,
	args: {
		orientation: 'horizontal',
		decorative: true,
	},
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical'],
		},
		decorative: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
	render: (args) => (
		<div
			style={{
				display: 'flex',
				height: args.orientation === 'vertical' ? 200 : 'auto',
			}}
		>
			<Separator {...args} />
		</div>
	),
};
