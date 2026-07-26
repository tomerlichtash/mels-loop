import {
	getAllStories,
	getStoryConfig,
	getStoryMessages,
	resolveAssetUrl,
	resolveStoryField,
} from '@mels-loop/content-loaders/loaders';
import type { StoryConfig } from '@mels-loop/content-loaders/types';
import { Container, Grid, Text } from '@mels-loop/ui/primitives';

import { FeaturedStory } from '@/components/home/FeaturedStory/FeaturedStory';
import { ParallaxBg } from '@/components/home/ParallaxBg/ParallaxBg';
import { StoryCard } from '@/components/stories/StoryCard/StoryCard';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { resolveMediaUrl } from '@/lib/media-url';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string }>;
}

/**
 * The counts a story's card carries: how much there is to read, and how much
 * it rests on.
 *
 * Zero-count entries are dropped. A story with no articles part would
 * otherwise advertise "0 Articles", which describes a gap rather than the
 * story — and the parked stories that just came in are all single-part.
 */
function storyStats(
	config: StoryConfig,
	nav: Record<string, string> | undefined,
): { label: string; count: number }[] {
	const articles = (config.contents ?? [])
		.filter((entry) => entry.type === 'part' && entry.ref === 'articles')
		.reduce(
			(total, entry) =>
				entry.type === 'part' ? total + entry.children.length : total,
			0,
		);

	return [
		{ label: String(nav?.articles ?? 'Articles'), count: articles },
		{
			label: String(nav?.sources ?? 'Sources'),
			count: config.sources?.length ?? 0,
		},
	].filter((stat) => stat.count > 0);
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

	const dict = await getDictionary(typedLocale);
	const hero = dict.hero as Record<string, string>;

	return (
		<Container paddingHorizontal="none" paddingVertical="xl">
			<section className={styles.hero}>
				<ParallaxBg className={styles.heroBg} speed={0.4} />
				{/*
				 * Hero counters removed while the site ships a single story —
				 * "1 Story" advertises the archive's smallness rather than its
				 * depth. Restore when more stories are unparked.
				 */}
				<Text variant="h1" className={styles.heroTitle}>
					{hero.title_p1}
					<br />
					<span className={styles.heroTitleHighlight}>{hero.title_p2}</span>
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
						stats={storyStats(
							featured.config,
							dict.nav as Record<string, string>,
						)}
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
								stats={storyStats(config, dict.nav as Record<string, string>)}
							/>
						))}
					</Grid>
				</section>
			)}
		</Container>
	);
}
