import type { NextApiRequest, NextApiResponse } from "next";
import { CONTENT_TYPES } from "../../consts";
import {
	LoadContentModes,
	MLParseModes,
	LoadFolderModes,
} from "../../interfaces/parser";
import { loadContentFolder } from "../../lib/markdown-driver";

const TypeMap = {
	annotation: CONTENT_TYPES.ANNOTATION,
	glossary: CONTENT_TYPES.GLOSSARY,
};

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
	const loadPromise = new Promise((resolve) => {
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
		resolve({
			locale,
			// turn array into map
			items: docData.pages.reduce((acc, pageData) => {
				acc[pageData.id] = pageData;
				return acc;
			}, {}),
		});
	});
	loadPromise
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			res.status(500).json({ error: String(error) });
		});
}