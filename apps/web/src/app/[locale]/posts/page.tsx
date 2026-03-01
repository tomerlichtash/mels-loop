import { getAllPosts, getPost } from '@mels-loop/content-pipeline/loaders';
import { dictGet } from '@mels-loop/i18n/dict';
import { Container, Text } from '@mels-loop/ui/primitives';

import { PostList } from '@/components/PostList/PostList';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function PostsListingPage({ params }: PageProps) {
	const { locale } = await params;
	const dict = await getDictionary(locale as Locale);
	const slugs = await getAllPosts();

	const posts = (
		await Promise.all(
			slugs.map(async (slug) => {
				const content = await getPost(slug, locale as Locale);
				return content ? { slug, metadata: content.metadata } : null;
			}),
		)
	)
		.filter(Boolean)
		.reverse();

	return (
		<Container>
			<Container gap="lg">
				<Text variant="h1">{dictGet(dict, 'nav.blog')}</Text>
				<PostList
					posts={posts as Parameters<typeof PostList>[0]['posts']}
					locale={locale}
				/>
			</Container>
		</Container>
	);
}
