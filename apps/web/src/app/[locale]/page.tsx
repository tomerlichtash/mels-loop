import {
	getAllStories,
	getStoryConfig,
	getStoryMessages,
	resolveAssetUrl,
	resolveStoryField,
} from '@mels-loop/content-loaders/loaders';
import { Button, Container, Grid, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import { GlyphShift } from '@/components/home/GlyphShift/GlyphShift';
import { StoryCard } from '@/components/stories/StoryCard/StoryCard';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { resolveMediaUrl } from '@/lib/media-url';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const storySlugs = await getAllStories();
	const storiesWithMessages = await Promise.all(
		storySlugs.map(async (slug) => {
			const [config, messages] = await Promise.all([
				getStoryConfig(slug),
				getStoryMessages(slug, typedLocale),
			]);
			const thumbnailUrl = await resolveAssetUrl(
				config.assets?.thumbnail ?? config.assets?.cover ?? '',
			);
			return { config, messages, thumbnailUrl };
		}),
	);

	const sorted = [...storiesWithMessages];

	const dict = await getDictionary(typedLocale);
	const hero = dict.hero as Record<string, string>;

	return (
		<Container paddingHorizontal="xl" paddingVertical="xl">
			<section className={styles.hero}>
				<Text variant="h1" className={styles.heroTitle}>
					{hero.title_p1}
					<br />
					<GlyphShift
						text={hero.title_p2}
						className={styles.heroTitleHighlight}
						speed={1000}
					/>
				</Text>
				<p className={styles.heroDescription}>{hero.description}</p>
				<div className={styles.heroCta}>
					<Button
						asChild
						variant="outlined"
						size="lg"
						// fullWidth
						className={styles.heroCtaButton}
					>
						<Link href="/stories">{hero.cta}</Link>
					</Button>
				</div>
			</section>
			<section>
				<Text variant="h2" className={styles.storiesHeading}>
					{String(dict.stories)}
				</Text>
				<Grid columns={3} gap="md">
					{sorted.map(({ config, messages, thumbnailUrl }) => (
						<StoryCard
							key={config.slug}
							slug={config.slug}
							title={resolveStoryField(
								config.meta.title,
								typedLocale,
								messages,
							)}
							abstract={resolveStoryField(
								config.meta.abstract,
								typedLocale,
								messages,
							)}
							thumbnailUrl={
								thumbnailUrl ? resolveMediaUrl(thumbnailUrl) : undefined
							}
						/>
					))}
				</Grid>
			</section>
		</Container>
	);
}
