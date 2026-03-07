import { getDocumentMeta } from '@mels-loop/content-loaders/loaders';
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

export default async function DocumentsListingPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;
	const documents = await getDocumentMeta(storySlug, typedLocale);

	return (
		<Container gap="lg">
			{documents.map((doc) => (
				<Link
					key={doc.slug}
					href={`/stories/${storySlug}/documents/${doc.slug}`}
					className={styles.cardLink}
				>
					<Card
						variant="outlined"
						padding="md"
						orientation="horizontal"
						className={styles.card}
					>
						<CardMedia
							src={doc.image ?? ''}
							alt={doc.title}
							horizontal
							overlay={doc.imageCaption}
						/>
						<div className={styles.cardContent}>
							<CardHeader>
								<Text variant="h3">{doc.title}</Text>
								{doc.author && (
									<Text variant="body2" color="muted">
										{doc.author}
									</Text>
								)}
							</CardHeader>
							{doc.abstract && (
								<CardBody lines={2}>
									<Text variant="body2" color="muted">
										{doc.abstract}
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
