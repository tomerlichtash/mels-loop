import * as fsPath from 'path';
import * as fs from 'fs';
import { ICollectedPath } from './types';
import { getContentRootDir } from 'lib/contentRootDir';

const DYNAMIC_ROUTE_REGEXP = /^\[([^\]]+)\]$/;

/**
 * Converts an OS path to xxx/yyy/zzz relative to the first /pages/ folder in the hierarchy
 * @param path
 * @returns
 */
export async function pathToRelativePath(path: string): Promise<string> {
	try {
		const stat = await fs.promises.lstat(path);
		const contentFolder = stat.isDirectory()
			? path
			: fsPath.join(fsPath.dirname(path), fsPath.basename(path, '.js'));
		return contentFolder.replace(/\\/g, '/').replace(/^.*?\/pages\/(.+)$/, '$1');
	} catch {
		return '';
	}
}

export async function collectPathsIn(topFolder: string): Promise<ICollectedPath[]> {
	try {
		const relativePath = await pathToRelativePath(topFolder);
		const parts = relativePath.split('/');

		const root = getContentRootDir();
		const allPaths = await _collectPaths({ root, parts });
		const validPaths: ICollectedPath[] = [];
		// use only valid (existing) paths to folders
		for (let rec of allPaths) {
			try {
				const stat = await fs.promises.lstat(rec.path);
				if (stat.isDirectory()) {
					validPaths.push(rec);
				}
			} catch {
				// lint
				void 0;
			}
		}
		return validPaths.map((rec) => ({
			path: rec.path.replace(root, '').replace(/\\/g, '/').replace(/^\//, ''),
			idMap: rec.idMap,
		}));
	} catch (e) {
		console.error(`Error collecting paths in ${topFolder}:\n${String(e)}`);
		return [];
	}
}

/**
 * Recursively collects all the paths in the content dir along a dynamic route
 * @param params
 * @returns
 */
async function _collectPaths(params: {
	parts: string[];
	root: string;
	paths?: ICollectedPath[];
}): Promise<ICollectedPath[]> {
	const paths = params.paths || [],
		parts = params.parts.slice();

	if (!parts?.length) {
		return paths;
	}

	const top = parts.shift(); // parts now shorter
	const folderMatch = top.match(DYNAMIC_ROUTE_REGEXP),
		isKey = Boolean(folderMatch?.length); // indicates that the path contains a dynamic part, /[XXX]
	const topFolder = isKey ? params.root : fsPath.join(params.root, top);

	if (isKey) {
		const allPaths: ICollectedPath[] = [];
		const key: string = folderMatch[1];

		try {
			for (let nextFolder of paths) {
				const children = await fs.promises.readdir(nextFolder.path, {
					withFileTypes: true,
				});
				for (let folder of children) {
					if (!folder.isDirectory()) {
						continue;
					}
					const subPaths = await _collectPaths({
						parts,
						root: fsPath.join(params.root, folder.name),
						paths: paths.map((rec) => ({
							path: fsPath.join(rec.path, folder.name),
							idMap: {
								...nextFolder.idMap,
								[key]: folder.name,
							},
						})),
					});
					allPaths.push(...subPaths);
				}
			}
			return allPaths;
		} catch (e) {
			// probably enoent, folder doesn't exist, which is ok
			void 0;
		}
	} else {
		const newPaths = paths.length
			? paths.map((rec) => ({
					path: fsPath.join(rec.path, top),
					idMap: rec.idMap,
			  }))
			: [
					{
						path: topFolder,
						idMap: {},
					},
			  ];

		return await _collectPaths({
			parts,
			root: topFolder,
			paths: newPaths,
		});
	}
	return [];
}
