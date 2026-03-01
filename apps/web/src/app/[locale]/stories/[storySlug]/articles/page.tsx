import { getStoryArticles, getStoryConfig } from '@mels-loop/content/loaders';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Card, Container, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';

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
	const articlesLabel = dictGet(dict, 'nav.articles');

	return (
		<Container gap="lg">
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
					{ label: storyTitle, href: `/stories/${storySlug}` },
					{ label: articlesLabel },
				]}
			/>
			<Text variant="h1">
				{articlesLabel} &mdash; {storyTitle}
			</Text>
			{(await getStoryArticles(storySlug)).map((slug) => (
				<Card key={slug} variant="outlined" padding="md">
					<Container direction="row" justify="between">
						<Text weight={500} component="span" capitalize>
							{slug.replace(/-/g, ' ')}
						</Text>
						<Link href={`/stories/${storySlug}/articles/${slug}`}>Read</Link>
					</Container>
				</Card>
			))}
		</Container>
	);
}
