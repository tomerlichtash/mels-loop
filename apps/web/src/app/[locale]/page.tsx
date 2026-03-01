import {
	getAllStories,
	getStoryConfig,
} from '@mels-loop/content-loaders/loaders';
import { Button, Container, Grid, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import { GlyphShift } from '@/components/GlyphShift/GlyphShift';
import { StoryCard } from '@/components/StoryCard/StoryCard';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const storySlugs = await getAllStories();
	const stories = await Promise.all(
		storySlugs.map((slug) => getStoryConfig(slug)),
	);

	const sorted = stories.sort((a, b) =>
		a.featured === b.featured ? 0 : a.featured ? -1 : 1,
	);

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
						variant="contained"
						size="xl"
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
					{sorted.map((config) => (
						<StoryCard key={config.slug} config={config} locale={typedLocale} />
					))}
				</Grid>
			</section>
		</Container>
	);
}
