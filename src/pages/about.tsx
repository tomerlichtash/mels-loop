import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import ContentBrowser from "../components/content-browser";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils, LoadFolderModes } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { ReactLayoutContext } from "../contexts/layout-context";
import { style, classes } from "./about.st.css";

export default function About({ content, className }: IPageProps) {
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
			<article className={style(classes.root, className)}>
				<ContentBrowser content={content} showTitle />
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
