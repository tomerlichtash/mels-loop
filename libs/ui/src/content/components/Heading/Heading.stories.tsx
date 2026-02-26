import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
	title: 'Content/Heading',
	component: Heading,
	args: {
		level: 1,
		children: 'Content Heading',
	},
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const Levels: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Heading level={1}>Heading 1</Heading>
			<Heading level={2}>Heading 2</Heading>
			<Heading level={3}>Heading 3</Heading>
			<Heading level={4}>Heading 4</Heading>
			<Heading level={5}>Heading 5</Heading>
			<Heading level={6}>Heading 6</Heading>
		</div>
	),
};
