'use client';

import { Chip } from '@mels-loop/ui/primitives';
import {
	BookmarkIcon,
	Cross2Icon,
	DrawingPinIcon,
	Pencil2Icon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import styles from './StoryMeta.module.css';

export interface StoryStat {
	icon: 'articles' | 'documents' | 'sources';
	label: string;
	count: number;
	href: string;
}

const statIcons = {
	articles: Pencil2Icon,
	documents: BookmarkIcon,
	sources: DrawingPinIcon,
};

interface StoryMetaProps {
	stats: StoryStat[];
	storySlug: string;
}

export function StoryMeta({ stats, storySlug }: StoryMetaProps) {
	const segment = useSelectedLayoutSegment();
	const hasSelection = stats.some((s) => s.icon === segment);

	if (stats.length === 0) return null;

	return (
		<div className={styles.root}>
			<div className={styles.inner}>
				{stats.map((stat) => {
					const Icon = statIcons[stat.icon];
					const isActive = segment === stat.icon;
					return (
						<Link key={stat.icon} href={stat.href} className={styles.stat}>
							<Chip
								size="md"
								radius="sm"
								variant="outlined"
								className={isActive ? styles.chipActive : styles.chip}
							>
								<Icon className={styles.statIcon} />
								<span className={styles.statLabel}>{stat.label}</span>
								<span className={styles.statCount}>({stat.count})</span>
							</Chip>
						</Link>
					);
				})}
				{hasSelection && (
					<Link
						href={`/stories/${storySlug}`}
						className={styles.close}
						aria-label="Clear selection"
					>
						<Cross2Icon />
					</Link>
				)}
			</div>
		</div>
	);
}
