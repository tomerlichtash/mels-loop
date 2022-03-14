import type { NextApiRequest, NextApiResponse } from "next";
import { CONTENT_TYPES } from "../../consts";
import { mlApiUtils } from "../../lib/api-utils";
import {
	LoadContentModes,
	MLParseModes,
	LoadFolderModes,
} from "../../interfaces/parser";
import { loadContentFolder } from "../../lib/markdown-driver";

const TypeMap: { [key: string]: CONTENT_TYPES} = {
	annotation: CONTENT_TYPES.ANNOTATION,
	glossary: CONTENT_TYPES.GLOSSARY,
};

const noop = function() { void 0; }

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
	const locale = String(_req.query.locale || "");
	const type = String(_req.query.type || "");
	const contentType = type && TypeMap[type];
	if (!locale || !contentType) {
		return res.status(500).json({
			error: `Bad content params, locale ${locale} type ${type} 
(expected one of ${Object.keys(TypeMap).toString()})`,
		});
	}
	
	loadContent(res, contentType, locale).then(noop).catch(err => console.error(err));
}

async function loadContent(res: NextApiResponse, contentType: CONTENT_TYPES, locale: string): Promise<void> {
	const cacheKey = `dc-${contentType}-${locale}`;
	try {
		const payload = await mlApiUtils.getFromCache(cacheKey);
		if (payload) {
			return res.status(200).send(payload);
		}
		const docData = loadContentFolder({
			relativePath: contentType,
			locale: locale,
			loadMode: LoadFolderModes.CHILDREN,
			mode: {
				contentMode: LoadContentModes.FULL,
				parseMode: MLParseModes.NORMAL,
			},
			rootFolder: process.cwd(),
		});
		const data = {
			locale,
			// turn array into map
			items: docData.pages.reduce((acc, pageData) => {
				acc[pageData.id] = pageData;
				return acc;
			}, {}),
		};
		res.status(200).json({ data });
		mlApiUtils.saveToCache(cacheKey, JSON.stringify({ data })).then(noop).catch(noop);
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}
