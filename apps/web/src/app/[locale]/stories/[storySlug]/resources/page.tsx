import { notFound } from 'next/navigation';
import { Heading, Stack } from '@mels-loop/ui/primitives';
import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@/i18n';
import {
	getResources,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import { ContentRenderer } from '@mels-loop/ui/content';
import { homeItem, dictGet } from '@/lib/breadcrumbs';
import { Breadcrumbs } from '@mels-loop/ui/layout';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export default async function ResourcesPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const [content, config, dict] = await Promise.all([
		getResources(storySlug, typedLocale),
		getStoryConfig(storySlug),
		getDictionary(typedLocale),
	]);

	if (!content) notFound();

	const storyTitle = config.title[typedLocale];
	const resourcesLabel = dictGet(
		dict as Record<string, unknown>,
		'nav.resources',
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
					{ label: resourcesLabel },
				]}
			/>
			{content.metadata.title && (
				<Heading order={1}>{content.metadata.title}</Heading>
			)}
			<ContentRenderer hast={content.hast} />
		</Stack>
	);
}
