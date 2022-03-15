import type { NextApiRequest, NextApiResponse } from "next";
import { CONTENT_TYPES } from "../../consts";
import { mlApiUtils } from "../../lib/api-utils";
import {
	LoadContentModes,
	MLParseModes,
	LoadFolderModes,
} from "../../interfaces/parser";
import { loadContentFolder } from "../../lib/markdown-driver";
import { IMLApiResponse, IMLDynamicContentParams, IMLDynamicContentResponse } from "../../interfaces/ml-api";

const TypeMap: { [key: string]: CONTENT_TYPES} = {
	annotation: CONTENT_TYPES.ANNOTATION,
	glossary: CONTENT_TYPES.GLOSSARY,
};

const noop = function() { void 0; }

/**
 * 
 * @param _req 
 * @param res 
 * @returns 
 */
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
	const params = _req.query as unknown as IMLDynamicContentParams;
	loadContent(params || {}).then(response => {
		res.status(response.error ? 500 : 200).json(response);
	})
	.catch(e => {
		res.status(500).json({ error: String(e) })
	});
}

async function loadContent(params: Partial<IMLDynamicContentParams>): Promise<IMLApiResponse<IMLDynamicContentResponse>> {
	const contentType = TypeMap[params.type];
	if (!params?.locale || !contentType) {
		return {
			data: null,
			error: `Bad content params, locale ${params?.locale} type ${params.type} 
(expected one of ${Object.keys(TypeMap).toString()})`,
		};
	}
	const cacheKey = `dc-${contentType}-${params.locale}`;
	try {
		const payload = await mlApiUtils.getFromCache(cacheKey);
		if (payload) {
			return JSON.parse(payload);
		}
		const docData = loadContentFolder({
			relativePath: contentType,
			locale: params.locale,
			loadMode: LoadFolderModes.CHILDREN,
			mode: {
				contentMode: LoadContentModes.FULL,
				parseMode: MLParseModes.NORMAL,
			},
			rootFolder: process.cwd(),
		});
		const data = {
			locale: params.locale,
			// turn array into map
			items: docData.pages.reduce((acc, pageData) => {
				acc[pageData.id] = pageData;
				return acc;
			}, {}),
		};
		mlApiUtils.saveToCache(cacheKey, JSON.stringify({ data })).then(noop).catch(noop);
		return Object.assign({ data }, {cache: false });
	}
	catch (error) {
		return { data: null, error: String(error) };
	}
}
