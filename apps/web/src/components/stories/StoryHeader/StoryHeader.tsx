import { Avatar, Text } from '@mels-loop/ui/primitives';
import NextImage from 'next/image';

import { StoryIdentityLink } from '../StoryTitle/StoryTitle';
import styles from './StoryHeader.module.css';

/*
 * The avatar's widest rendering — 6rem at Avatar's xl size. Mobile draws it at
 * 56px and simply scales this down, which is cheaper than a second request.
 *
 * next/image builds the srcset from this, so the browser fetches roughly 1.5 KB
 * at 1x and 5 KB at 2x. Left to the plain <img> the primitive renders from
 * `src`, it fetched the 2 MB original instead.
 */
const AVATAR_PX = 96;

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
				<StoryIdentityLink href={`/stories/${storySlug}`}>
					{(avatarSrc || avatarFallback) && (
						<Avatar
							image={
								avatarSrc && (
									<NextImage
										src={avatarSrc}
										alt={avatarAlt ?? ''}
										width={AVATAR_PX}
										height={AVATAR_PX}
									/>
								)
							}
							alt={avatarAlt}
							fallback={avatarFallback}
							size="xl"
							className={styles.avatar}
						/>
					)}
					<div className={styles.titleBlock}>
						<Text variant="h1" className={styles.title}>
							{title}
						</Text>
						{abstract && <Text variant="subtitle1">{abstract}</Text>}
					</div>
				</StoryIdentityLink>
			</div>
		</div>
	);
}
