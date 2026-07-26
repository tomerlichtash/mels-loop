import { DEFAULT_OUTPUT, downloadAll, resolveOutputDir } from './download';

const outDir = resolveOutputDir(
	process.argv[2],
	process.env.INIT_CWD || process.cwd(),
	DEFAULT_OUTPUT,
);
console.log(`Saving to: ${outDir}`);
downloadAll(outDir)
	.catch((err) => {
		console.error(err);
	})
	.finally(() => {
		process.exit();
	});
