'use client';

import {
	Card,
	CardBody,
	CardHeader,
	CardMedia,
	Text,
} from '@mels-loop/ui/primitives';

import styles from './StoryCard.module.css';

interface StoryCardProps {
	slug: string;
	title: string;
	abstract: string;
	thumbnailUrl?: string;
}

export function StoryCard({
	slug,
	title,
	abstract,
	thumbnailUrl,
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
		</Card>
	);
}
