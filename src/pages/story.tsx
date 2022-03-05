import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import {
	IPageProps,
	MLParseModes,
	PageContentAttributes,
} from "../interfaces/models";
import ContentBrowser from "../components/content-browser";
import { classes } from "./index.st.css";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils, LoadFolderModes } from "../lib/next-utils";
import { LoadContentModes } from "../lib/markdown-driver";
import { useState } from "react";
import { IPageContext } from "../interfaces/page-context";
import { PageContext } from "../components/page/page-context";
import { ReactLayoutContext } from "../contexts/layout-context";

export default function Story(props: IPageProps) {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, compLocale } = layoutContext;
	const { siteTitle, pageName } = compLocale;
	const [pageContext] = useState<IPageContext>(
		new PageContext(PageContentAttributes.Story)
	);
	return (
		<Layout {...{ context: pageContext }}>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={classes.root}>
				<ContentBrowser
					content={props.content}
					showTitle
					showMoto
					showCredits
				/>
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.CODEX,
		context,
		LoadFolderModes.FOLDER,
		LoadContentModes.FULL,
		MLParseModes.VERSE
	);
};
