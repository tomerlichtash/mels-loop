import React from "react";
import {
	IContentComponentData,
	IMLParsedNode,
	MLNODE_TYPES,
} from "../../interfaces/models";
import Layout from "../layout";
import Head from "next/head";
import { ContentIterator } from "./content-iterator";
import { usePageData } from "../usePageData";
import { classes } from "../../pages/page-base.st.css";

export default function GenericPage(props: IContentComponentData) {
	const { pageData } = usePageData(props.pageProps);
	const page = pageData && pageData[0];
	const metaData = page?.metaData;
	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: MLNODE_TYPES.UNKNOWN,
	};
	return (
		<Layout>
			<Head>
				<title>{metaData?.title}</title>
			</Head>
			<article className={classes.root}>
				<h1 className={classes.title}>{metaData?.title}</h1>
				{node ? (
					<ContentIterator
						componentData={{ node }}
						className={classes.contentComponent}
					/>
				) : (
					<div className={classes.noContent}>(No page content)</div>
				)}
			</article>
		</Layout>
	);
}
