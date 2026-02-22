'use server';

import { getResolvedSource } from '@mels-loop/content-pipeline/loaders';
import type { Locale } from '@mels-loop/i18n/config';

export async function fetchSourceAction(id: string, locale: Locale) {
	return getResolvedSource(id, locale);
}
