import type { Locale, StoryConfig } from '@mels-loop/content-pipeline/types';
import { Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import styles from './StoryCard.module.css';

interface StoryCardProps {
	config: StoryConfig;
	locale: Locale;
}

export function StoryCard({ config, locale }: StoryCardProps) {
	return (
		<div className={styles.root}>
			<Link href={`/stories/${config.slug}`} className={styles.title}>
				{config.title[locale]}
			</Link>
			<Text size="sm" color="dimmed" component="p" className={styles.abstract}>
				{config.abstract[locale]}
			</Text>
		</div>
	);
}
