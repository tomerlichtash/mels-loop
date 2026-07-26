import type { Meta, StoryObj } from '@storybook/react';

import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
	title: 'Content/ScrollArea',
	component: ScrollArea,
	argTypes: {
		type: {
			control: 'select',
			options: ['auto', 'always', 'scroll', 'hover'],
		},
		orientation: {
			control: 'select',
			options: ['vertical', 'horizontal'],
		},
		maxHeight: { control: 'text' },
	},
	args: {
		type: 'auto',
		orientation: 'vertical',
		maxHeight: '160px',
	},
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
	render: (args) => (
		<div style={{ width: 280 }}>
			<ScrollArea {...args}>
				{Array.from({ length: 12 }, (_, i) => (
					<p key={i} style={{ margin: '0 0 8px' }}>
						Line {i + 1} — content tall enough to overflow the viewport.
					</p>
				))}
			</ScrollArea>
		</div>
	),
};
