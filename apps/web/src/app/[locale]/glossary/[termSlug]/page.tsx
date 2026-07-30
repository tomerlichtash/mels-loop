import {
	getAllGlossarySlugs,
	getGlossaryTerm,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar/BreadcrumbBar';
import { ContentRenderer } from '@/content';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; termSlug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getAllGlossarySlugs();
	return slugs.flatMap((termSlug) =>
		getLocales().map((locale) => ({ locale, termSlug })),
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
		<>
			<BreadcrumbBar>
				<Breadcrumbs
					items={[
						homeItemFromDict(dict),
						{
							label: dictGet(dict, 'nav.glossary'),
							href: `/glossary`,
						},
						{ label: displayName },
					]}
				/>
			</BreadcrumbBar>
			<Container>
				<Container gap="lg">
					<Text variant="h1">{displayName}</Text>
					<ContentRenderer hast={content.hast} />
					{content.metadata.source_name && (
						<div>
							<Text variant="body2" color="muted" component="span">
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
				</Container>
			</Container>
		</>
	);
}
