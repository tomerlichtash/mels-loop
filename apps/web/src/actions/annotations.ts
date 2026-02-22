'use server';

import {
	getAnnotation,
	getGlossaryTerm,
} from '@mels-loop/content-pipeline/loaders';
import type { Locale } from '@mels-loop/i18n/config';

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
