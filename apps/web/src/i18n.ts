import type { Locale } from '@mels-loop/i18n/config';
import en from './locales/en.json';
import he from './locales/he.json';

const messages = { en, he } as const;

export function getDictionary(locale: Locale | string) {
	return messages[locale as Locale] ?? messages.en;
}
