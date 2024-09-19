import { GetStaticPathsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { collectPathsIn } from '../helpers/pathHelpers';
import { LoadContentModes, LoadFolderModes, ParseModes } from 'lib/types/modes';
import { loadFolderContent } from '../../markdown-utils/loadFolderContent';
import type { ILocaleMap } from '../types';

interface IStaticPathsParameters {
	readonly contentFolder?: string;
	readonly locales: string[];
}

export const getNestedStaticPaths = async (
	options: IStaticPathsParameters
): Promise<GetStaticPathsResult<ParsedUrlQuery>> => {
	const paths: ILocaleMap[] = [];
	const allPaths = await collectPathsIn(options.contentFolder);

	for (let rec of allPaths) {
		for (let locale of options.locales) {
			const folderData = loadFolderContent({
				locale,
				relativePath: rec.path,
				loadMode: LoadFolderModes.Folder,
				mode: {
					contentMode: LoadContentModes.None,
					parseMode: ParseModes.NORMAL
				}
			});

			if (folderData.ids.length) {
				paths.push({
					params: rec.idMap,
					locale
				});
			}
		}
	}

	return Promise.resolve({
		paths,
		fallback: false
	});
};
