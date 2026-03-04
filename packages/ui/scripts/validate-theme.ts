import { readdirSync, readFileSync } from 'fs';
import { dirname, join, resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stylesDir = join(__dirname, '../src/styles');

function extractVarNames(css: string): string[] {
	const names: string[] = [];
	const re = /(--ml-[\w-]+)\s*:/g;
	let m;
	while ((m = re.exec(css)) !== null) {
		names.push(m[1]);
	}
	return [...new Set(names)];
}

function levenshtein(a: string, b: string): number {
	const m = a.length;
	const n = b.length;
	const dp: number[][] = Array.from({ length: m + 1 }, () =>
		Array(n + 1).fill(0),
	);
	for (let i = 0; i <= m; i++) dp[i][0] = i;
	for (let j = 0; j <= n; j++) dp[0][j] = j;
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			dp[i][j] =
				a[i - 1] === b[j - 1]
					? dp[i - 1][j - 1]
					: 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
		}
	}
	return dp[m][n];
}

function suggest(name: string, candidates: Set<string>): string | null {
	let best = '';
	let bestDist = Infinity;
	for (const c of candidates) {
		const d = levenshtein(name, c);
		if (d < bestDist) {
			bestDist = d;
			best = c;
		}
	}
	return bestDist <= 3 ? best : null;
}

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
const brandFiles = readdirSync(resolvedDir).filter((f) => f.endsWith('.css'));
if (brandFiles.length === 0) {
	console.error(`No CSS files found in ${resolvedDir}`);
	process.exit(1);
}

// Validate
let errors = 0;
let totalOverrides = 0;

for (const file of brandFiles) {
	const css = readFileSync(join(resolvedDir, file), 'utf8');
	const vars = extractVarNames(css);
	totalOverrides += vars.length;

	for (const name of vars) {
		if (!baseVars.has(name)) {
			const match = suggest(name, baseVars);
			const hint = match ? ` (did you mean ${match}?)` : '';
			console.error(`  orphan in ${file}: ${name}${hint}`);
			errors++;
		}
	}
}

// Summary
console.log(
	`Validated ${totalOverrides} overrides across ${brandFiles.length} file(s) against ${baseVars.size} base variables.`,
);

if (errors > 0) {
	console.error(`${errors} error(s) found.`);
	process.exit(1);
} else {
	console.log('All checks passed.');
}
