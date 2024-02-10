import fs, { Dirent } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { contentUtils } from 'lib/content-utils/contentUtils';
import { createHtmlMDParser } from './createHtmlParser';
import { ParsedPageData } from './parsedPageDataClass';
import { PageMetaData } from './pageMetaData';
import { FolderContent } from './folderContentClass';
import { getIndexFileName } from './helpers';
import { getContentRootDir } from './contentRootDir';
import type { IFolderContent, ILoadContentOptions } from './types';
import type { ParsedNode } from 'types/models';
import {
	IContentParseOptions,
	LoadContentModes,
	LoadFolderModes,
	MLParseModes,
} from 'types/parser';

/** Options for unspecified parse properties */
const DEFAULT_PARSE_OPTIONS: IContentParseOptions = {
	contentMode: LoadContentModes.Full,
	parseMode: MLParseModes.AUTO,
	nodeProcessors: undefined,
	locale: undefined,
};

export function loadContentFolder(
	options: ILoadContentOptions
): IFolderContent {
	const mode: IContentParseOptions = {
		...DEFAULT_PARSE_OPTIONS,
		...options.mode,
		locale: options.locale,
	};

	const contentDir = path.join(
		getContentRootDir(options.rootFolder),
		options.relativePath
	);

	const folderContentData = new FolderContent();

	if (!fs.existsSync(contentDir)) {
		console.warn(
			`Cannot read files in ${options.relativePath} (mapped to ${contentDir}). In dynamic paths, this is not an error`
		);
		return folderContentData;
	}

	// Get file names under /posts
	const contentNames: Dirent[] = fs.readdirSync(contentDir, {
		withFileTypes: true,
	});

	// console.log(`collect - sorted content in "${contentDir}" for locale "${options.locale}"`);

	const targetFileName = getIndexFileName(options.locale);

	contentNames.forEach((rec: Dirent) => {
		const name = rec.name;
		//log.info(`process - content ID "${name}"`);

		let fullPath: string;

		if (options.loadMode === LoadFolderModes.Folder) {
			if (targetFileName !== name) {
				return;
			}
			fullPath = path.join(contentDir, name);
		} else {
			if (!rec.isDirectory()) {
				return;
			}

			fullPath = path.join(contentDir, name, targetFileName);
		}

		if (!fs.existsSync(fullPath)) {
			// console.warn(`error - Path not found: "${fullPath}"`);
			// return error without disclosing OS path
			return folderContentData.pages.push(
				new ParsedPageData({
					error: `${fullPath.split(/\/|\\/).slice(-3).join('/')} not found`,
				})
			);
		}

		folderContentData.ids.push({
			params: { id: name },
			locale: options.locale,
		});

		if (mode.contentMode === LoadContentModes.None) {
			return;
		}

		try {
			const fileContents = fs.readFileSync(fullPath, 'utf8');
			//log.info(`parse - parsed "${fullPath}"`);

			// Use gray-matter to parse the post metadata section
			const { data: matterData, content } = matter(fileContents);
			const metaData = new PageMetaData(matterData);
			const parsedPageData = new ParsedPageData({
				metaData: metaData.toObject(),
				id: name,
				path: `${options.relativePath}/${name}`, // don't use path.join, it's os specific
			});

			if (mode.contentMode === LoadContentModes.Full) {
				// parse markdown and process
				const mdParse = createHtmlMDParser(); //mdParser.defaultBlockParse;
				const tree = contentUtils.processParseTree(
					mdParse(contentUtils.stripComments(content)) as ParsedNode[],
					metaData,
					mode
				);

				// Combine the data with the id
				parsedPageData.parsed = tree;
			}

			folderContentData.pages.push(parsedPageData.toObject());
		} catch (e) {
			//log.error(`Error processing ${fullPath}`, e);
			folderContentData.pages.push(new ParsedPageData({ error: String(e) }));
		}
	});

	return folderContentData;
}
