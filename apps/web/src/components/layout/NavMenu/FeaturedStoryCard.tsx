import { useTranslation } from '@mels-loop/i18n/client';
import { Badge } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import type { NavStoryItem } from '../types';
import styles from './NavMenu.module.css';

interface FeaturedStoryCardProps {
	story?: NavStoryItem;
	fallbackHref: string;
	onSelect?: () => void;
}

export function FeaturedStoryCard({
	story,
	fallbackHref,
	onSelect,
}: FeaturedStoryCardProps) {
	const { t } = useTranslation();
	const href = story ? `/stories/${story.slug}` : fallbackHref;

	return (
		<Link href={href} className={styles.featured} onClick={onSelect}>
			<div className={styles.featuredBody}>
				<Badge radius="sm" variant="contained" className={styles.featuredBadge}>
					{t('featured.badge')}
				</Badge>
				<span className={styles.contentTitle}>{t('featured.title')}</span>
				<span className={styles.contentDescription}>
					{t('featured.subtitle')}
				</span>
			</div>
		</Link>
	);
}
