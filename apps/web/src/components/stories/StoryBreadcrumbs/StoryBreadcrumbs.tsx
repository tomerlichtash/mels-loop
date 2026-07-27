'use client';

import { type BreadcrumbItem, Breadcrumbs } from '@mels-loop/ui/primitives';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

/** Maps section → slug → display title */
type ItemTitles = Record<string, Record<string, string>>;

interface StoryBreadcrumbsProps {
	homeLabel: string;
	storyTitle: string;
	storySlug: string;
	sectionLabels: Record<string, string>;
	itemTitles: ItemTitles;
}

function formatSlug(slug: string): string {
	return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function StoryBreadcrumbs({
	homeLabel,
	storyTitle,
	storySlug,
	sectionLabels,
	itemTitles,
}: StoryBreadcrumbsProps) {
	const segments = useSelectedLayoutSegments();

	/*
	 * No "Stories" crumb. It linked to an index of stories while the archive
	 * holds one — the page you were already on — and that index is hidden for
	 * now. It comes back with the second story.
	 */
	const items: BreadcrumbItem[] = [{ label: homeLabel, href: '/' }];

	if (segments.length === 0) {
		items.push({ label: storyTitle });
		return <Breadcrumbs items={items} linkComponent={Link} />;
	}

	items.push({ label: storyTitle, href: `/stories/${storySlug}` });

	const section = segments[0];
	const sectionLabel = sectionLabels[section] || section;

	if (segments.length === 1) {
		// Section listing page (e.g. /articles)
		items.push({ label: sectionLabel });
	} else {
		// Item page (e.g. /articles/some-slug)
		const itemSlug = segments[1];
		const itemTitle = itemTitles[section]?.[itemSlug] || formatSlug(itemSlug);
		items.push({
			label: sectionLabel,
			href: `/stories/${storySlug}/${section}`,
		});
		items.push({ label: itemTitle });
	}

	return <Breadcrumbs items={items} linkComponent={Link} />;
}
