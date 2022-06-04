import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { GetStaticProps, NextPage } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { mlUtils } from "../lib/ml-utils";
import { usePageData } from "../components/usePageData";
import {
	IMLParsedNode,
	IPageProps,
	IParsedPageData,
} from "../interfaces/models";
import { ReactLocaleContext } from "../contexts/locale-context";
import { LoadFolderModes } from "../interfaces/parser";
import { ContentComponent } from "../components/content";
import { classes } from "./page-base.st.css";

const About: NextPage<IPageProps> = (props) => {
	const { siteTitle, pageName } = useContext(ReactLocaleContext);

	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed || [];
	const { metaData } = pageData[0];

	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - {pageName}
				</title>
			</Head>
			<article className={classes.root}>
				<h1 className={classes.title}>{metaData.title}</h1>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId()}
							componentData={{ node }}
							className={classes.contentComponent}
						/>
					);
				})}
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.ABOUT,
		context.locale,
		LoadFolderModes.FOLDER
	);
};

export default About;
