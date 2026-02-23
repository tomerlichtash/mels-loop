import {
	getAllStories,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import type { Locale } from '@mels-loop/i18n/config';
import { Button, Container, Heading } from '@mels-loop/ui/primitives';
import Link from 'next/link';

import { GlyphShift } from '@/components/GlyphShift/GlyphShift';
import { StoryCard } from '@/components/StoryCard/StoryCard';
import { getDictionary } from '@/i18n';

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
				<Heading order={1} className={styles.heroTitle}>
					{hero.title_p1}
					<br />
					<GlyphShift
						text={hero.title_p2}
						className={styles.heroTitleHighlight}
						speed={1000}
					/>
				</Heading>
				<p className={styles.heroDescription}>{hero.description}</p>
				<div className={styles.heroCta}>
					<Button
						asChild
						variant="primary"
						size="xl"
						className={styles.heroCtaButton}
					>
						<Link href="/stories">{hero.cta}</Link>
					</Button>
				</div>
			</section>
			<section>
				<Heading order={2} className={styles.storiesHeading}>
					{String(dict.stories)}
				</Heading>
				<div>
					{sorted.map((config) => (
						<StoryCard key={config.slug} config={config} locale={typedLocale} />
					))}
				</div>
			</section>
		</Container>
	);
}
