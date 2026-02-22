import {
	getDocumentMeta,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import type { Locale } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import { Card, Group, Heading, Stack, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

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
	const documentsLabel = dictGet(dict, 'nav.documents');

	return (
		<Stack gap="lg">
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
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
						<Link href={`/stories/${storySlug}/documents/${doc.slug}`}>
							Read
						</Link>
					</Group>
				</Card>
			))}
		</Stack>
	);
}
