import {
	getAllResolvedEntities,
	resolveAssetUrl,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import {
	Breadcrumbs,
	Card,
	CardBody,
	CardHeader,
	CardMedia,
	Container,
	Grid,
	Text,
} from '@mels-loop/ui/primitives';

import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar/BreadcrumbBar';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';
import { resolveMediaUrl } from '@/lib/media-url';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
	return getLocales().map((locale) => ({ locale }));
}

/**
 * The archive's people — every person-kind entity, story or no story.
 * Someone who never appears in a narrative still has to be reachable;
 * this index is the door that does not go through a story.
 */
export default async function PeoplePage({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const [people, dict] = await Promise.all([
		getAllResolvedEntities(typedLocale, 'person'),
		getDictionary(typedLocale),
	]);

	const peopleLabel = dictGet(dict, 'nav.people');

	const cards = await Promise.all(
		people.map(async (person) => ({
			person,
			portraitUrl: person.portrait
				? await resolveAssetUrl(`source:${person.portrait}`)
				: undefined,
		})),
	);

	return (
		<>
			<BreadcrumbBar>
				<Breadcrumbs items={[homeItemFromDict(dict), { label: peopleLabel }]} />
			</BreadcrumbBar>
			<Container gap="lg">
				<Text variant="h1">{peopleLabel}</Text>
				<Grid columns={3} gap="md">
					{cards.map(({ person, portraitUrl }) => (
						/* A plain anchor around a non-interactive Card — the Card's own
						 * interactive mode wires event handlers, which a server
						 * component cannot emit. */
						<a
							key={person.id}
							href={`/people/${person.id}`}
							className={styles.cardLink}
						>
							<Card>
								{portraitUrl && (
									<CardMedia
										src={resolveMediaUrl(portraitUrl)}
										alt={person.name}
									/>
								)}
								<CardHeader>
									<h2 className={styles.cardName}>{person.name}</h2>
									{person.role && (
										<p className={styles.cardRole}>{person.role}</p>
									)}
								</CardHeader>
								{person.summary && <CardBody>{person.summary}</CardBody>}
							</Card>
						</a>
					))}
				</Grid>
			</Container>
		</>
	);
}
