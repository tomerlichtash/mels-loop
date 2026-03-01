import {
	getDocumentMeta,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Card, Container, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
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
		<Container gap="lg">
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
					{ label: storyTitle, href: `/stories/${storySlug}` },
					{ label: documentsLabel },
				]}
			/>
			<Text variant="h1">
				{documentsLabel} &mdash; {storyTitle}
			</Text>
			{documentsMeta.map((doc) => (
				<Card key={doc.slug} variant="outlined" padding="md">
					<Container direction="row" justify="between">
						<div>
							<Text weight={500} component="span">
								{doc.title}
							</Text>
							{doc.author && (
								<Text variant="body2" color="muted">
									{doc.author}
								</Text>
							)}
						</div>
						<Link href={`/stories/${storySlug}/documents/${doc.slug}`}>
							Read
						</Link>
					</Container>
				</Card>
			))}
		</Container>
	);
}
