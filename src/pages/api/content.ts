import type { NextApiRequest, NextApiResponse } from "next";
import { CONTENT_TYPES } from "../../consts";
import { mlApiUtils } from "../../lib/api-utils";
import {
	LoadContentModes,
	MLParseModes,
	LoadFolderModes,
} from "../../interfaces/parser";
import {
	getContentRootDir,
	loadContentFolder,
} from "../../lib/markdown-driver";
import {
	IMLApiResponse,
	IMLDynamicContentParams,
	IMLDynamicContentResponse,
} from "../../interfaces/ml-api";
import { contentUtils } from "../../lib/content-utils";
import { mlUtils } from "../../lib/ml-utils";

const TypeMap: { [key: string]: CONTENT_TYPES } = {
	annotation: CONTENT_TYPES.ANNOTATION,
	glossary: CONTENT_TYPES.GLOSSARY,
};

import * as fsPath from "path";
import * as fileSystem from "fs";

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
	const parts = relativePath.split("/").filter(Boolean); // in case there was a / prefix
	const root = getContentRootDir(process.cwd());

	while (parts.length >= 2) {
		// at least docs/xxx, posts/yyy
		const folderPath = [...parts, contentPath].join("/"),
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
	const clientPath = params.document || "";
	const cacheKey = `dc-${contentType}-${clientPath}${clientPath && "-"}${
		params.locale
	}`;
	try {
		const payload = await mlApiUtils.getFromCache(cacheKey);
		if (payload) {
			return JSON.parse(payload);
		}
		const docPath =
			clientPath && contentType === CONTENT_TYPES.ANNOTATION
				? await findFirstFolder(clientPath, contentType)
				: contentType;
		if (!docPath) {
			throw new Error(`No ${contentType} for ${clientPath}, or globally`);
		}
		// = path
		// 	.split('/')
		// 	.filter(Boolean)
		// 	.concat([contentType])
		// 	.join('/');
		const docData = loadContentFolder({
			relativePath: docPath,
			locale: params.locale,
			loadMode: LoadFolderModes.CHILDREN,
			mode: {
				contentMode: LoadContentModes.FULL,
				parseMode: MLParseModes.NORMAL,
				nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
			},
			rootFolder: process.cwd(),
		});
		const data = {
			locale: params.locale,
			// turn array into map
			items: mlUtils.arrayToMap(docData.pages, "id"),
		};
		mlApiUtils
			.saveToCache(cacheKey, JSON.stringify({ data }))
			.then(noop)
			.catch(noop);
		return Object.assign({ data }, { cache: false });
	} catch (error) {
		return { data: null, error: String(error) };
	}
}
