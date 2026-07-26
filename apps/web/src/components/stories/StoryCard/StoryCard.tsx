'use client';

import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardMedia,
	Text,
} from '@mels-loop/ui/primitives';

import { type Stat, StoryStats } from '../StoryStats/StoryStats';
import styles from './StoryCard.module.css';

interface StoryCardProps {
	slug: string;
	title: string;
	abstract: string;
	thumbnailUrl?: string;
	/** How much there is to read, and how much it rests on. */
	stats?: Stat[];
}

export function StoryCard({
	slug,
	title,
	abstract,
	thumbnailUrl,
	stats,
}: StoryCardProps) {
	return (
		<Card variant="outlined" padding="md" interactive href={`/stories/${slug}`}>
			{thumbnailUrl && <CardMedia src={thumbnailUrl} alt={title} />}
			<CardHeader>
				<Text className={styles.title}>{title}</Text>
			</CardHeader>
			<CardBody>
				<Text variant="body2" color="muted" component="p">
					{abstract}
				</Text>
			</CardBody>
			{stats && stats.length > 0 && (
				<CardFooter>
					<StoryStats stats={stats} />
				</CardFooter>
			)}
		</Card>
	);
}
