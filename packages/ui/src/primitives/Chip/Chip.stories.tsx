import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { Chip } from './Chip';

type ChipStoryArgs = ComponentProps<typeof Chip> & {
	dismissible?: boolean;
};

const meta: Meta<ChipStoryArgs> = {
	title: 'Content/Chip',
	component: Chip,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		radius: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg', 'pill'],
		},
		disabled: { control: 'boolean' },
		dismissible: { control: 'boolean' },
		dismissLabel: { control: 'text' },
		children: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<ChipStoryArgs>;

export const Default: Story = {
	args: {
		children: 'Option',
		size: 'md',
		radius: 'pill',
		disabled: false,
		dismissible: true,
		dismissLabel: '',
	},
	render: ({ dismissible, ...args }) => (
		<Chip {...args} onDismiss={dismissible ? () => {} : undefined} />
	),
};

export const Dismissible: Story = {
	args: {
		children: 'Remove me',
		size: 'md',
		onDismiss: () => {},
	},
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
			<Chip size="sm" onDismiss={() => {}}>
				Small
			</Chip>
			<Chip size="md" onDismiss={() => {}}>
				Medium
			</Chip>
			<Chip size="lg" onDismiss={() => {}}>
				Large
			</Chip>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
		onDismiss: () => {},
	},
};
