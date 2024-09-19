import { ParsedUrlQuery } from 'querystring';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
// import type { IContentParseOptions } from 'lib/types/parser';
import type { LoadFolderModes } from 'lib/types/modes';
import type { StringMap } from 'lib/types/models';
import type { IContentParseOptions } from 'lib/markdown-utils/types';

/**************************************************
 * Extended Next.js types
 **************************************************/

/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 * Will load either the index in the folder, or all the indices in the child folders,
 * depending on the type parameter
 * @param type `"folder"`: scan the index in the folder, `"children"`: scan indices in child folders
 */
export type MLGetStaticProps = (
	folderRelativePath: string,
	locale: string, //GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
	loadMode: LoadFolderModes,
	mode?: Partial<IContentParseOptions>
) => GetStaticPropsResult<FolderStaticProps>;

/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 */
export type MLGetStaticPaths = (
	folderRelativePath: string,
	locales: string[]
) => Promise<GetStaticPathsResult<ParsedUrlQuery>> | GetStaticPathsResult<ParsedUrlQuery>;

export interface IStaticPathsParameters {
	readonly contentFolder?: string;
	readonly locales: string[];
}

/**
 * SERVER SIDE Streamlined generation of content, suitable as props for ML component props
 */
export interface IMLNextUtils {
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
	getFolderStaticProps: MLGetStaticProps;
	/**
	 * Same as Next's GetStaticPaths, parameterized by a content folder relative path
	 */
	getFolderStaticPaths: MLGetStaticPaths;

	getNestedStaticPaths(
		params: IStaticPathsParameters
	): Promise<GetStaticPathsResult<ParsedUrlQuery>>;

	populateDynamicPath(path: string, dict: { [key: string]: string }): Promise<string>;
}

export interface ICollectedPath {
	readonly path: string;
	readonly idMap: { [key: string]: string };
}

export interface FolderStaticProps {
	/** Typically the stringified ParsedPageData */
	content: string | object;

	/** The path of the first page in the document data */
	documentPath: string;
}

export interface ILocaleMap {
	readonly params: StringMap;
	locale: string;
}
