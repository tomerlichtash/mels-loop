import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { usePageData } from "../components/usePageData";
import {
	IMLParsedNode,
	IPageProps,
	IParsedPageData,
} from "../interfaces/models";
import { ReactLocaleContext } from "../contexts/locale-context";
import { LoadFolderModes } from "../interfaces/parser";
import { ContentComponent } from "../components/content";
import { classes } from "./about.st.css";

export default function About(props: IPageProps) {
	const { translate, compLocale } = useContext(ReactLocaleContext);
	const { siteTitle, pageName } = compLocale;

	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed || [];
	const { metaData } = pageData[0];

	return (
		<Layout>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={classes.root}>
				<h1>{metaData.title}</h1>
				{elements.map((node, index) => {
					return (
						<ContentComponent
							key={`top-${index}`}
							className={classes.contentComponent}
							componentData={{ node }}
						/>
					);
				})}
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.ABOUT,
		context.locale,
		LoadFolderModes.FOLDER
	);
};
