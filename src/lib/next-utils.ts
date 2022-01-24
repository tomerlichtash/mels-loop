import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { ILocaleMap } from "../interfaces/models";
import { loadContentFolder } from "./markdown-driver";

////////////// Extended Next.js types //////////////////
/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export type MLGetStaticProps<
	P extends { [key: string]: any } = { [key: string]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery,
	D extends PreviewData = PreviewData
	> = (
		folderRelativePath: string,
		context: GetStaticPropsContext<Q, D>,
		type: "folder" | "children"
	) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P>

/**
 * Same as Next's GetStaticProps, parameterized by a content folder relative path
 */
 export type MLGetStaticPaths<P extends ParsedUrlQuery = ParsedUrlQuery> = (
	folderRelativePath: string,
	context: GetStaticPathsContext
) => Promise<GetStaticPathsResult<P>> | GetStaticPathsResult<P>

export interface IMLNextUtils {
	getFolderStaticProps: MLGetStaticProps;
	getFolderStaticPaths: MLGetStaticPaths;
}

class MLNextUtils implements IMLNextUtils {
	getFolderStaticProps(folderPath: string, context: GetStaticPropsContext, type: "folder" | "children"): 
		GetStaticPropsResult<{ [key: string]: any }> {
		const docData = loadContentFolder({
			relativePath: folderPath,
			locale: context.locale,
			type 
		});
		return {
			props: {
				content: JSON.stringify(docData.pages),
			},
		};
	}

	getFolderStaticPaths(folderPath: string,
		context: GetStaticPathsContext): GetStaticPathsResult<ParsedUrlQuery> {
		const paths: ILocaleMap[] = [];
		(context.locales || []).forEach((locale: string) => {
			const folderData = loadContentFolder({locale, relativePath: folderPath, type: "children"});
			paths.push(...folderData.ids);
		})
		return {
			paths,
			fallback: false,
		};
	
	}
	
}

export const mlNextUtils: IMLNextUtils = new MLNextUtils();