import type { ContentMetadata } from '@mels-loop/content-pipeline/types';
import { Container } from '@mels-loop/ui/primitives';

import { PostCard } from '../PostCard/PostCard';

interface PostListProps {
	posts: Array<{ slug: string; metadata: ContentMetadata }>;
	locale: string;
}

export function PostList({ posts, locale }: PostListProps) {
	return (
		<Container gap="sm">
			{posts.map((post) => (
				<PostCard
					key={post.slug}
					slug={post.slug}
					locale={locale}
					title={post.metadata.title}
					date={post.metadata.date}
				/>
			))}
		</Container>
	);
}
