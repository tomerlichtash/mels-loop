import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TimelineItem, TimelineNav, TimelineSection } from './TimelineNav';

const meta: Meta<typeof TimelineNav> = {
	title: 'Navigation/TimelineNav',
	component: TimelineNav,
	decorators: [
		(Story) => (
			<div style={{ width: 300 }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof TimelineNav>;

const items = [
	{ id: 'intro', label: 'Introduction', section: null },
	{ id: 'article-1', label: 'First Article', section: 'Articles' },
	{ id: 'article-2', label: 'Second Article', section: 'Articles' },
	{
		id: 'article-3',
		label: 'Third Article With a Longer Title That Wraps',
		section: 'Articles',
	},
	{ id: 'doc-1', label: 'Supporting Document', section: 'Appendix' },
];

function InteractiveTimeline() {
	const [activeId, setActiveId] = useState('article-1');

	const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
		const key = item.section ?? '';
		(acc[key] ??= []).push(item);
		return acc;
	}, {});

	return (
		<TimelineNav>
			<TimelineSection label="Table of Contents" labelHref="#contents" />
			{Object.entries(grouped).map(([section, sectionItems]) => (
				<TimelineSection key={section} label={section || undefined}>
					{sectionItems.map((item) => (
						<TimelineItem
							key={item.id}
							active={item.id === activeId}
							onClick={() => setActiveId(item.id)}
						>
							{item.label}
						</TimelineItem>
					))}
				</TimelineSection>
			))}
		</TimelineNav>
	);
}

export const Default: Story = {
	render: () => <InteractiveTimeline />,
};

export const SingleSection: Story = {
	render: () => (
		<TimelineNav>
			<TimelineSection label="Contents">
				<TimelineItem>Item One</TimelineItem>
				<TimelineItem active>Item Two (Active)</TimelineItem>
				<TimelineItem>Item Three</TimelineItem>
			</TimelineSection>
		</TimelineNav>
	),
};

export const LinkableHeaders: Story = {
	render: () => (
		<TimelineNav>
			<TimelineSection label="Overview" labelHref="#overview" />
			<TimelineSection label="Chapters" labelHref="#chapters">
				<TimelineItem>Chapter 1</TimelineItem>
				<TimelineItem>Chapter 2</TimelineItem>
			</TimelineSection>
			<TimelineSection label="References" labelHref="#refs">
				<TimelineItem>Source A</TimelineItem>
			</TimelineSection>
		</TimelineNav>
	),
};
