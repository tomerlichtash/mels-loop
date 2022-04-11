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
import { st, classes } from "./docs.st.css";

export default function Docs(props: IPageProps) {
	const { translate, compLocale } = useContext(ReactLocaleContext);
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
			<article className={st(classes.root, className)}>
				<h1 className={classes.title}>{translate(compLocale.pageName)}</h1>
				{metaData.length && (
					<ul>
						{metaData.map((page, index) => {
							const key = `doc-${index}`;
							return (
								<li className={classes.item} key={key}>
									<Button label={page.metaData.title} link={page.path} />
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
		context.locale,
		LoadFolderModes.FOLDER
	);
	const childrenProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.DOCS,
		context.locale,
		LoadFolderModes.CHILDREN,
		{
			contentMode: LoadContentModes.METADATA,
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
