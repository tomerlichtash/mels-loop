import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils, LoadFolderModes } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { LoadContentModes } from "../lib/markdown-driver";
import { usePageData } from "../components/usePageData";
import { ReactLayoutContext } from "../contexts/layout-context";
import { Button } from "../components/ui";
import { style, classes } from "./glossary.st.css";

export default function Glossary(props: IPageProps) {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, compLocale } = layoutContext;
	const { className } = props;
	const { siteTitle, pageName } = compLocale;
	const { metaData } = usePageData(props);
	// If the props changed, due to locale change, reparse the content
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
					<ul className={classes.termList}>
						{metaData.map((page, index) => {
							const term = page.metaData;
							const key = `term-${index}`;
							const displayName = term.glossary_term || term.glossary_key;
							// TODO classes.error is empty, where do we import from?
							return term && displayName ? (
								<li className={classes.term} key={key}>
									<Button label={displayName} link={page.path} />
								</li>
							) : (
								<div key={key} className={classes.error}>
									Missing glossary term data {page.id}
								</div>
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
