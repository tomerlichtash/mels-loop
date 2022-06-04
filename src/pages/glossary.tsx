import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { usePageData } from "../components/usePageData";
import { ReactLocaleContext } from "../contexts/locale-context";
import { Button } from "../components/ui";
import { LoadContentModes, LoadFolderModes } from "../interfaces/parser";
import { st, classes } from "./page-base.st.css";

const Glossary: NextPage<IPageProps> = (props) => {
	const { translate, siteTitle, pageName } = useContext(ReactLocaleContext);
	const { className } = props;
	const { metaData } = usePageData(props);
	// If the props changed, due to locale change, reparse the content
	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - {pageName}
				</title>
			</Head>
			<article className={st(classes.root, className)}>
				<h1 className={classes.title}>{pageName}</h1>
				{metaData.length && (
					<ul className={classes.termList}>
						{metaData.map((page, index) => {
							const term = page.metaData;
							const key = `term-${index}`;
							const { glossary_key } = term;
							return glossary_key ? (
								<li className={classes.term} key={key}>
									<Button
										label={translate(term.glossary_key)}
										link={page.path}
									/>
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
};

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
		{
			contentMode: LoadContentModes.FULL,
		}
	);
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const props = {
		props: {
			...(indexProps as any).props,
			metaData: (childrenProps as any).props.content,
		},
	};
	return props;
};

export default Glossary;
