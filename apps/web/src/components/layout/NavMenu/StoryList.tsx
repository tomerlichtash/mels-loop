import { useTranslation } from '@mels-loop/i18n/client';
import Link from 'next/link';

import type { NavStoryItem } from '../types';
import styles from './NavMenu.module.css';

interface StoryListProps {
	stories: NavStoryItem[];
	onSelect?: () => void;
}

export function StoryList({ stories, onSelect }: StoryListProps) {
	const { t } = useTranslation();

	if (stories.length === 0) return null;

	return (
		<>
			<p className={styles.sectionTitle}>{t('nav.moreStories')}</p>
			<div className={styles.storyList}>
				{stories.map((story) => (
					<Link
						key={story.slug}
						href={`/stories/${story.slug}`}
						className={styles.storyLink}
						onClick={onSelect}
					>
						<span className={styles.storyTitle}>{story.title}</span>
						<span className={styles.storySubtitle}>{story.abstract}</span>
					</Link>
				))}
			</div>
		</>
	);
}
