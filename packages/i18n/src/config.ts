export interface I18nConfig<L extends string = string> {
	locales: readonly L[];
	defaultLocale: L;
	/** Map of locale → direction. Unlisted locales default to 'ltr'. */
	direction?: Partial<Record<L, 'ltr' | 'rtl'>>;
	cookieName?: string;
}

let _config: I18nConfig | null = null;

/**
 * Define the i18n configuration for the project.
 * Must be called once before any other i18n function is used.
 */
export function defineI18n<L extends string>(
	config: I18nConfig<L>,
): I18nConfig<L> {
	_config = config as I18nConfig;
	return config;
}

function getConfig(): I18nConfig {
	if (!_config) {
		throw new Error(
			'i18n not configured. Call defineI18n() before using i18n utilities.',
		);
	}
	return _config;
}

export function getLocales(): readonly string[] {
	return getConfig().locales;
}

export function getDefaultLocale(): string {
	return getConfig().defaultLocale;
}

export function getLocaleCookieName(): string {
	return getConfig().cookieName ?? 'NEXT_LOCALE';
}

export function isValidLocale(value: string): boolean {
	return getConfig().locales.includes(value);
}

export function getDirection(locale: string): 'ltr' | 'rtl' {
	const config = getConfig();
	return config.direction?.[locale as keyof typeof config.direction] ?? 'ltr';
}
