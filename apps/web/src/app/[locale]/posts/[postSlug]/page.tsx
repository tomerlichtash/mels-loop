import { getAllPosts, getPost } from '@mels-loop/content-pipeline/loaders';
import { type Locale, locales } from '@mels-loop/i18n/config';
import { ContentRenderer } from '@mels-loop/ui/content';
import { Container, Heading, Stack, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; postSlug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getAllPosts();
	return slugs.flatMap((postSlug) =>
		locales.map((locale) => ({ locale, postSlug })),
	);
}

export default async function PostPage({ params }: PageProps) {
	const { locale, postSlug } = await params;
	const content = await getPost(postSlug, locale as Locale);

	if (!content) notFound();

	return (
		<Container>
			<Stack gap="lg">
				<Link href="/posts" className={styles.backLink}>
					&larr; {locale === 'he' ? 'חזרה לבלוג' : 'Back'}
				</Link>
				{content.metadata.title && (
					<Heading order={1}>{content.metadata.title}</Heading>
				)}
				{content.metadata.date && (
					<Text size="sm" color="dimmed">
						{content.metadata.date}
					</Text>
				)}
				{content.metadata.author && (
					<Text size="sm" color="dimmed" uppercase>
						{content.metadata.author}
					</Text>
				)}
				<ContentRenderer hast={content.hast} />
			</Stack>
		</Container>
	);
}
