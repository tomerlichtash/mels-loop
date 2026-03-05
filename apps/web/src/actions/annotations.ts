'use server';

import {
	getAllAnnotations,
	getAllGlossaryTerms,
	getAnnotation,
	getGlossaryTerm,
} from '@mels-loop/content-loaders/loaders';

import type { Locale } from '@/i18n-init';

export async function fetchAnnotation(
	storySlug: string,
	key: string,
	locale: Locale,
) {
	return getAnnotation(storySlug, key, locale);
}

export async function fetchAllAnnotations(storySlug: string, locale: Locale) {
	return getAllAnnotations(storySlug, locale);
}

export async function fetchGlossaryTerm(key: string, locale: Locale) {
	return getGlossaryTerm(key, locale);
}

export async function fetchAllGlossaryTerms(locale: Locale) {
	return getAllGlossaryTerms(locale);
}
