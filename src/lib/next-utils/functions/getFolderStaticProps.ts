import { GetStaticPropsResult } from 'next';
import { loadFolderContent } from '../../markdown-utils/loadFolderContent';
import { LoadFolderModes } from 'lib/types/modes';
import type { FolderStaticProps } from '../types';
import type { IContentParseOptions } from 'lib/markdown-utils/types';
// import type { IContentParseOptions } from 'lib/types/parser';

/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 * Will load either the index in the folder, or all the indices in the child folders,
 * depending on the type parameter
 * @param folderRelativePath The folder path relative to the content folder
 * @param ctx The original context passed to the static getStaticProps function
 * @param loadMode `"folder"`: scan the index in the folder, `"children"`: scan indices in child folders
 * @param contentMode none, metadata or full (default)
 * @param parseMode verse or normal (default)
 */
export const getFolderStaticProps = (
	folderPath: string,
	locale: string,
	loadMode: LoadFolderModes,
	mode?: Partial<IContentParseOptions>
): GetStaticPropsResult<FolderStaticProps> => {
	const docData = loadFolderContent({
		relativePath: folderPath,
		loadMode,
		locale,
		mode
	});

	const page = docData.pages[0];

	return {
		props: {
			// Stringify the result, instead of leaving the job to Next, because
			// Next's serializer is picky about objects, won't take class instances, Dates and more
			content: JSON.stringify(docData.pages),
			documentPath: (page && page.path) || ''
		}
	};
};
