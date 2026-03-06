'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

import styles from './StoryLayout.module.css';

const HIDE_SIDEBAR_SEGMENTS = ['sources'];

interface StoryProps {
	children: ReactNode;
	sidebar?: ReactNode;
}

export function StoryLayout({ children, sidebar }: StoryProps) {
	const segment = useSelectedLayoutSegment();
	const showSidebar = sidebar && !HIDE_SIDEBAR_SEGMENTS.includes(segment ?? '');

	return (
		<div className={styles.root}>
			{showSidebar ? (
				<div className={styles.layout}>
					<main className={styles.content}>{children}</main>
					<aside className={styles.sidebar}>{sidebar}</aside>
				</div>
			) : (
				<main>{children}</main>
			)}
		</div>
	);
}
