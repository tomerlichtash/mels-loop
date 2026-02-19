import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

type Dictionary = Record<string, unknown>;

const cache = new Map<string, Dictionary>();

function loadDictionary(locale: string): Dictionary {
	if (cache.has(locale)) return cache.get(locale)!;

	const __dirname = dirname(fileURLToPath(import.meta.url));
	const filePath = resolve(
		__dirname,
		"..",
		"..",
		"i18n",
		"src",
		"messages",
		`${locale}.json`
	);
	const dict = JSON.parse(readFileSync(filePath, "utf-8")) as Dictionary;
	cache.set(locale, dict);
	return dict;
}

/**
 * Get a translated string by dot-notation key for use in test selectors.
 * Example: `t("en", "contact.labelName")` → `"Your Name"`
 */
export function t(locale: string, key: string): string {
	const dict = loadDictionary(locale);
	const parts = key.split(".");
	let current: unknown = dict;
	for (const part of parts) {
		if (current == null || typeof current !== "object") {
			throw new Error(`Translation key "${key}" not found for locale "${locale}"`);
		}
		current = (current as Record<string, unknown>)[part];
	}
	if (typeof current !== "string") {
		throw new Error(`Translation key "${key}" not found for locale "${locale}"`);
	}
	return current;
}
