import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { locales } from "../../e2e/utils/test-utils";
import { ILocaleMap } from "../interfaces/models";
import {
	IContentParseOptions,
	MLParseModes,
	LoadFolderModes,
	LoadContentModes,
} from "../interfaces/parser";
import { loadContentFolder } from "./markdown-driver";

/**************************************************
 * Extended Next.js types
 **************************************************/
interface FolderStaticProps {
	content: string | object;
	locale: string;
}
/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 * Will load either the index in the folder, or all the indices in the child folders,
 * depending on the type parameter
 * @param type `"folder"`: scan the index in the folder, `"children"`: scan indices in child folders
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
type MLGetStaticProps = (
	folderRelativePath: string,
	locale: string, //GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
	loadMode: LoadFolderModes,
	mode?: Partial<IContentParseOptions>
) => GetStaticPropsResult<FolderStaticProps>;

/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 */
type MLGetStaticPaths = (
	folderRelativePath: string,
	locales: string[]
) =>
	| Promise<GetStaticPathsResult<ParsedUrlQuery>>
	| GetStaticPathsResult<ParsedUrlQuery>;


export interface IStaticPathsParameters {
	readonly folderPath: string;
	readonly subPath?: string;
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

	getNestedStaticPaths(params: IStaticPathsParameters): Promise<GetStaticPathsResult<ParsedUrlQuery>>;
}

/**
 * Load the index file of the folder, or the children in the folder?
 */

class MLNextUtils implements IMLNextUtils {
	public getFolderStaticProps(
		folderPath: string,
		locale: string,
		loadMode: LoadFolderModes,
		mode?: Partial<IContentParseOptions>
	): GetStaticPropsResult<FolderStaticProps> {
		const docData = loadContentFolder({
			relativePath: folderPath,
			loadMode,
			locale,
			mode,
		});
		return {
			props: {
				content: JSON.stringify(docData.pages),
				locale,
			},
		};
	}

	public getFolderStaticPaths(
		folderPath: string,
		locales: string[]
	): GetStaticPathsResult<ParsedUrlQuery> {
		const paths: ILocaleMap[] = [];
		(locales || []).forEach((locale: string) => {
			const folderData = loadContentFolder({
				locale,
				relativePath: folderPath,
				loadMode: LoadFolderModes.CHILDREN,
				mode: {
					contentMode: LoadContentModes.NONE,
					parseMode: MLParseModes.NORMAL,
				},
			});
			console.log('getFolderStaticPaths', JSON.stringify(folderData))
			paths.push(...folderData.ids);
		});
		return {
			paths,
			fallback: false,
		};
	}

	public async getNestedStaticPaths(params: IStaticPathsParameters): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
		const paths: ILocaleMap[] = [];
		locales.forEach(locale => {
			const folderData = loadContentFolder({
				locale,
				relativePath: params.folderPath,
				loadMode: LoadFolderModes.CHILDREN,
				mode: {
					contentMode: LoadContentModes.NONE,
					parseMode: MLParseModes.NORMAL,
				},
			});
			console.log('getFolderStaticPaths', JSON.stringify(folderData))
			paths.push(...folderData.ids);
		});
		return Promise.resolve({
			paths,
			fallback: false,
		});

	}
}

export const mlNextUtils: IMLNextUtils = new MLNextUtils();
