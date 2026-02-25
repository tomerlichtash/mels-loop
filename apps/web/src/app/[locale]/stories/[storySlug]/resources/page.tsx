import {
	getResources,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import type { Locale } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { ContentRenderer } from '@mels-loop/ui/content';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import { Heading, Stack } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

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
	const resourcesLabel = dictGet(dict, 'nav.resources');

	return (
		<Stack gap="lg">
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
					{ label: storyTitle, href: `/stories/${storySlug}` },
					{ label: resourcesLabel },
				]}
			/>
			{content.metadata.title && (
				<Heading level={1}>{content.metadata.title}</Heading>
			)}
			<ContentRenderer hast={content.hast} />
		</Stack>
	);
}
