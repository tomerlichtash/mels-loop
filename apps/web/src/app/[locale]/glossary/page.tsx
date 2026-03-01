import { getAllGlossarySlugs } from '@mels-loop/content/loaders';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Container, Text } from '@mels-loop/ui/primitives';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';

import { GlossaryEntry } from './GlossaryEntry';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function GlossaryIndexPage({ params }: PageProps) {
	const { locale } = await params;
	const dict = await getDictionary(locale as Locale);
	const slugs = await getAllGlossarySlugs();

	const title = dictGet(dict, 'nav.glossary');

	return (
		<Container>
			<Container gap="lg">
				<Breadcrumbs items={[homeItemFromDict(dict), { label: title }]} />
				<Text variant="h1">{title}</Text>
				<Container gap="sm">
					{[...slugs].sort().map((slug) => (
						<GlossaryEntry key={slug} slug={slug} />
					))}
				</Container>
			</Container>
		</Container>
	);
}
