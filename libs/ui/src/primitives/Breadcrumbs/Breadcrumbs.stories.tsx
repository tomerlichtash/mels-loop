import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
	title: 'Primitives/Breadcrumbs',
	component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
	args: {
		items: [
			{ label: 'Home', href: '/' },
			{ label: 'Stories', href: '/stories' },
			{ label: 'Chapter 1' },
		],
	},
};

export const TwoItems: Story = {
	args: {
		items: [{ label: 'Home', href: '/' }, { label: 'Current Page' }],
	},
};

export const SingleItem: Story = {
	args: {
		items: [{ label: 'Home' }],
	},
};
