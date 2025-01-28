

const fs = require("fs").promises;
const fsPath = require("path");
const spawn = require("child_process").spawn;
const parseJSON = require("json5").parse;

interface IYasppConfig {
	readonly content: {
		readonly root: string;
		readonly index: string;
	}
}

async function isFolder(fspath: string): Promise<boolean> {
	try {
		const info = await fs.lstat(fspath);
		return Boolean(info?.isDirectory());
	}
	catch (e) {
		return false;
	}
}

function runProcess(exe: string, argv: string[], cwd: string): Promise<number> {
	return new Promise<number>(resolve => {
		const proc = spawn(exe, argv, {
			cwd
		})

		proc.on('close', function () {
			const code = Number(proc.exitCode);
			resolve(isNaN(code) ? 1 : code);
		});
	})

}

function copyContent(srcPath: string, targetPath: string): Promise<string> {
	return new Promise<string>(async resolve => {
		if (!await isFolder(srcPath)) {
			return resolve(`Content Folder ${srcPath} not found`);
		}
		await fs.mkdir(targetPath, { recursive: true });
		if (!await isFolder(targetPath)) {
			return resolve(`Target Folder ${targetPath} not found`);
		}
		const rmargs = ["-rf", '*'];
		const rmCode = await runProcess("rm", rmargs, targetPath);
		const cpargs = ["-r", '*', targetPath]
		const code = await runProcess("cp", cpargs, srcPath);
		resolve(code ===0 ? "" : `Error copying content, exit code ${code}`);
	});
}

/**
 * Returns an error message, empty if no error
 */
async function run(): Promise<string> {
	try {
		const rootPath = fsPath.resolve(__dirname, "../.."),
			configPath = fsPath.resolve(rootPath, "yaspp.json");
		const data = await fs.readFile(configPath, "utf-8");
		const config = parseJSON(data) as IYasppConfig,
			content = config.content?.root;
		if (!content) {
			return "Can't find content folder in yaspp.json";
		}
		const contentPath = fsPath.resolve(rootPath, content),
			targetPath = fsPath.resolve(rootPath, "public/content");
		return await copyContent(contentPath, targetPath);
	}
	catch (e) {
		return `Error loading yaspp.json: ${e}`;
	}
}

run()
	.then(err => {
		if (err) {
			console.error(err);
		}
		process.exit(err ? 1 : 0);
	})
	.catch(err => {
		console.error(err);
		process.exit(2);
	})