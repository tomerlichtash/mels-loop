import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import {
	IMLParsedNode,
	IPageProps,
	MLNODE_TYPES,
	NODE_DISPLAY_TYPES,
	PageContentAttributes,
} from "../interfaces/models";
import ContentBrowser from "../components/content-browser";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { ReactPageContext } from "../components/page/page-context";
import { ReactLayoutContext } from "../contexts/layout-context";
import { LoadContentModes, LoadFolderModes, MLNodeProcessorFunction, MLParseModes } from "../interfaces/parser";

import { classes } from "./story.st.css";
import { contentUtils } from "../lib/content-utils";
import { DynamicContentTypes } from "../interfaces/dynamic-content";

export default function Story({ content }: IPageProps) {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, compLocale } = layoutContext;
	const { siteTitle, pageName } = compLocale;

	//const contentContext = useContext(ReactPageContext);
	//contentContext.setAttribute(PageContentAttributes.Story);

	return (
		<Layout>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={classes.root}>
				<ContentBrowser content={content} showTitle showMoto showCredits />
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	/**
	 * 
	 * @param node Guaranteed link node
	 * @param mode 
	 * @returns 
	 */
	const linkProcessor: MLNodeProcessorFunction = (node, mode) => {
		const linkData = contentUtils.urlToContentData(node.target);
		if (linkData.type !== DynamicContentTypes.None) {
			const nodeData: Partial<IMLParsedNode> = {
				displayType: NODE_DISPLAY_TYPES.POPOVER
			}
			return Object.assign({}, node, nodeData);
		}
		return node;
	}
	const nodeProcessor = contentUtils.createNodeMappingFilter(linkProcessor, MLNODE_TYPES.LINK)
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.CODEX,
		context.locale,
		LoadFolderModes.FOLDER,
		{ 
			contentMode: LoadContentModes.FULL,
			parseMode: MLParseModes.VERSE,
			nodeProcessors: [nodeProcessor]
		}
	);
};
