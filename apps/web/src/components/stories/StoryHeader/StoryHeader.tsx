import { Avatar, Text } from '@mels-loop/ui/primitives';

import { StoryTitle } from '../StoryTitle/StoryTitle';
import styles from './StoryHeader.module.css';

interface StoryHeaderProps {
	title: string;
	storySlug: string;
	abstract?: string;
	cover?: string;
	avatarSrc?: string;
	avatarAlt?: string;
	avatarFallback?: string;
}

export function StoryHeader({
	title,
	storySlug,
	abstract,
	cover,
	avatarSrc,
	avatarAlt,
	avatarFallback,
}: StoryHeaderProps) {
	const rootClassName = cover
		? `${styles.root} ${styles.hasCover}`
		: styles.root;

	return (
		<div
			className={rootClassName}
			style={
				cover
					? ({ '--ml-story-cover': `url(${cover})` } as React.CSSProperties)
					: undefined
			}
		>
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
