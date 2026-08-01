'use server';

import {
	getResolvedEntity,
	resolveAssetUrl,
} from '@mels-loop/content-loaders/loaders';
import type { EntityKind } from '@mels-loop/content-loaders/types';

import type { Locale } from '@/i18n-init';
import { resolveMediaUrl } from '@/lib/media-url';

/** What an entity popover needs — a card, not the whole record. */
export interface EntityCard {
	id: string;
	kind: EntityKind;
	name: string;
	role?: string;
	summary?: string;
	dates?: { start?: string; end?: string };
	avatarUrl?: string;
	/** Only persons have pages today. */
	hasPage: boolean;
}

export async function fetchEntityCard(
	id: string,
	locale: Locale,
): Promise<EntityCard | null> {
	const entity = await getResolvedEntity(id, locale);
	if (!entity) return null;

	const portraitUrl = entity.portrait
		? await resolveAssetUrl(`source:${entity.portrait}`)
		: undefined;

	return {
		id: entity.id,
		kind: entity.kind,
		name: entity.name,
		...(entity.role ? { role: entity.role } : {}),
		...(entity.summary ? { summary: entity.summary } : {}),
		...(entity.dates ? { dates: entity.dates } : {}),
		...(portraitUrl ? { avatarUrl: resolveMediaUrl(portraitUrl) } : {}),
		hasPage: entity.kind === 'person',
	};
}
