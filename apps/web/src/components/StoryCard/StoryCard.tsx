'use client';

import type { StoryConfig } from '@mels-loop/content/types';
import { Card, CardBody, CardHeader, Text } from '@mels-loop/ui/primitives';

import type { Locale } from '@/i18n-init';

import styles from './StoryCard.module.css';

interface StoryCardProps {
	config: StoryConfig;
	locale: Locale;
}

export function StoryCard({ config, locale }: StoryCardProps) {
	return (
		<Card
			variant="outlined"
			shadow="lg"
			padding="md"
			interactive
			href={`/stories/${config.slug}`}
		>
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
