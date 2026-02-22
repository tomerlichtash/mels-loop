import en from './locales/en.json';
import he from './locales/he.json';

const messages = { en, he } as const;

export function getDictionary(locale: string) {
	return messages[locale as keyof typeof messages] ?? messages.en;
}
