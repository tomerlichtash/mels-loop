'use client';

import { Button, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import styles from './FeaturedStory.module.css';

interface FeaturedStoryProps {
	slug: string;
	title: string;
	abstract: string;
	coverUrl?: string;
	stats?: { label: string; count: number }[];
	cta: string;
}

export function FeaturedStory({
	slug,
	title,
	abstract,
	coverUrl,
	stats,
	cta,
}: FeaturedStoryProps) {
	return (
		<Link href={`/stories/${slug}`} className={styles.root}>
			{coverUrl && (
				<div
					className={styles.cover}
					style={{ backgroundImage: `url(${coverUrl})` }}
				>
					{stats && stats.length > 0 && (
						<div className={styles.overlay}>
							{stats.map((stat) => (
								<span key={stat.label} className={styles.stat}>
									<span className={styles.statCount}>{stat.count}</span>
									{stat.label}
								</span>
							))}
						</div>
					)}
				</div>
			)}
			<div className={styles.content}>
				<Text variant="h2" className={styles.title}>
					{title}
				</Text>
				<Text variant="body1" className={styles.abstract}>
					{abstract}
				</Text>
				<div className={styles.cta}>
					<Button variant="outlined" size="sm" tabIndex={-1}>
						{cta}
					</Button>
				</div>
			</div>
		</Link>
	);
}
