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
import { mlUtils } from "../lib/ml-utils";
import { classes as basePageClasses } from "../pages/page-base.st.css";
import { st, classes } from "./index.st.css";

export default function Index(props: IPageProps) {
	const { siteTitle, siteSubtitle, pageName } = useContext(ReactLocaleContext);
	const { className } = props;
	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const { metaData } = pageData[0];
	const { title, moto, credits } = metaData;
	const elements: IMLParsedNode[] = page.parsed || [];

	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - {siteSubtitle} - {pageName}
				</title>
			</Head>
			<article className={basePageClasses.root}>
				<h1 className={basePageClasses.title}>{title}</h1>
				<div className={classes.root}>
					<p className={classes.moto}>{moto}</p>
					{elements.map((node) => {
						return (
							<ContentComponent
								key={mlUtils.uniqueId()}
								className={st(classes.contentComponent, className)}
								componentData={{ node }}
							/>
						);
					})}
					<p className={classes.credits}>{credits}</p>
				</div>
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
