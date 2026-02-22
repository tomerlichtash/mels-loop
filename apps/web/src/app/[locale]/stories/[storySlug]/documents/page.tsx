import { Heading, Stack, Card, Group, Text } from '@mels-loop/ui/primitives';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@mels-loop/i18n/server';
import {
	getStoryConfig,
	getDocumentMeta,
} from '@mels-loop/content-pipeline/loaders';
import { homeItem, dictGet } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export default async function DocumentsListingPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;
	const [config, dict, documentsMeta] = await Promise.all([
		getStoryConfig(storySlug),
		getDictionary(typedLocale),
		getDocumentMeta(storySlug, typedLocale),
	]);

	const storyTitle = config.title[typedLocale];
	const documentsLabel = dictGet(
		dict as Record<string, unknown>,
		'nav.documents',
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
					{ label: documentsLabel },
				]}
			/>
			<Heading order={1}>
				{documentsLabel} &mdash; {storyTitle}
			</Heading>
			{documentsMeta.map((doc) => (
				<Card key={doc.slug} withBorder padding="md">
					<Group justify="space-between">
						<div>
							<Text weight={500} component="span">
								{doc.title}
							</Text>
							{doc.author && (
								<Text size="sm" color="dimmed">
									{doc.author}
								</Text>
							)}
						</div>
						<a href={`/stories/${storySlug}/documents/${doc.slug}`}>Read</a>
					</Group>
				</Card>
			))}
		</Stack>
	);
}
