import { cpSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const src = 'src';
const dist = 'dist';

function copyCss(dir) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			copyCss(full);
		} else if (entry.endsWith('.css')) {
			const rel = relative(src, full);
			cpSync(full, join(dist, rel));
		}
	}
}

copyCss(src);
