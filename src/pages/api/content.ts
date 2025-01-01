import type { NextApiRequest, NextApiResponse } from 'next';
import { ContentTypes } from 'types/content';
import { mlApiUtils } from '../../lib/apiUtils';
import { LoadContentModes, LoadFolderModes } from 'types/parser/modes';
import { loadContentFolder } from '../../lib/loadFolderContent';
import type {
	IMLApiResponse,
	IMLDynamicContentParams,
	IMLDynamicContentResponse,
} from 'types/api';
import * as fsPath from 'path';
import * as fileSystem from 'fs';
import { arrayToMap } from 'utils/index';
import { getContentRootDir } from 'lib/contentRootDir';
import { createPopoverLinksNodeProcessor } from 'lib/processors/createPopoverLinksNodeProcessor';

const TypeMap: { [key: string]: ContentTypes } = {
	annotation: ContentTypes.Annotation,
	glossary: ContentTypes.Glossary,
};

const noop = function () {
	void 0;
};

/**
 * returns the first folder in the provided hierarchy (`relativePath`) that contains a folder
 * named `contentPath`. Useful if you have annotations that are common to several subpages
 * @param relativePath
 * @param contentPath
 * @returns
 */
const findFirstFolder = async (
	relativePath: string,
	contentPath: string
): Promise<string | null> => {
	if (!relativePath || !contentPath) {
		return null;
	}
	const parts = relativePath.split('/').filter(Boolean); // in case there was a / prefix
	const root = getContentRootDir(process.cwd());

	while (parts.length >= 2) {
		// at least docs/xxx, posts/yyy
		const folderPath = [...parts, contentPath].join('/'),
			path = fsPath.join(root, folderPath);
		try {
			const stat = await fileSystem.promises.lstat(path);
			if (stat?.isDirectory()) {
				return folderPath;
			}
		} catch {
			void 0;
		} finally {
			parts.pop();
		}
	}

	return null;
};

/**
 *
 * @param _req
 * @param res
 * @returns
 */
export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse
) {
	const params = _req.query as unknown as IMLDynamicContentParams;
	try {
		const response = await loadContent(params || {});
		res.status(response.error ? 500 : 200).json(response);
	} catch (e) {
		res.status(500).json({ error: String(e) });
	}
}

async function loadContent(
	params: Partial<IMLDynamicContentParams>
): Promise<IMLApiResponse<IMLDynamicContentResponse>> {
	const contentType = TypeMap[params.type];
	if (!params?.locale || !contentType) {
		return {
			data: null,
			error: `Bad content params, locale ${params?.locale} type ${params.type} 
(expected one of ${Object.keys(TypeMap).toString()})`,
		};
	}
	const clientPath = params.document || '';
	const cacheKey = `dc-${contentType}-${clientPath}${clientPath && '-'}${
		params.locale
	}`;
	try {
		const contentPath = fsPath.resolve(process.cwd(), 'public');
		console.log(`using content path ${contentPath}`);

		const payload = await mlApiUtils.getFromCache(cacheKey);

		if (payload) {
			return JSON.parse(payload);
		}

		const docPath =
			clientPath && contentType === ContentTypes.Annotation
				? await findFirstFolder(clientPath, contentType)
				: contentType;

		if (!docPath) {
			throw new Error(`No ${contentType} for ${clientPath}, or globally`);
		}

		const docData = loadContentFolder({
			relativePath: docPath,
			locale: params.locale,
			loadMode: LoadFolderModes.Children,
			mode: {
				contentMode: LoadContentModes.Full,
				nodeProcessors: [createPopoverLinksNodeProcessor()],
			},
			rootFolder: process.cwd(),
		});

		const data = {
			locale: params.locale,
			// turn array into map
			items: arrayToMap(docData.pages, 'id'),
		};

		// don't want to await before returning, so
		mlApiUtils
			.saveToCache(cacheKey, JSON.stringify({ data }))
			.then(noop)
			.catch(noop);
		return Object.assign({ data }, { cache: false });
	} catch (error) {
		return { data: null, error: String(error) };
	}
}
