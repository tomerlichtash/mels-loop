import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { ILocaleMap } from "../interfaces/models";
import {
	IContentParseOptions,
	MLParseModes,
	LoadFolderModes,
	LoadContentModes,
} from "../interfaces/parser";
import { getContentRootDir, loadContentFolder } from "./markdown-driver";
import * as fsPath from "path";
import * as fs from "fs";

/**************************************************
 * Extended Next.js types
 **************************************************/
interface FolderStaticProps {
	content: string | object;
}
/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 * Will load either the index in the folder, or all the indices in the child folders,
 * depending on the type parameter
 * @param type `"folder"`: scan the index in the folder, `"children"`: scan indices in child folders
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
type MLGetStaticProps = (
	folderRelativePath: string,
	locale: string, //GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
	loadMode: LoadFolderModes,
	mode?: Partial<IContentParseOptions>
) => GetStaticPropsResult<FolderStaticProps>;

/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 */
type MLGetStaticPaths = (
	folderRelativePath: string,
	locales: string[]
) =>
	| Promise<GetStaticPathsResult<ParsedUrlQuery>>
	| GetStaticPathsResult<ParsedUrlQuery>;


export interface IStaticPathsParameters {
	readonly contentFolder?: string;
	readonly locales: string[];
}

/**
 * SERVER SIDE Streamlined generation of content, suitable as props for ML component props
 */
export interface IMLNextUtils {
	/**
	 * Same as Next's GetStaticProps, parameterized by a content folder relative path
	 * Will load either the index in the folder, or all the indices in the child folders,
	 * depending on the type parameter
	 * @param folderRelativePath The folder path relative to the content folder
	 * @param ctx The original context passed to the static getStaticProps function
	 * @param loadMode `"folder"`: scan the index in the folder, `"children"`: scan indices in child folders
	 * @param contentMode none, metadata or full (default)
	 * @param parseMode verse or normal (default)
	 */
	getFolderStaticProps: MLGetStaticProps;
	/**
	 * Same as Next's GetStaticPaths, parameterized by a content folder relative path
	 */
	getFolderStaticPaths: MLGetStaticPaths;

	getNestedStaticPaths(params: IStaticPathsParameters): Promise<GetStaticPathsResult<ParsedUrlQuery>>;

	populateDynamicPath(path: string, dict: { [key: string]: string }): Promise<string>;
}

interface ICollectedPath {
	readonly path: string;
	readonly idMap: { [key: string]: string }
}



const DYNAMIC_ROUTE_RE = /^\[([^\]]+)\]$/;

async function _collectPaths(params: { parts: string[], root: string, paths?: ICollectedPath[] }): Promise<ICollectedPath[]> {
	const paths = params.paths || [],
		parts = params.parts.slice();
	if (!parts?.length) {
		return paths;
	}
	const top = parts.shift(); // parts now shorter
	const folderMatch = top.match(DYNAMIC_ROUTE_RE),
		isKey = Boolean(folderMatch?.length);
	const topFolder = isKey ?
		params.root : fsPath.join(params.root, top);
	if (isKey) {
		const allPaths: ICollectedPath[] = [];
		const key: string = folderMatch[1];
		try {
			for (let nextFolder of paths) {
				const children = await fs.promises.readdir(nextFolder.path, { withFileTypes: true });
				for (let folder of children) {
					if (!folder.isDirectory()) {
						continue;
					}
					const subPaths = await _collectPaths({
						parts,
						root: fsPath.join(params.root, folder.name),
						paths: paths.map(rec => ({
							path: fsPath.join(rec.path, folder.name),
							idMap: { ...nextFolder.idMap, [key]: folder.name }
						}))
					});
					allPaths.push(...subPaths);
				}
			}
			return allPaths;
		}
		catch (e) {
			// probably enoent, folder doesn't exist, which is ok
			void 0;
		}
	}
	else {
		const newPaths = paths.length ?
			paths.map(rec => ({
				path: fsPath.join(rec.path, top),
				idMap: rec.idMap
			}))
			: [{
				path: topFolder,
				idMap: {}
			}]
		return await _collectPaths({
			parts,
			root: topFolder,
			paths: newPaths
		})
	}
}

/**
 * Converts an OS path to xxx/yyy/zzz relative to the first /pages/ folder in the hierarchy
 * @param path 
 * @returns 
 */
async function pathToRelativePath(path: string): Promise<string> {
	try {
		const stat = await fs.promises.lstat(path);
		const contentFolder = stat.isDirectory() ?
			path
			: fsPath.join(fsPath.dirname(path), fsPath.basename(path, ".js"));
		return contentFolder
			.replace(/\\/g, '/')
			.replace(/^.*?\/pages\/(.+)$/, "$1");
	}
	catch {
		return "";
	}
}

async function collectPathsIn(topFolder: string): Promise<ICollectedPath[]> {
	try {
		const relativePath = await pathToRelativePath(topFolder)
		// const stat = await fs.promises.lstat(topFolder);
		// const contentFolder = stat.isDirectory() ?
		// 	topFolder
		// 	: fsPath.join(fsPath.dirname(topFolder), fsPath.basename(topFolder, ".js"));
		const parts = relativePath.split('/');

		const root = getContentRootDir();
		const allPaths = await _collectPaths({ root, parts });
		const validPaths: ICollectedPath[] = [];
		for (let rec of allPaths) {
			try {
				const stat = await fs.promises.lstat(rec.path);
				if (stat.isDirectory()) {
					validPaths.push(rec);
				}
			}
			// lint
			catch { void 0; }
		}
		return validPaths.map(rec => ({
			path: rec.path
				.replace(root, "")
				.replace(/\\/g, '/')
				.replace(/^\//, ''),
			idMap: rec.idMap
		}));
	}
	catch (e) {
		console.error(`Error collecting paths in ${topFolder}:\n${String(e)}`);
		return [];
	}
}

/**
 * Load the index file of the folder, or the children in the folder?
 */

class MLNextUtils implements IMLNextUtils {

	public async populateDynamicPath(path: string, dict: { [key: string]: string }): Promise<string> {
		let relative = await pathToRelativePath(path);
		if (!relative) {
			return "";
		}
		Object.entries(dict).forEach(([key, value]) => {
			const re = new RegExp(`\\[${key}\\]`, "g");
			relative = relative.replace(re, value);
		});
		return relative;
	}

	public getFolderStaticProps(
		folderPath: string,
		locale: string,
		loadMode: LoadFolderModes,
		mode?: Partial<IContentParseOptions>
	): GetStaticPropsResult<FolderStaticProps> {
		const docData = loadContentFolder({
			relativePath: folderPath,
			loadMode,
			locale,
			mode,
		});
		return {
			props: {
				// Stringify the result, instead of leaving the job to Next, because
				// Next's serializer is picky about objects, won't take class instances, Dates and more
				content: JSON.stringify(docData.pages)
			},
		};
	}

	public getFolderStaticPaths(
		folderPath: string,
		locales: string[]
	): GetStaticPathsResult<ParsedUrlQuery> {
		const paths: ILocaleMap[] = [];
		(locales || []).forEach((locale: string) => {
			const folderData = loadContentFolder({
				locale,
				relativePath: folderPath,
				loadMode: LoadFolderModes.CHILDREN,
				mode: {
					contentMode: LoadContentModes.NONE,
					parseMode: MLParseModes.NORMAL,
				},
			});
			paths.push(...folderData.ids);
		});
		return {
			paths,
			fallback: false,
		};
	}

	public async getNestedStaticPaths(options: IStaticPathsParameters): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
		const paths: ILocaleMap[] = [];
		const allPaths = await collectPathsIn(options.contentFolder);
		for (let rec of allPaths) {
			for (let locale of options.locales) {

				const folderData = loadContentFolder({
					locale,
					relativePath: rec.path,
					loadMode: LoadFolderModes.FOLDER,
					mode: {
						contentMode: LoadContentModes.NONE,
						parseMode: MLParseModes.NORMAL,
					},
				});
				if (folderData.ids.length) {
					paths.push({
						params: rec.idMap,
						locale
					})
				}
				// console.log('getFolderStaticPaths', JSON.stringify(folderData))
				// paths.push(...folderData.ids.map(id => ({
				// 	...id,
				// 	params: { ...id.params, ...options.extraIds }
				// })));
			}
		}
		return Promise.resolve({
			paths,
			fallback: false,
		});

	}
}

export const mlNextUtils: IMLNextUtils = new MLNextUtils();
