import {
	getContentDir,
	getStoryConfig,
	loadMarkdownFile,
} from '@mels-loop/content-pipeline/loaders';
import type { Locale } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { ContentRenderer } from '@mels-loop/ui/content';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import { Heading, Stack, Text } from '@mels-loop/ui/primitives';
import fs from 'fs/promises';
import { notFound } from 'next/navigation';
import path from 'path';

import { StoryPopoverProvider } from '@/components/StoryPopoverProvider';
import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string; pageSlug: string }>;
}

export default async function CodexSubPage({ params }: PageProps) {
	const { locale, storySlug, pageSlug } = await params;
	const typedLocale = locale as Locale;

	const filePath = path.join(
		getContentDir(),
		'stories',
		storySlug,
		'codex',
		pageSlug,
		`index.${locale}.md`,
	);

	try {
		await fs.access(filePath);
	} catch {
		notFound();
	}

	const [content, config, dict] = await Promise.all([
		loadMarkdownFile(filePath),
		getStoryConfig(storySlug),
		getDictionary(typedLocale),
	]);

	const storyTitle = config.title[typedLocale];
	const codexLabel = dictGet(dict, 'nav.codex');
	const pageTitle =
		content.metadata.title ||
		pageSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

	return (
		<Stack gap="lg">
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
					{ label: storyTitle, href: `/stories/${storySlug}` },
					{ label: codexLabel, href: `/stories/${storySlug}/codex` },
					{ label: pageTitle },
				]}
			/>
			{content.metadata.title && (
				<Heading order={1}>{content.metadata.title}</Heading>
			)}
			{content.metadata.abstract && (
				<Text size="lg" color="dimmed" italic>
					{content.metadata.abstract}
				</Text>
			)}
			<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
				<ContentRenderer hast={content.hast} />
			</StoryPopoverProvider>
		</Stack>
	);
}
