import Link from 'next/link';
import { Heading, Stack, Card, Group, Text } from '@mels-loop/ui/primitives';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@/i18n';
import {
	getStoryConfig,
	getStoryArticles,
} from '@mels-loop/content-pipeline/loaders';
import { homeItem, dictGet } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export default async function ArticlesListingPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;
	const [config, dict] = await Promise.all([
		getStoryConfig(storySlug),
		getDictionary(typedLocale),
	]);

	const storyTitle = config.title[typedLocale];
	const articlesLabel = dictGet(
		dict as Record<string, unknown>,
		'nav.articles',
	);

	return (
		<Stack gap="lg">
			<Breadcrumbs
				items={[
					homeItem(
						locale,
						dictGet(dict as Record<string, unknown>, 'nav.home'),
					),
					{ label: storyTitle, href: `/stories/${storySlug}` },
					{ label: articlesLabel },
				]}
			/>
			<Heading order={1}>
				{articlesLabel} &mdash; {storyTitle}
			</Heading>
			{(await getStoryArticles(storySlug)).map((slug) => (
				<Card key={slug} withBorder padding="md">
					<Group justify="space-between">
						<Text weight={500} component="span" capitalize>
							{slug.replace(/-/g, ' ')}
						</Text>
						<Link href={`/stories/${storySlug}/articles/${slug}`}>Read</Link>
					</Group>
				</Card>
			))}
		</Stack>
	);
}
