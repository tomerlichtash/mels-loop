import { notFound } from 'next/navigation';
import { Container, Heading, Text, Stack } from '@mels-loop/ui/primitives';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import type { Locale } from '@mels-loop/i18n/config';
import { locales } from '@mels-loop/i18n/config';
import {
	getGlossaryTerm,
	getAllGlossarySlugs,
} from '@mels-loop/content-pipeline/loaders';
import { getDictionary } from '@/i18n';
import { ContentRenderer } from '@mels-loop/ui/content';
import { homeItem, dictGet } from '@/lib/breadcrumbs';
import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; termSlug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getAllGlossarySlugs();
	return slugs.flatMap((termSlug) =>
		locales.map((locale) => ({ locale, termSlug })),
	);
}

export default async function GlossaryTermPage({ params }: PageProps) {
	const { locale, termSlug } = await params;
	const content = await getGlossaryTerm(termSlug, locale as Locale);

	if (!content) notFound();

	const dict = await getDictionary(locale as Locale);
	const displayName =
		content.metadata.glossary_key ||
		termSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

	return (
		<Container>
			<Stack gap="lg">
				<Breadcrumbs
					items={[
						homeItem(
							locale,
							dictGet(dict as Record<string, unknown>, 'nav.home'),
						),
						{
							label: dictGet(dict as Record<string, unknown>, 'nav.glossary'),
							href: `/glossary`,
						},
						{ label: displayName },
					]}
				/>
				<Heading order={1}>{displayName}</Heading>
				<ContentRenderer hast={content.hast} />
				{content.metadata.source_name && (
					<div>
						<Text size="sm" color="dimmed" component="span">
							Source:{' '}
							{content.metadata.source_url ? (
								<a
									href={content.metadata.source_url}
									target="_blank"
									className={styles.sourceLink}
								>
									{content.metadata.source_name}
								</a>
							) : (
								content.metadata.source_name
							)}
						</Text>
					</div>
				)}
			</Stack>
		</Container>
	);
}
