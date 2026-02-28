import { Card, Container, Text } from '@mels-loop/ui/primitives';

import styles from './PostCard.module.css';

interface PostCardProps {
	slug: string;
	locale: string;
	title?: string;
	date?: string;
}

export function PostCard({ slug, title, date }: PostCardProps) {
	const displayTitle = title ?? slug.replace(/-/g, ' ');

	return (
		<Card variant="outlined" padding="md">
			<Container direction="row" justify="between" align="start">
				<div>
					<Text weight={500} component="span">
						{displayTitle}
					</Text>
					{date && (
						<Text variant="caption" color="muted">
							{date}
						</Text>
					)}
				</div>
				<a href={`/posts/${slug}`} className={styles.link}>
					Read
				</a>
			</Container>
		</Card>
	);
}
