import { getAllPosts, getPost } from '@mels-loop/content/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { Container, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ContentRenderer } from '@/content';
import type { Locale } from '@/i18n-init';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; postSlug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getAllPosts();
	return slugs.flatMap((postSlug) =>
		getLocales().map((locale) => ({ locale, postSlug })),
	);
}

export default async function PostPage({ params }: PageProps) {
	const { locale, postSlug } = await params;
	const content = await getPost(postSlug, locale as Locale);

	if (!content) notFound();

	return (
		<Container>
			<Container gap="lg">
				<Link href="/posts" className={styles.backLink}>
					&larr; {locale === 'he' ? 'חזרה לבלוג' : 'Back'}
				</Link>
				{content.metadata.title && (
					<Text variant="h1">{content.metadata.title}</Text>
				)}
				{content.metadata.date && (
					<Text variant="body2" color="muted">
						{content.metadata.date}
					</Text>
				)}
				{content.metadata.author && (
					<Text variant="body2" color="muted" uppercase>
						{content.metadata.author}
					</Text>
				)}
				<ContentRenderer hast={content.hast} />
			</Container>
		</Container>
	);
}
