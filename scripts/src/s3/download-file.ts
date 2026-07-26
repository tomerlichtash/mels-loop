import { DEFAULT_OUTPUT, downloadFile, resolveOutputDir } from './download';

const USAGE = 'Usage: download <key> [output-dir]';

const key = process.argv[2];
if (!key) {
	console.error(`Error: no key provided\n${USAGE}`);
	process.exit(1);
}

const outDir = resolveOutputDir(
	process.argv[3],
	process.env.INIT_CWD || process.cwd(),
	DEFAULT_OUTPUT,
);
downloadFile(key, outDir)
	.catch((err) => {
		console.error(err);
	})
	.finally(() => {
		process.exit();
	});
