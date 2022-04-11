import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import {
	IMLParsedNode,
	IPageProps,
	IParsedPageData,
} from "../interfaces/models";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { ReactLocaleContext } from "../contexts/locale-context";
import {
	LoadContentModes,
	LoadFolderModes,
	MLParseModes,
} from "../interfaces/parser";
import { contentUtils } from "../lib/content-utils";
import { usePageData } from "../components/usePageData";
import { ContentComponent } from "../components/content";
import { v4 as uuidv4 } from "uuid";
import { classes } from "./index.st.css";

export default function Index(props: IPageProps) {
	const { siteTitle, pageName } = useContext(ReactLocaleContext);
	const { className } = props;
	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const { metaData } = pageData[0];
	const { title, moto } = metaData;
	const elements: IMLParsedNode[] = page.parsed || [];

	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - {pageName}
				</title>
			</Head>
			<article className={classes.root}>
				<h1 className={classes.title}>{title}</h1>
				<p className={classes.moto}>{moto}</p>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={uuidv4()}
							className={(classes.contentComponent, className)}
							componentData={{ node }}
						/>
					);
				})}
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
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.CODEX,
		context.locale,
		LoadFolderModes.FOLDER,
		{
			contentMode: LoadContentModes.FULL,
			parseMode: MLParseModes.VERSE,
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);
};
