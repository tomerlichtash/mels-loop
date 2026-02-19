import { notFound } from 'next/navigation';
import { Title, Text, Stack } from '@mels-loop/ui/primitives';
import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@mels-loop/i18n/server';
import {
	getCodex,
	getStoryConfig,
	getAllAnnotations,
	getAllGlossaryTerms,
} from '@mels-loop/content-pipeline/loaders';
import {
	ContentRenderer,
	AnnotationProvider,
	AnnotationAwareLink,
} from '@mels-loop/ui/content';
import { homeItem, dictGet } from '@/lib/breadcrumbs';
import { StoryShell } from '@/components/story/StoryShell';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export default async function CodexPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const [content, annotations, glossary, config, dict] = await Promise.all([
		getCodex(storySlug, typedLocale),
		getAllAnnotations(storySlug, typedLocale),
		getAllGlossaryTerms(typedLocale),
		getStoryConfig(storySlug),
		getDictionary(typedLocale),
	]);

	if (!content) notFound();

	const storyTitle = config.title[typedLocale];
	const codexLabel = dictGet(dict as Record<string, unknown>, 'nav.codex');

	return (
		<StoryShell
			storySlug={storySlug}
			locale={typedLocale}
			activePath="codex"
			breadcrumbs={[
				homeItem(locale, dictGet(dict as Record<string, unknown>, 'nav.home')),
				{ label: storyTitle, href: `/stories/${storySlug}` },
				{ label: codexLabel },
			]}
		>
			<Stack gap="lg">
				{content.metadata.title && (
					<Title order={1}>{content.metadata.title}</Title>
				)}
				{content.metadata.abstract && (
					<Text size="lg" color="dimmed" italic>
						{content.metadata.abstract}
					</Text>
				)}
				<AnnotationProvider annotations={annotations} glossary={glossary}>
					<ContentRenderer
						hast={content.hast}
						components={{ a: AnnotationAwareLink }}
					/>
				</AnnotationProvider>
			</Stack>
		</StoryShell>
	);
}
