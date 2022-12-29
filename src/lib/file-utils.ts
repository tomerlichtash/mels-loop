
import * as fs from "fs";
import * as fsPath from "path";
import * as nodeUtils from "util";
import rimraf from "rimraf";

/**
 * Info about a file path, relative to some root folder
 */
export interface IFilePath {
	/**
	 * The bare file name
	 */
	readonly name: string;
	/**
	 * The path relative to some root
	 */
	readonly relative: string;
	/**
	 * The full OS path
	 */
	readonly full: string;
}

export type FileCallback = (file: IFilePath, isDirectory: boolean) => Promise<boolean>;

export interface IRecurseFolderOptions {
	/**
	 * If false, don't drill into subfolders
	 */
	readonly recursive?: boolean;
	readonly include?: Array<string | RegExp>;
	readonly exclude?: Array<string | RegExp>;
}

export interface ICopyFolderOptions extends IRecurseFolderOptions {
	/**
	 * Defaults to true
	 */
	readonly overwrite?: boolean;
}


export interface IFileUtils {
	exploreToFile(path: string): boolean;
	doForAllFiles(folder: string, options: IRecurseFolderOptions, callback: FileCallback): Promise<Array<IFilePath>>;
	copyFolder(srcPath: string, targetPath: string, options: ICopyFolderOptions): Promise<Array<IFilePath>>;
	/**
	 * Swallows errors
	 * @param path
	 */
	isFile(path: string): Promise<boolean>;
	/**
	 * Swallows errors
	 * @param path
	 */
	isFolder(path: string): Promise<boolean>;
	/**
	 * Swallows errors
	 * @param path
	 */
	isFileOrFolder(path: string): Promise<boolean>;
	/**
	 * Swallows errors
	 * @param path
	 */
	readFile(path: string): Promise<string | null>;

	/**
	* Swallows errors
	* @param path
	*/
	writeFile(path: string, content: string | Buffer): Promise<boolean>;

	/**
	 * Creates the folder, including intermediates
	 * Swallows errors
	 * @param path 
	 */
	mkdir(path: string): Promise<string>;

	/**
	 * async rimraf a file/folder. Swallws errors, skips null input
	 */
	deleteAll(path: string): Promise<void>;
}

type FileFilter = (filePath: IFilePath) => boolean;

const createPatternArray = (arr: Array<RegExp | string>): Array<RegExp> => {
	return arr.map(sr => {
		if (typeof sr === "string") {
			return new RegExp([
				'^',
				sr
					.replace(/\./g, "\\.")
					.replace(/\*/g, ".*"),
				'$'].join(''), "i");
		}
		if (sr instanceof RegExp) {
			return sr;
		}
		throw new Error(`Illegal string or regex ${sr}`);
	});
}

const matchesArray = (filePath: string, exprs: Array<RegExp>): boolean => {
	const ind = exprs.findIndex(re => re.test(filePath));
	return ind >= 0;
}


const directoryExists = async (filePath: string): Promise<boolean> => {
	try {
		const result = await fs.promises.lstat(filePath);
		return Boolean(result?.isDirectory())
	}
	catch (e) {
		return false;
	}
}

const fileExists = async (filePath: string): Promise<boolean> => {
	try {
		const result = await fs.promises.lstat(filePath)
		return Boolean(result?.isFile());
	}
	catch (e) {
		return false;
	}
}

const existsOnFs = async (filePath: string): Promise<boolean> => {
	try {
		const result = await fs.promises.lstat(filePath)
		return Boolean(result?.isFile() || result?.isDirectory());
	}
	catch (e) {
		return false;
	}
}

const recurseCopy = async (options: {
	srcPath: string,
	targetPath: string,
	filter: FileFilter,
	overwrite: boolean,
	recursive: boolean,
	relativePath: string
}): Promise<Array<IFilePath>> => {
	const results: Array<IFilePath> = [];
	const fullSrcPath = options.relativePath ?
		fsPath.join(options.srcPath, options.relativePath) : options.srcPath;
	const list = await fs.promises.readdir(fullSrcPath, { withFileTypes: true });
	try {
		for (const file of list) {
			const relativePath = [options.relativePath, file.name].filter(Boolean).join('/');
			const src = fsPath.join(options.srcPath, relativePath),
				dst = fsPath.join(options.targetPath, relativePath);
			//console.log(src);
			const stat = await fs.promises.lstat(src);
			if (!stat) {
				throw new Error(`Failed to access file ${src}`);
			}
			const filePath: IFilePath = {
				name: file.name,
				relative: relativePath,
				full: src
			}
			if (!options.filter(filePath)) {
				// console.log(`copy: Filtering out file ${src}`);
				continue;
			}
			if (stat.isDirectory()) {
				await fs.promises.mkdir(dst);
				console.log('creating dir: ' + dst);
				if (options.recursive) {
					console.log(`Recursing into ${file.name}`);
					const sub = await recurseCopy({
						...options,
						relativePath
					});
					results.push(...sub);
				}
			} else {
				console.log('copying file: ' + dst);
				await fs.promises.copyFile(src, dst);
				results.push(filePath);
			}
		}
	}
	catch (e) {
		console.error(e);
	}
	return results;
}


const recurseFiles = async (options: {
	rootPath: string,
	filter: FileFilter,
	recursive: boolean,
	callback: FileCallback,
	relativePath: string
}): Promise<Array<IFilePath>> => {
	const results: Array<IFilePath> = [];
	const list = await fs.promises.readdir(options.rootPath, { withFileTypes: true });
	const normalizeSlash = (s: string) => s.replace(/\\/g, '/');
	try {
		for (const file of list) {
			const relativePath = options.relativePath ?
				fsPath.join(options.relativePath, file.name) : file.name;
			const src = fsPath.join(options.rootPath, file.name);
			const filePath: IFilePath = {
				name: file.name,
				relative: normalizeSlash(relativePath),
				full: src
			}
			const stat = await fs.promises.lstat(src);
			if (!stat) {
				throw new Error(`Failed to access file ${src}`);
			}

			if (!options.filter(filePath)) {
				console.log(`copy: Filtering out file ${src}`);
				continue;
			}
			if (stat.isDirectory()) {
				const process = await options.callback(filePath, true);
				if (process !== false && options.recursive) {
					const sub = await recurseFiles({
						...options,
						rootPath: src,
						relativePath
					});
					results.push(...sub);
				}
			}
			else if (stat.isFile()) {
				const process = await options.callback(filePath, false);
				if (process !== false) {
					results.push(filePath);
				}
			}
		}
	}
	catch (e) {
		console.error(e);
	}
	return results;
}

const createFileFilter = (options: IRecurseFolderOptions): FileFilter => {
	if (options.exclude?.length) {
		if (options.include?.length) {
			throw new Error("createFileFilter: can't specify both include and exclude");
		}
		const exclude = createPatternArray(options.exclude);
		return (filePath: IFilePath) => {
			return !matchesArray(filePath.name, exclude)
			&& !matchesArray(filePath.relative, exclude);
		}
	}
	else if (options.include?.length) {
		const include = createPatternArray(options.include);
		return (filePath: IFilePath) => {
			return matchesArray(filePath.name, include)
			|| matchesArray(filePath.relative, include);
		}
	}
	else {
		return () => true;
	}
}

export class FileUtils implements IFileUtils {

	public async mkdir(path: string): Promise<string> {
		try {
			const result = await fs.promises.mkdir(path, { recursive: true });
			return result || "";
		}
		catch (e) {
			return "";
		}
	}

	public async deleteAll(path: string): Promise<void> {
		if (!path || path.trim() === '/') {
			return;
		}
		const rr: (path: string, options: rimraf.Options) => Promise<void> = nodeUtils.promisify(rimraf);
		try {
			await rr(path, {});
		}
		catch (e) { }
	}

	public exploreToFile(path: string): boolean {
		let cmd = ``;
		switch (require(`os`).platform().toLowerCase().replace(/[0-9]/g, ``).replace(`darwin`, `macos`)) {
			case `win`:
				path = path || '=';
				cmd = `explorer`;
				break;
			case `linux`:
				path = path || '/';
				cmd = `xdg-open`;
				break;
			case `macos`:
				path = path || '/';
				cmd = `open`;
				break;
		}
		try {
			require(`child_process`).spawn(cmd, [path]);
			return true;
		}
		catch (e) {
			return false;
		}
	}


    public async doForAllFiles(rootPath: string, options: IRecurseFolderOptions, callback: FileCallback): Promise<Array<IFilePath>> {
		if (!rootPath || !await directoryExists(rootPath)) {
			throw new Error(`doForAllFiles: source ${rootPath} not found`);
		}
		const filter = createFileFilter(options);
		return await recurseFiles({
			rootPath,
			recursive: options.recursive !== false,
			callback,
			filter,
			relativePath: ""
		})
	}

	public async readFile(path: string): Promise<string | null> {
		if (!path) {
			return null;
		}
		try {
			const buffer = await fs.promises.readFile(path);
			return buffer && String(buffer) || null;
		}
		catch (e) {
			console.error(`While trying to read ${path}: ${e}`);
			return null;
		}
	}

	public async writeFile(path: string, content: string | Buffer): Promise<boolean> {
		if (!path) {
			return false;
		}
		try {
			const buffer = await fs.promises.writeFile(path, content);
			return true;
		}
		catch (e) {
			console.error(`While trying to write ${content?.length} characters to ${path}: ${e}`);
			return false;
		}
	}

	public async isFileOrFolder(path: string): Promise<boolean> {
		return Boolean(path) && await existsOnFs(path);
	}

	public async isFile(path: string): Promise<boolean> {
		return Boolean(path) && await fileExists(path);
	}

	public async isFolder(path: string): Promise<boolean> {
		return Boolean(path) && await directoryExists(path);
	}

	public async copyFolder(srcPath: string, targetPath: string, options: ICopyFolderOptions): Promise<Array<IFilePath>> {
		if (!srcPath || !await directoryExists(srcPath)) {
			throw new Error(`copyFolder: source ${srcPath} not found`);
		}
		if (!targetPath || !await directoryExists(targetPath)) {
			throw new Error(`copyFolder: target ${targetPath} not found`);
		}
		const filter: FileFilter = createFileFilter(options);
		const callback: FileCallback = async (filePath: IFilePath, isDirectory: boolean): Promise<boolean> => {
			const fullTarget = fsPath.join(targetPath, filePath.relative);
			if (isDirectory) {
				// console.log("Creating directory", fullTarget)
				await fs.promises.mkdir(fullTarget).catch(err => console.warn(String(err)))
			}
			else {
				// console.log(`Copying ${filePath.relative}`);
				await fs.promises.copyFile(filePath.full, fullTarget);
			}
			return true;
		}
		return await recurseFiles({
			recursive: options.recursive !== false,
			rootPath: srcPath,
			filter,
			callback,
			relativePath: ""
		});;
	}


}

export const fileUtils: IFileUtils = new FileUtils();