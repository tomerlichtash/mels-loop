import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils, LoadFolderModes } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { LoadContentModes } from "../lib/markdown-driver";
import { usePageData } from "../components/usePageData";
import Link from "next/link";
import { ReactLayoutContext } from "../contexts/layout-context";
import { style, classes } from "./about.st.css";

export default function Docs(props: IPageProps) {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, compLocale } = layoutContext;
	const { className } = props;
	const { siteTitle, pageName } = compLocale;
	const { metaData } = usePageData(props);
	return (
		<Layout>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={style(classes.root, className)}>
				<h2 className={classes.title}>{translate(compLocale.pageName)}</h2>
				{metaData.length && (
					<ul>
						{metaData.map((page, index) => {
							const term = page.metaData;
							const key = `term-${index}`;
							return (
								<li key={key}>
									<Link href={page.path} data-term-key={term.glossary_key}>
										{page.metaData.title}
									</Link>
								</li>
							);
						})}
					</ul>
				)}
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.DOCS,
		context,
		LoadFolderModes.FOLDER
	);
	const childrenProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.DOCS,
		context,
		LoadFolderModes.CHILDREN,
		LoadContentModes.METADATA
	);
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	const props = {
		props: {
			...(indexProps as any).props,
			metaData: (childrenProps as any).props.content,
		},
	};
	return props;
};
