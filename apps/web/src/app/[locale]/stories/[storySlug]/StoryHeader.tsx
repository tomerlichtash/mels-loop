import { Avatar, Text } from '@mels-loop/ui/primitives';

import styles from './StoryHeader.module.css';
import { StoryTitle } from './StoryTitle';

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
					{abstract && (
						<Text variant="subtitle1" color="muted">
							{abstract}
						</Text>
					)}
				</div>
			</div>
		</div>
	);
}
