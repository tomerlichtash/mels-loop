import { Avatar, Text } from '@mels-loop/ui/primitives';

import { StoryTitle } from '../StoryTitle/StoryTitle';
import styles from './StoryHeader.module.css';

interface StoryHeaderProps {
	title: string;
	storySlug: string;
	abstract?: string;
	avatarSrc?: string;
	avatarAlt?: string;
	avatarFallback?: string;
}

export function StoryHeader({
	title,
	storySlug,
	abstract,
	avatarSrc,
	avatarAlt,
	avatarFallback,
}: StoryHeaderProps) {
	return (
		<div className={styles.root}>
			<div className={styles.inner}>
				{(avatarSrc || avatarFallback) && (
					<Avatar
						src={avatarSrc}
						alt={avatarAlt}
						fallback={avatarFallback}
						size="xl"
						className={styles.avatar}
					/>
				)}
				<div className={styles.titleBlock}>
					<StoryTitle href={`/stories/${storySlug}`}>{title}</StoryTitle>
					{/* Not `color="muted"`: over the cover image it was illegible. */}
					{abstract && <Text variant="subtitle1">{abstract}</Text>}
				</div>
			</div>
		</div>
	);
}
