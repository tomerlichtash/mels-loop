import {
	GetStaticPathsContext,
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
	PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { ILocaleMap } from "../interfaces/models";
import { loadContentFolder } from "./markdown-driver";

////////////// Extended Next.js types //////////////////
/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 * Will load either the index in the folder, or all the indices in the child folders,
 * depending on the type parameter
 * @param type `"folder"`: scan the index in the folder, `"children"`: scan indices in child folders
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
type MLGetStaticProps<
	P extends { [key: string]: any } = { [key: string]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery,
	D extends PreviewData = PreviewData
> = (
	folderRelativePath: string,
	context: GetStaticPropsContext<Q, D>,
	type: "folder" | "children"
) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P>;

/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 */
type MLGetStaticPaths<P extends ParsedUrlQuery = ParsedUrlQuery> = (
	folderRelativePath: string,
	context: GetStaticPathsContext
) => Promise<GetStaticPathsResult<P>> | GetStaticPathsResult<P>;

export interface IMLNextUtils {
	/**
	 * Same as Next's GetStaticProps, parameterized by a content folder relative path
	 * Will load either the index in the folder, or all the indices in the child folders,
	 * depending on the type parameter
	 * @param folderRelativePath The folder path relative to the content folder
	 * @param ctx The original context passed to the static getStaticProps function
	 * @param type `"folder"`: scan the index in the folder, `"children"`: scan indices in child folders
	 */
	getFolderStaticProps: MLGetStaticProps;
	/**
	 * Same as Next's GetStaticPaths, parameterized by a content folder relative path
	 */
	getFolderStaticPaths: MLGetStaticPaths;
}

export enum PathStaticPropType {
	FOLDER = "folder",
	CHILDREN = "children",
}

class MLNextUtils implements IMLNextUtils {
	getFolderStaticProps(
		folderPath: string,
		context: GetStaticPropsContext,
		type: PathStaticPropType.FOLDER | PathStaticPropType.CHILDREN
	): GetStaticPropsResult<{ [key: string]: any }> {
		const docData = loadContentFolder({
			relativePath: folderPath,
			locale: context.locale,
			type,
		});
		return {
			props: {
				content: JSON.stringify(docData.pages),
				// locale: context.locale,
			},
		};
	}

	getFolderStaticPaths(
		folderPath: string,
		context: GetStaticPathsContext
	): GetStaticPathsResult<ParsedUrlQuery> {
		const paths: ILocaleMap[] = [];
		(context.locales || []).forEach((locale: string) => {
			const folderData = loadContentFolder({
				locale,
				relativePath: folderPath,
				type: "children",
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
