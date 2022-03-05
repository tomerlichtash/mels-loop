import { CONTENT_TYPES } from "../../consts";
import { MLParseModes } from "../../interfaces/models";
import { loadContentFolder, LoadContentModes } from "../../lib/markdown-driver";
import { LoadFolderModes } from "../../lib/next-utils";

export default function handler(_req, res) {
	const locale = _req.query?.locale || "en";
	const loadPromise = new Promise((resolve) => {
		const docData = loadContentFolder({
			relativePath: CONTENT_TYPES.GLOSSARY,
			locale,
			contentMode: LoadContentModes.FULL,
			loadMode: LoadFolderModes.CHILDREN,
			parseMode: MLParseModes.NORMAL
		});
		resolve({
			locale,
			items: docData.pages.reduce((acc, pageData) => {
				acc[pageData.id] = pageData
				return acc;
			}, {})
		});
	});
	loadPromise.then(data => {
		res.status(200).json({ data });
	})
		.catch(error => {
			res.status(500).json({ error: String(error) });
		})
}
