import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
	title: 'Primitives/Grid',
	component: Grid,
	args: {
		columns: 3,
		gap: 'md',
		layout: 'grid',
	},
	argTypes: {
		columns: {
			control: 'select',
			options: [1, 2, 3, 4, 5, 6],
		},
		gap: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
		},
		layout: {
			control: 'select',
			options: ['grid', 'masonry'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
	render: (args) => (
		<Grid {...args}>
			{Array.from({ length: 6 }, (_, i) => (
				<div
					key={i}
					style={{
						padding: '2rem',
						background: 'var(--ml-surface-background-color)',
						borderRadius: 'var(--ml-radius-md)',
						border: '1px solid var(--ml-border-color)',
						textAlign: 'center',
					}}
				>
					Item {i + 1}
				</div>
			))}
		</Grid>
	),
};
