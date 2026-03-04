/**
 * Pure functions for theme validation.
 * Extracted from validate-theme.ts for testability.
 */

/** Extract all --ml-* custom property names from CSS (any selector). */
export function extractVarNames(css: string): string[] {
	const names: string[] = [];
	const re = /(--ml-[\w-]+)\s*:/g;
	let m;
	while ((m = re.exec(css)) !== null) {
		names.push(m[1]);
	}
	return [...new Set(names)];
}

/** Levenshtein edit distance between two strings. */
export function levenshtein(a: string, b: string): number {
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

/** Suggest closest match within edit distance <= 3, or null. */
export function suggest(name: string, candidates: Set<string>): string | null {
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

export interface ValidationResult {
	errors: { file: string; name: string; suggestion: string | null }[];
	totalOverrides: number;
	fileCount: number;
	baseVarCount: number;
}

/** Validate brand overrides against base variables. */
export function validateOverrides(
	baseVars: Set<string>,
	brandFiles: { name: string; css: string }[],
): ValidationResult {
	const errors: ValidationResult['errors'] = [];
	let totalOverrides = 0;

	for (const { name: file, css } of brandFiles) {
		const vars = extractVarNames(css);
		totalOverrides += vars.length;

		for (const name of vars) {
			if (!baseVars.has(name)) {
				errors.push({ file, name, suggestion: suggest(name, baseVars) });
			}
		}
	}

	return {
		errors,
		totalOverrides,
		fileCount: brandFiles.length,
		baseVarCount: baseVars.size,
	};
}
