import {
	GetStaticPathsContext,
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
	PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { ILocaleMap, MLParseModes } from "../interfaces/models";
import { loadContentFolder, LoadContentModes } from "./markdown-driver";

/**************************************************
 * Extended Next.js types
 **************************************************/
interface FolderStaticProps { 
	content: string;
	locale: string 
}
/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 * Will load either the index in the folder, or all the indices in the child folders,
 * depending on the type parameter
 * @param type `"folder"`: scan the index in the folder, `"children"`: scan indices in child folders
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
type MLGetStaticProps = (
	folderRelativePath: string,
	context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
	loadMode: LoadFolderModes,
	contentMode?: LoadContentModes,
	parseMode?: MLParseModes

) => GetStaticPropsResult<FolderStaticProps>;

/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 */
type MLGetStaticPaths = (
	folderRelativePath: string,
	context: GetStaticPathsContext
) => Promise<GetStaticPathsResult<ParsedUrlQuery>> | GetStaticPathsResult<ParsedUrlQuery>;

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
}

export enum LoadFolderModes {
	FOLDER = "folder",
	CHILDREN = "children",
}

class MLNextUtils implements IMLNextUtils {

	public getFolderStaticProps(
		folderPath: string,
		context: GetStaticPropsContext,
		loadMode: LoadFolderModes,
		contentMode: LoadContentModes = LoadContentModes.FULL,
		parseMode: MLParseModes = MLParseModes.NORMAL,
	): GetStaticPropsResult<FolderStaticProps> {
		const docData = loadContentFolder({
			relativePath: folderPath,
			locale: context.locale,
			contentMode,
			loadMode,
			parseMode
		});
		return {
			props: {
				content: JSON.stringify(docData.pages),
				locale: context.locale
			},
		};
	}

	public getFolderStaticPaths(
		folderPath: string,
		context: GetStaticPathsContext,
	): GetStaticPathsResult<ParsedUrlQuery> {
		const paths: ILocaleMap[] = [];
		(context.locales || []).forEach((locale: string) => {
			const folderData = loadContentFolder({
				locale,
				relativePath: folderPath,
				loadMode: LoadFolderModes.CHILDREN,
				contentMode: LoadContentModes.NONE,
				parseMode: MLParseModes.NORMAL
			});
			paths.push(...folderData.ids);
		});
		return {
			paths,
			fallback: false,
		};
	}
}

export const mlNextUtils: IMLNextUtils = new MLNextUtils();
