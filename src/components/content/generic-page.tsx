import React from "react";
import {
	IContentComponentData,
	IMLParsedNode,
	MLNODE_TYPES,
} from "../../interfaces/models";
import Layout from "../layout";
import Head from "next/head";
import ContentIterator from "./content-iterator";
import { classes } from "./generic-page.st.css";
import { usePageData } from "../usePageData";

export default function GenericPage(props: IContentComponentData) {
	const { translate } = props.pageProps;
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
					<ContentIterator componentData={{ node: node }} />
				) : (
					<div className={classes.noContent}>(No page content)</div>
				)}
			</article>
		</Layout>
	);
}
