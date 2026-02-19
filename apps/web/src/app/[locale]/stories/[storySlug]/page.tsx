import { Title, Text } from '@mels-loop/ui/primitives';
import type { Locale } from '@mels-loop/i18n/config';
import { locales } from '@mels-loop/i18n/config';
import { getDictionary } from '@mels-loop/i18n/server';
import {
	getCodex,
	getStoryConfig,
	getAllStories,
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
import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	return stories.flatMap((storySlug) =>
		locales.map((locale) => ({ locale, storySlug })),
	);
}

export default async function StoryLandingPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;
	const [config, content, annotations, glossary, dict] = await Promise.all([
		getStoryConfig(storySlug),
		getCodex(storySlug, typedLocale),
		getAllAnnotations(storySlug, typedLocale),
		getAllGlossaryTerms(typedLocale),
		getDictionary(typedLocale),
	]);

	const storyTitle = content?.metadata.title || config.title[typedLocale];
	const storySubtitle = content?.metadata.subtitle;

	return (
		<StoryShell
			storySlug={storySlug}
			locale={typedLocale}
			breadcrumbs={[
				homeItem(locale, dictGet(dict as Record<string, unknown>, 'nav.home')),
				{
					label: dictGet(dict as Record<string, unknown>, 'stories'),
					href: '/stories',
				},
				{ label: storyTitle },
			]}
		>
			<div className={styles.header}>
				<Title order={1}>{storyTitle}</Title>
				{storySubtitle && (
					<Text size="lg" color="dimmed">
						{storySubtitle}
					</Text>
				)}
			</div>

			{content && (
				<AnnotationProvider annotations={annotations} glossary={glossary}>
					<ContentRenderer
						hast={content.hast}
						components={{ a: AnnotationAwareLink }}
					/>
				</AnnotationProvider>
			)}
		</StoryShell>
	);
}
