import { notFound } from 'next/navigation';
import { Container, Title, Text, Stack } from '@mels-loop/ui/primitives';
import type { Locale } from '@mels-loop/i18n/config';
import { locales } from '@mels-loop/i18n/config';
import { getPost, getAllPosts } from '@mels-loop/content-pipeline/loaders';
import { ContentRenderer } from '@mels-loop/ui/content';
import Link from 'next/link';
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
		<Container size="md">
			<Stack gap="lg">
				<Link href="/posts" className={styles.backLink}>
					&larr; {locale === 'he' ? 'חזרה לבלוג' : 'Back'}
				</Link>
				{content.metadata.title && (
					<Title order={1}>{content.metadata.title}</Title>
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
