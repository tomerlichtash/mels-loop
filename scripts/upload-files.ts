import {
	PutObjectCommand,
	GetObjectCommand,
	PutObjectTaggingCommand
} from "@aws-sdk/client-s3";
import * as fsPath from "path";
import * as fileSystem from "fs";
import { IS3Proxy, createS3Proxy } from "./s3-client";
import { lookup } from "mime-types";


const root = process.cwd();

const USAGE = `Usage: ${fsPath.basename(__filename)} <path> [path ...] [--tags tag1 [tag2...]]`;

const fileExists = async (fullPath: string): Promise<boolean> => {
	try {
		const stat = await fileSystem.promises.lstat(fullPath);
		return Boolean(stat?.isFile());
	}
	catch (err) {
		return false
	}
}

const findObject = async (proxy: IS3Proxy, name: string) => {
	try {
		const cmd = new GetObjectCommand({
			Bucket: proxy.bucket,
			Key: name
		});
		const res = await proxy.client.send(cmd);
		return Boolean(res?.$metadata);
	}
	catch (err) {
		return false;
	}
}

const uploadOneFile = async (proxy: IS3Proxy, path: string, tags: string[]) => {
	try {
		const buf = await fileSystem.promises.readFile(path);
		const name = encodeURIComponent(fsPath.basename(path));
		const found = await findObject(proxy, name);
		if (found) {
			throw new Error(`File ${name} already exists in bucket ${proxy.bucket}`)
		}
		const cmd = new PutObjectCommand({
			Bucket: proxy.bucket,
			Key: name,
			Body: buf,
			ContentType:  lookup(name) || "application/octet-stream"			
		});
		const res = await proxy.client.send(cmd);
		if (tags.length) {
			const tcmd = new PutObjectTaggingCommand({
				Key: name,
				Tagging: {
					TagSet: tags.map(tag => ({
						Key: tag,
						Value: "true"
					}))
				},
				Bucket: proxy.bucket
			})
			const tres = await proxy.client.send(tcmd);
			if (!tres) {
				console.error(`Error tagging object ${name}`);
			}
		}
		return {
			...res,
			url: proxy.getObjectUrl(name)
		}
	}
	catch (err) {
		console.error(`Error uploading ${path}:\n`, err || null);
		return null;
	}
}

const uploadFiles = async (paths: string[], tags: string[]) => {
	const result = {
		uploaded: [] as string[],
		failed: [] as string[]
	}
	const proxy = createS3Proxy();
	for (let path of paths) {
		const fullPath = fsPath.resolve(root, path);
		const exists = await fileExists(fullPath);
		if (!exists) {
			console.error(`File ${fullPath} not found or not a plain file`);
			result.failed.push(fullPath);
		}
		else {
			console.log(`uploading ${fullPath}`);
			const fileRes = await uploadOneFile(proxy, fullPath, tags);
			if (fileRes) {
				result.uploaded.push(fileRes.url);
			}
			else {
				result.failed.push(path);
			}

		}
	}
	return result;
};

const parseArgs = (argv: string[]) => {
	const error = (err: string) => {
		return {
			files: [] as string[],
			tags: [] as string[],
			error: err
		};
	}

	/**
	 * splits comma separated arg into components, otherwise just copies the arg
	 * @param args 
	 * @returns 
	 */
	const parseList = (args: string[]): string[] => {
		return args
			.reduce((arr, arg) => {
				const parts = arg.split(',')
					.map(s => s.trim())
				return arr.concat(parts);
			}, [] as string[])
			.filter(Boolean);
	}

	const ind = argv.indexOf(__filename);
	if (ind < 0 || ind === argv.length - 1) {
		return error("no files provided");
	}
	const args = argv.slice(ind + 1);
	const tagIndex = args.indexOf("--tags");
	if (tagIndex < 0) {
		return {
			files: args,
			tags: [],
			error:  ""
		}
	}
	if (tagIndex === 0) {
		return error("no files provided");
	}
	// support both space and comma separated
	const tags = parseList(args.slice(tagIndex + 1)),
		files = parseList(args.slice(0, tagIndex));

	if (files.length < 1) {
		return error("no valid file name specified")
	}
	if (tags.length < 1) {
		return error("--tags should be followed by a list of tags");
	}
	return {
		files,
		tags,
		error: ""
	}
};

const args = parseArgs(process.argv);
if (args.error) {
	console.error(`Error: ${args.error}\n${USAGE}`);
	process.exit(1);
}
uploadFiles(args.files, args.tags).then(result => {
	if (result.uploaded.length) {
		console.log(`Uploaded:\n\t${result.uploaded.join('\n\t')}`);
	}
	if (result.failed.length) {
		console.log(`Failed:\n\t${result.failed.join('\n\t')}`);
	}
})
	.catch(err => {
		console.error(err);
	})
	.finally(() => {
		process.exit();
	});
