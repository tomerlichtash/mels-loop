import { loadFolderContent } from '../../markdown-utils/loadFolderContent';
import { LoadContentModes, LoadFolderModes, ParseModes } from 'lib/types/modes';
import type { GetStaticPathsResult } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { ILocaleMap } from '../types';

export const getFolderStaticPaths = (
	folderPath: string,
	locales: string[]
): GetStaticPathsResult<ParsedUrlQuery> => {
	const paths: ILocaleMap[] = [];

	(locales || []).forEach((locale) => {
		const folderData = loadFolderContent({
			locale,
			relativePath: folderPath,
			loadMode: LoadFolderModes.Children,
			mode: {
				contentMode: LoadContentModes.None,
				parseMode: ParseModes.NORMAL
			}
		});

		paths.push(...folderData.ids);
	});

	return {
		paths,
		fallback: false
	};
};
