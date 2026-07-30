'use server';

/*
 * Initialises the loaders. Not optional, and not redundant with the layout.
 *
 * A Server Action is compiled into its own bundle, with its own instance of
 * the loader module and no layout above it — so the layout's side-effect
 * import never runs here. Without this the action threw "Content directory
 * not set" in production while every page rendered fine, because pages are
 * reached through a layout that does import it.
 */
import '../content-init';

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
