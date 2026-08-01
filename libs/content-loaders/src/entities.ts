import type { ProcessedContent } from '@mels-loop/content-pipeline/types';

import { listSubdirs, loadJsonFile, loadLocaleFile } from './helpers';
import { paths } from './paths';
import { parseEntity } from './schema';
import type {
	Entity,
	EntityKind,
	EntityMessages,
	ResolvedEntity,
} from './types';

const FALLBACK_LOCALE = 'en';

/**
 * Loads and validates an entity. Returns null if the file does not exist;
 * throws (failing the build) if it exists but is invalid.
 */
export async function getEntity(id: string): Promise<Entity | null> {
	const filePath = paths.entities.data(id);
	const raw = await loadJsonFile<unknown>(filePath);
	if (raw === null) return null;
	return parseEntity(raw, filePath);
}

/** Loads locale messages for an entity, falling back to English. */
export async function getEntityMessages(
	id: string,
	locale: string,
): Promise<EntityMessages | null> {
	const result = await loadJsonFile<EntityMessages>(
		paths.entities.messages(id, locale),
	);
	if (result) return result;
	if (locale !== FALLBACK_LOCALE) {
		return loadJsonFile<EntityMessages>(
			paths.entities.messages(id, FALLBACK_LOCALE),
		);
	}
	return null;
}

export async function getResolvedEntity(
	id: string,
	locale: string,
): Promise<ResolvedEntity | null> {
	const [entity, messages] = await Promise.all([
		getEntity(id),
		getEntityMessages(id, locale),
	]);
	if (!entity || !messages) return null;
	return { ...entity, ...messages };
}

export async function getAllEntities(): Promise<Entity[]> {
	const dirs = await listSubdirs(paths.entities.dir());
	const entities = await Promise.all(dirs.map((id) => getEntity(id)));
	return entities.filter((e): e is Entity => e !== null);
}

export async function getAllResolvedEntities(
	locale: string,
	kind?: EntityKind,
): Promise<ResolvedEntity[]> {
	const entities = await getAllEntities();
	const wanted = kind ? entities.filter((e) => e.kind === kind) : entities;
	const resolved = await Promise.all(
		wanted.map(async (e) => {
			const messages = await getEntityMessages(e.id, locale);
			if (!messages) return null;
			return { ...e, ...messages };
		}),
	);
	return resolved.filter((e): e is ResolvedEntity => e !== null);
}

/**
 * The entity's long-form bio, where one exists — optional markdown beside
 * the messages, already triggered by the two-paragraph Mel Kaye biography.
 */
export async function getEntityBio(
	id: string,
	locale: string,
): Promise<ProcessedContent | null> {
	return loadLocaleFile(paths.entities.bio(id, locale));
}

/**
 * Which entities cite a given source — the "about" derivation, inverting
 * `Entity.sources` at build. Derived, never authored.
 */
export async function getEntitiesCiting(
	sourceId: string,
	locale: string,
): Promise<ResolvedEntity[]> {
	const all = await getAllResolvedEntities(locale);
	return all.filter((e) => e.sources.includes(sourceId));
}

/** A serialisable slice of an entity, for "about" rows on record surfaces. */
export interface AboutEntity {
	id: string;
	name: string;
	kind: EntityKind;
}

/**
 * The full inversion in one pass: source id → the entities citing it.
 * A plain object, so it can cross the server/client boundary.
 */
export async function getAboutMap(
	locale: string,
): Promise<Record<string, AboutEntity[]>> {
	const all = await getAllResolvedEntities(locale);
	const map: Record<string, AboutEntity[]> = {};
	for (const entity of all) {
		for (const sourceId of entity.sources) {
			(map[sourceId] ??= []).push({
				id: entity.id,
				name: entity.name,
				kind: entity.kind,
			});
		}
	}
	return map;
}
