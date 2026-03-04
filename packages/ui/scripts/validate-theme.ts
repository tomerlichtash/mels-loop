import { readdirSync, readFileSync } from 'fs';
import { dirname, join, resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import { extractVarNames, validateOverrides } from './lib/validate';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stylesDir = join(__dirname, '../src/styles');

// Collect all base theme variables
const baseFiles = [
	'tokens/color/palette.css',
	'tokens/color/intent.css',
	'tokens/color/semantic.css',
	'themes/dark.css',
];

const baseVars = new Set<string>();
for (const file of baseFiles) {
	const css = readFileSync(join(stylesDir, file), 'utf8');
	for (const name of extractVarNames(css)) {
		baseVars.add(name);
	}
}

// Read brand files
const brandDir = process.argv[2];
if (!brandDir) {
	console.error('Usage: validate-theme <brand-directory>');
	process.exit(1);
}

const resolvedDir = resolvePath(brandDir);
const brandFiles = readdirSync(resolvedDir)
	.filter((f) => f.endsWith('.css'))
	.map((f) => ({
		name: f,
		css: readFileSync(join(resolvedDir, f), 'utf8'),
	}));

if (brandFiles.length === 0) {
	console.error(`No CSS files found in ${resolvedDir}`);
	process.exit(1);
}

// Validate
const result = validateOverrides(baseVars, brandFiles);

for (const { file, name, suggestion } of result.errors) {
	const hint = suggestion ? ` (did you mean ${suggestion}?)` : '';
	console.error(`  orphan in ${file}: ${name}${hint}`);
}

console.log(
	`Validated ${result.totalOverrides} overrides across ${result.fileCount} file(s) against ${result.baseVarCount} base variables.`,
);

if (result.errors.length > 0) {
	console.error(`${result.errors.length} error(s) found.`);
	process.exit(1);
} else {
	console.log('All checks passed.');
}
