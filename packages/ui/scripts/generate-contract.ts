import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensDir = join(__dirname, '../src/styles/tokens/color');

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

function extractVars(css: string): [string, string][] {
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

function resolve(value: string, lookup: Map<string, string>): string {
	return value.replace(/var\((--ml-[\w-]+)\)/g, (_, name: string) => {
		const resolved = lookup.get(name);
		if (!resolved) return `var(${name})`;
		return resolve(resolved, lookup);
	});
}

const paletteCss = readFileSync(join(tokensDir, 'palette.css'), 'utf8');
const intentCss = readFileSync(join(tokensDir, 'intent.css'), 'utf8');

const paletteVars = extractVars(paletteCss);
const intentVars = extractVars(intentCss);
const lookup = new Map([...paletteVars, ...intentVars]);

const entries = [...paletteVars, ...intentVars].map(([name, value]) => ({
	name,
	value: resolve(value, lookup),
}));

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

const contractPath = join(tokensDir, 'contract.css');

const summary = `${entries.length} properties (${paletteVars.length} palette, ${intentVars.length} intent)`;

if (process.argv.includes('--check')) {
	const existing = readFileSync(contractPath, 'utf8');
	if (existing !== output) {
		console.error(
			'contract.css is stale. Run `pnpm generate:contract` to update.',
		);
		process.exit(1);
	}
	console.log(`contract.css is up to date. ${summary}.`);
} else {
	writeFileSync(contractPath, output);
	console.log(`Generated contract.css. ${summary}.`);
}
