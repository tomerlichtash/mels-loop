import { getArticleMeta } from '@mels-loop/content-loaders/loaders';
import {
	Card,
	CardBody,
	CardHeader,
	CardMedia,
	Container,
	Text,
} from '@mels-loop/ui/primitives';
import Link from 'next/link';

import type { Locale } from '@/i18n-init';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export default async function ArticlesListingPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;
	const articles = await getArticleMeta(storySlug, typedLocale);

	return (
		<Container gap="lg">
			{articles.map((article) => (
				<Link
					key={article.slug}
					href={`/stories/${storySlug}/articles/${article.slug}`}
					className={styles.cardLink}
				>
					<Card
						variant="outlined"
						padding="md"
						orientation="horizontal"
						className={styles.card}
					>
						<CardMedia
							src={article.image ?? ''}
							alt={article.title}
							horizontal
							overlay={article.imageCaption}
						/>
						<div className={styles.cardContent}>
							<CardHeader>
								<Text variant="h3">{article.title}</Text>
								{article.author && (
									<Text variant="body2" color="muted">
										{article.author}
									</Text>
								)}
							</CardHeader>
							{article.abstract && (
								<CardBody lines={2}>
									<Text variant="body2" color="muted">
										{article.abstract}
									</Text>
								</CardBody>
							)}
						</div>
					</Card>
				</Link>
			))}
		</Container>
	);
}
