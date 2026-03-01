'use server';

import { getAnnotation, getGlossaryTerm } from '@mels-loop/content/loaders';

import type { Locale } from '@/i18n-init';

export async function fetchAnnotation(
	storySlug: string,
	key: string,
	locale: Locale,
) {
	return getAnnotation(storySlug, key, locale);
}

export async function fetchGlossaryTerm(key: string, locale: Locale) {
	return getGlossaryTerm(key, locale);
}
