import { getAllPosts, getPost } from '@mels-loop/content-pipeline/loaders';
import type { Locale } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Container, Heading, Stack } from '@mels-loop/ui/primitives';

import { PostList } from '@/components/posts/PostList';
import { getDictionary } from '@/i18n';

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
			<Stack gap="lg">
				<Heading level={1}>{dictGet(dict, 'nav.blog')}</Heading>
				<PostList
					posts={posts as Parameters<typeof PostList>[0]['posts']}
					locale={locale}
				/>
			</Stack>
		</Container>
	);
}
