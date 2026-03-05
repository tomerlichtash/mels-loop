import {
	getContentDir,
	loadMarkdownFile,
} from '@mels-loop/content-pipeline/loaders';
import { Container, Text } from '@mels-loop/ui/primitives';
import fs from 'fs/promises';
import { notFound } from 'next/navigation';
import path from 'path';

import { ContentRenderer, StoryPopoverProvider } from '@/content';
import type { Locale } from '@/i18n-init';

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

	const content = await loadMarkdownFile(filePath);

	return (
		<Container gap="lg">
			{content.metadata.title && (
				<Text variant="h1">{content.metadata.title}</Text>
			)}
			{content.metadata.abstract && (
				<Text variant="subtitle2" color="muted" italic>
					{content.metadata.abstract}
				</Text>
			)}
			<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
				<ContentRenderer hast={content.hast} />
			</StoryPopoverProvider>
		</Container>
	);
}
