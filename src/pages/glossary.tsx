import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import ContentBrowser from "../components/content-browser";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils, LoadFolderModes } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { style, classes } from "./about.st.css";
import { LoadContentModes } from "../lib/markdown-driver";
import { usePageData } from "../components/usePageData";
import Link from "next/link";
import { ReactLayoutContext } from "../contexts/layout-context";

export default function Glossary(props: IPageProps) {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, compLocale } = layoutContext;
	const { className } = props;

	const { siteTitle, pageName } = compLocale;

	const { pageData, metaData } = usePageData(props);
	// If the props changed, due to locale change, reparse the content
	return (
		<Layout>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={style(classes.root, className)}>
				<ContentBrowser content={pageData} showTitle />
			</article>
			{
				// List all metadata terms
				metaData.length && (
					<ul>
						{metaData.map((page, index) => {
							const term = page.metaData;
							const key = `term-${index}`;
							const displayName = term.glossary_term || term.glossary_key;
							// TODO classes.error is empty, where do we import from?
							return term && displayName ? (
								<li key={key}>
									<Link href={page.path} data-term-key={term.glossary_key}>
										{displayName}
									</Link>
								</li>
							) : (
								<div key={key} className={classes.error}>
									Missing glossary term data {page.id}
								</div>
							);
						})}
					</ul>
				)
			}
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.GLOSSARY,
		context.locale,
		LoadFolderModes.FOLDER
	);
	const childrenProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.GLOSSARY,
		context.locale,
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
