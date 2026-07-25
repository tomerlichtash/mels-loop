import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
	title: 'Navigation/Tabs',
	component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	args: {
		'aria-label': 'Sections',
		items: [
			{ key: 'full', href: '#full', label: 'Full Text', active: true },
			{ key: 'articles', href: '#articles', label: 'Articles', count: 3 },
			{ key: 'documents', href: '#documents', label: 'Documents', count: 1 },
			{ key: 'sources', href: '#sources', label: 'Sources', count: 46 },
		],
	},
};

/** Enough tabs to overflow: chevrons and a fade appear on the overflowing side only. */
export const Overflowing: Story = {
	args: {
		'aria-label': 'Sections',
		items: Array.from({ length: 12 }, (_, i) => ({
			key: `t${i}`,
			href: `#t${i}`,
			label: `Section ${i + 1}`,
			active: i === 0,
		})),
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 380 }}>
				<Story />
			</div>
		),
	],
};
