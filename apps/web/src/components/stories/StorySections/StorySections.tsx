'use client';

import {
	BookmarkIcon,
	DrawingPinIcon,
	Pencil2Icon,
	ReaderIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

import styles from './StorySections.module.css';

export interface StorySection {
	key: 'codex' | 'articles' | 'documents' | 'sources';
	label: string;
	count?: number;
	href: string;
}

const sectionIcons: Record<string, ReactNode> = {
	codex: <ReaderIcon className={styles.icon} />,
	articles: <Pencil2Icon className={styles.icon} />,
	documents: <BookmarkIcon className={styles.icon} />,
	sources: <DrawingPinIcon className={styles.icon} />,
};

interface StorySectionsProps {
	sections: StorySection[];
}

export function StorySections({ sections }: StorySectionsProps) {
	const segment = useSelectedLayoutSegment();
	const activeKey = segment ?? 'codex';

	if (sections.length === 0) return null;

	return (
		<div className={styles.root}>
			<nav className={styles.inner} aria-label="Story sections">
				{sections.map((section) => {
					const isActive = section.key === activeKey;
					return (
						<Link
							key={section.key}
							href={section.href}
							className={[styles.section, isActive && styles.sectionActive]
								.filter(Boolean)
								.join(' ')}
						>
							{sectionIcons[section.key]}
							<span className={styles.label}>{section.label}</span>
							{section.count != null && (
								<span className={styles.count}>({section.count})</span>
							)}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
