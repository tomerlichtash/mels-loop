'use server';

import { getResolvedSource } from '@mels-loop/content-loaders/loaders';

import type { Locale } from '@/i18n-init';

export async function fetchSourceAction(id: string, locale: Locale) {
	return getResolvedSource(id, locale);
}
