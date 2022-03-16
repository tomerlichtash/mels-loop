import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import {
	IMLParsedNode,
	IPageProps,
	MLNODE_TYPES,
	NODE_DISPLAY_TYPES,
} from "../interfaces/models";
import ContentBrowser from "../components/content-browser";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { ReactLayoutContext } from "../contexts/layout-context";
import {
	LoadContentModes,
	LoadFolderModes,
	MLNodeProcessorFunction,
	MLParseModes,
} from "../interfaces/parser";

import { classes } from "./story.st.css";
import { contentUtils } from "../lib/content-utils";
import { DynamicContentTypes } from "../interfaces/dynamic-content";

export default function Story({ content }: IPageProps) {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, compLocale } = layoutContext;
	const { siteTitle, pageName } = compLocale;
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
	const linkProcessor: MLNodeProcessorFunction = (node, context) => {
		const linkData = contentUtils.urlToContentData(node.target);
		if (linkData.type === DynamicContentTypes.None) {
			return node;
		}
		const nodeData: Partial<IMLParsedNode> = {
			displayType: NODE_DISPLAY_TYPES.POPOVER,
			linkType: linkData.type
		};
		if (linkData.type === DynamicContentTypes.Annotation) {
			Object.assign(nodeData, { sequence: context.getEnumerator(linkData.type) + 1});
		}
		return {...node, ...nodeData };
	};
	const nodeProcessor = contentUtils.createNodeMappingFilter(
		linkProcessor,
		MLNODE_TYPES.LINK
	);
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.CODEX,
		context.locale,
		LoadFolderModes.FOLDER,
		{
			contentMode: LoadContentModes.FULL,
			parseMode: MLParseModes.VERSE,
			nodeProcessors: [nodeProcessor],
		}
	);
};
