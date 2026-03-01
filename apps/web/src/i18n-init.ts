import { defineI18n } from '@mels-loop/i18n/config';

export const i18nConfig = defineI18n({
	locales: ['en', 'he'] as const,
	defaultLocale: 'en',
	direction: { he: 'rtl' },
});

export type Locale = (typeof i18nConfig.locales)[number];
