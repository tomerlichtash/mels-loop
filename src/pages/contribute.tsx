import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { ReactLayoutContext } from "../contexts/layout-context";
import { LoadFolderModes } from "../interfaces/parser";
import { st, classes } from "./contribute.st.css";

export default function Contrib({ content, className }: IPageProps) {
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
			<article className={st(classes.root, className)}>TBD</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.CONTRIB,
		context.locale,
		LoadFolderModes.FOLDER
	);
};
