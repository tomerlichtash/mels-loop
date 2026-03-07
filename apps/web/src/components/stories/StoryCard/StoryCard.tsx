'use client';

import type { StoryConfig } from '@mels-loop/content-loaders/types';
import {
	Card,
	CardBody,
	CardHeader,
	CardMedia,
	Text,
} from '@mels-loop/ui/primitives';

import type { Locale } from '@/i18n-init';

import styles from './StoryCard.module.css';

interface StoryCardProps {
	config: StoryConfig;
	locale: Locale;
	thumbnailUrl?: string;
}

export function StoryCard({ config, locale, thumbnailUrl }: StoryCardProps) {
	return (
		<Card
			variant="outlined"
			shadow="lg"
			padding="md"
			interactive
			href={`/stories/${config.slug}`}
		>
			{thumbnailUrl && (
				<CardMedia src={thumbnailUrl} alt={config.title[locale]} />
			)}
			<CardHeader>
				<Text className={styles.title}>{config.title[locale]}</Text>
			</CardHeader>
			<CardBody>
				<Text variant="body2" color="muted" component="p">
					{config.abstract[locale]}
				</Text>
			</CardBody>
		</Card>
	);
}
