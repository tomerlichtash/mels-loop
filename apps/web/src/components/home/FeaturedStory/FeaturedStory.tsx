'use client';

import { Button, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import { type Stat, StoryStats } from '../../stories/StoryStats/StoryStats';
import styles from './FeaturedStory.module.css';

interface FeaturedStoryProps {
	slug: string;
	title: string;
	abstract: string;
	coverUrl?: string;
	stats?: Stat[];
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
				/>
			)}
			<div className={styles.content}>
				<Text variant="h2" className={styles.title}>
					{title}
				</Text>
				<Text variant="body1" className={styles.abstract}>
					{abstract}
				</Text>
				{/*
				 * Under the abstract, where the cards below put theirs. These sat
				 * over the cover image, which meant a scrim darkening the picture to
				 * keep them legible and the counts landing across its subject — and
				 * the same two numbers appearing in two different places on one page.
				 */}
				{stats && <StoryStats stats={stats} />}
				<div className={styles.cta}>
					<Button variant="outlined" size="sm" tabIndex={-1}>
						{cta}
					</Button>
				</div>
			</div>
		</Link>
	);
}
