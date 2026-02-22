import { Container, Heading, Stack } from '@mels-loop/ui/primitives';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@/i18n';
import { getAllGlossarySlugs } from '@mels-loop/content-pipeline/loaders';
import { GlossaryEntry } from './GlossaryEntry';
import { homeItem, dictGet } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function GlossaryIndexPage({ params }: PageProps) {
	const { locale } = await params;
	const dict = await getDictionary(locale as Locale);
	const slugs = await getAllGlossarySlugs();

	const title = dictGet(dict as Record<string, unknown>, 'nav.glossary');

	return (
		<Container>
			<Stack gap="lg">
				<Breadcrumbs
					items={[
						homeItem(
							locale,
							dictGet(dict as Record<string, unknown>, 'nav.home'),
						),
						{ label: title },
					]}
				/>
				<Heading order={1}>{title}</Heading>
				<Stack gap="sm">
					{[...slugs].sort().map((slug) => (
						<GlossaryEntry key={slug} slug={slug} />
					))}
				</Stack>
			</Stack>
		</Container>
	);
}
