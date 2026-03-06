import { DEFAULT_OUTPUT, downloadAll, resolveOutputDir } from './download';

const outDir = resolveOutputDir(process.argv[2], process.cwd(), DEFAULT_OUTPUT);
downloadAll(outDir)
	.catch((err) => {
		console.error(err);
	})
	.finally(() => {
		process.exit();
	});
