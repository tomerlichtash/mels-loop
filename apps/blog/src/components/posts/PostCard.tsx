import { Card, Group, Text } from '@mels-loop/ui/primitives';

import styles from './PostCard.module.css';

interface PostCardProps {
	slug: string;
	locale: string;
	title?: string;
	date?: string;
}

export function PostCard({ slug, title, date }: PostCardProps) {
	const displayTitle = title || slug.replace(/-/g, ' ');

	return (
		<Card withBorder padding="md">
			<Group justify="space-between" align="start">
				<div>
					<Text weight={500} component="span">
						{displayTitle}
					</Text>
					{date && (
						<Text size="xs" color="dimmed">
							{date}
						</Text>
					)}
				</div>
				<a href={`/posts/${slug}`} className={styles.link}>
					Read
				</a>
			</Group>
		</Card>
	);
}
