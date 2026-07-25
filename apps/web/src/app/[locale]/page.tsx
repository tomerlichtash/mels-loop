import {
	getAllStories,
	getStoryConfig,
	getStoryMessages,
	resolveAssetUrl,
	resolveStoryField,
} from '@mels-loop/content-loaders/loaders';
import { Container, Grid, Text } from '@mels-loop/ui/primitives';

import { CountUp } from '@/components/home/CountUp/CountUp';
import { FeaturedStory } from '@/components/home/FeaturedStory/FeaturedStory';
import { GlyphShift } from '@/components/home/GlyphShift/GlyphShift';
import { ParallaxBg } from '@/components/home/ParallaxBg/ParallaxBg';
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
			const coverUrl = config.assets?.cover
				? await resolveAssetUrl(config.assets.cover)
				: undefined;
			const thumbnailUrl = await resolveAssetUrl(
				config.assets?.thumbnail ?? config.assets?.cover ?? '',
			);
			return { config, messages, coverUrl, thumbnailUrl };
		}),
	);

	const featured = storiesWithMessages.find((s) => s.config.featured);
	const rest = storiesWithMessages.filter((s) => !s.config.featured);

	const totalSources = new Set(
		storiesWithMessages.flatMap((s) => s.config.sources ?? []),
	).size;
	const totalArticles = storiesWithMessages.reduce(
		(n, s) =>
			n +
			(s.config.contents?.reduce(
				(a, e) =>
					e.type === 'part' && e.ref === 'articles' ? a + e.children.length : a,
				0,
			) ?? 0),
		0,
	);
	const totalStories = storiesWithMessages.length;

	const dict = await getDictionary(typedLocale);
	const hero = dict.hero as Record<string, string>;

	/** Picks the singular or plural label for a counter. */
	const countLabel = (key: 'stories' | 'articles' | 'sources', n: number) => {
		const forms = (dict.count as Record<string, Record<string, string>>)?.[key];
		return forms?.[n === 1 ? 'one' : 'other'] ?? key;
	};

	return (
		<Container paddingHorizontal="xl" paddingVertical="xl">
			<section className={styles.hero}>
				<ParallaxBg className={styles.heroBg} speed={0.4} />
				<div className={styles.heroStats}>
					<span className={styles.heroStat}>
						<CountUp end={totalStories} className={styles.heroStatCount} />
						<span className={styles.heroStatLabel}>
							{countLabel('stories', totalStories)}
						</span>
					</span>
					<span className={styles.heroStat}>
						<CountUp end={totalArticles} className={styles.heroStatCount} />
						<span className={styles.heroStatLabel}>
							{countLabel('articles', totalArticles)}
						</span>
					</span>
					<span className={styles.heroStat}>
						<CountUp end={totalSources} className={styles.heroStatCount} />
						<span className={styles.heroStatLabel}>
							{countLabel('sources', totalSources)}
						</span>
					</span>
				</div>
				<Text variant="h1" className={styles.heroTitle}>
					{hero.title_p1}
					<br />
					<GlyphShift
						text={hero.title_p2}
						className={styles.heroTitleHighlight}
						speed={5000}
					/>
				</Text>
				<p className={styles.heroDescription}>{hero.description}</p>
			</section>
			{featured && (
				<section className={styles.featured}>
					<FeaturedStory
						slug={featured.config.slug}
						title={resolveStoryField(
							featured.config.meta.title,
							typedLocale,
							featured.messages,
						)}
						abstract={resolveStoryField(
							featured.config.meta.abstract,
							typedLocale,
							featured.messages,
						)}
						coverUrl={
							featured.coverUrl ? resolveMediaUrl(featured.coverUrl) : undefined
						}
						stats={[
							...(featured.config.contents
								? [
										{
											label: String(
												(dict.nav as Record<string, string>)?.articles ??
													'Articles',
											),
											count: featured.config.contents
												.filter(
													(e) => e.type === 'part' && e.ref === 'articles',
												)
												.reduce(
													(n, e) =>
														e.type === 'part' ? n + e.children.length : n,
													0,
												),
										},
									]
								: []),
							...(featured.config.sources
								? [
										{
											label: String(
												(dict.nav as Record<string, string>)?.sources ??
													'Sources',
											),
											count: featured.config.sources.length,
										},
									]
								: []),
						]}
						cta={String(dict.readStory)}
					/>
				</section>
			)}
			{rest.length > 0 && (
				<section>
					<Text variant="h2" className={styles.storiesHeading}>
						{String(dict.moreStories)}
					</Text>
					<Grid columns={3} gap="md">
						{rest.map(({ config, messages, thumbnailUrl }) => (
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
			)}
		</Container>
	);
}
