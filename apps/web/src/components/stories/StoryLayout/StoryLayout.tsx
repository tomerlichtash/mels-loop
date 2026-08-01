'use client';

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

import styles from './StoryLayout.module.css';

/** Segments where the sidebar is hidden only on the exact listing page (not child routes). */
const HIDE_SIDEBAR_LISTING_ONLY = ['sources'];
/** Segments where the sidebar is always hidden (listing and children). */
const HIDE_SIDEBAR_ALWAYS = ['contents'];

interface StoryProps {
	children: ReactNode;
	sidebar?: ReactNode;
}

export function StoryLayout({ children, sidebar }: StoryProps) {
	const segment = useSelectedLayoutSegment();
	const pathname = usePathname();

	let showSidebar = !!sidebar;
	if (segment && HIDE_SIDEBAR_ALWAYS.includes(segment)) {
		showSidebar = false;
	} else if (segment && HIDE_SIDEBAR_LISTING_ONLY.includes(segment)) {
		// Hide on listing page (/sources) but show on detail (/sources/[id])
		const afterSegment = pathname.split(`/${segment}`)[1];
		const isListingPage = !afterSegment || afterSegment === '/';
		if (isListingPage) showSidebar = false;
	}

	return (
		<div className={styles.root}>
			{showSidebar ? (
				<div className={styles.layout}>
					<aside className={styles.sidebar}>
						{/* One sticky container, however many blocks the sidebar
						 * holds — per-child sticky broke the moment a second block
						 * (the people strip) joined the aside. */}
						<div className={styles.sidebarInner}>{sidebar}</div>
					</aside>
					<main className={styles.content}>{children}</main>
				</div>
			) : (
				<main>{children}</main>
			)}
		</div>
	);
}
