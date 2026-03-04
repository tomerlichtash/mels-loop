import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { buildContract, extractVars } from './lib/contract';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensDir = join(__dirname, '../src/styles/tokens/color');

const paletteCss = readFileSync(join(tokensDir, 'palette.css'), 'utf8');
const intentCss = readFileSync(join(tokensDir, 'intent.css'), 'utf8');

const paletteVars = extractVars(paletteCss);
const intentVars = extractVars(intentCss);
const { output, summary } = buildContract(paletteVars, intentVars);

const contractPath = join(tokensDir, 'contract.css');

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
