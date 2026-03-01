/** Safely resolve a dot-notation key from a nested record. */
export function dictGet(dict: unknown, key: string): string {
	const parts = key.split('.');
	let current: unknown = dict;
	for (const part of parts) {
		if (current && typeof current === 'object' && part in current) {
			current = (current as Record<string, unknown>)[part];
		} else return key;
	}
	return typeof current === 'string' ? current : key;
}
