/**
 * Pure functions for contract generation.
 * Extracted from generate-contract.ts for testability.
 */

/** Extract CSS custom property declarations from a :root block. */
export function extractVars(css: string): [string, string][] {
	const vars: [string, string][] = [];
	const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
	if (!rootMatch) return vars;

	const re = /(--ml-[\w-]+)\s*:\s*([^;]+);/g;
	let m;
	while ((m = re.exec(rootMatch[1])) !== null) {
		vars.push([m[1], m[2].trim()]);
	}
	return vars;
}

/** Recursively resolve var() references to concrete values. */
export function resolve(value: string, lookup: Map<string, string>): string {
	return value.replace(/var\((--ml-[\w-]+)\)/g, (_, name: string) => {
		const resolved = lookup.get(name);
		if (!resolved) return `var(${name})`;
		return resolve(resolved, lookup);
	});
}

/** Build @property declarations from extracted vars. */
export function buildContract(
	paletteVars: [string, string][],
	intentVars: [string, string][],
): { output: string; summary: string } {
	const lookup = new Map([...paletteVars, ...intentVars]);

	const entries = [...paletteVars, ...intentVars].map(([name, value]) => ({
		name,
		value: resolve(value, lookup),
	}));

	const HEADER = `/*
 * ---- Theme Contract ----
 *
 * Auto-generated from palette.css and intent.css.
 * DO NOT EDIT — run \`pnpm generate:contract\` to regenerate.
 *
 * Registers every overridable color token with @property, providing:
 *   - Type safety (syntax: '<color>')
 *   - IDE discoverability and autocomplete
 *   - Runtime fallbacks via initial-value
 */`;

	const output =
		HEADER +
		'\n\n' +
		entries
			.map(
				({ name, value }) =>
					`@property ${name} {\n\tsyntax: '<color>';\n\tinherits: true;\n\tinitial-value: ${value};\n}`,
			)
			.join('\n\n') +
		'\n';

	const summary = `${entries.length} properties (${paletteVars.length} palette, ${intentVars.length} intent)`;

	return { output, summary };
}
