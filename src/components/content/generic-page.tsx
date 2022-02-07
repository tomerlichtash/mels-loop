import React from "react";
import {
	IContentComponentData,
	IMLParsedNode,
	IParsedPageData,
	MLNODE_TYPES,
} from "../../interfaces/models";
import Layout from "../layout";
import Head from "next/head";
import ContentIterator from "./content-iterator";
import { classes } from "./generic-page.st.css";

export default function GenericPage(props: IContentComponentData) {
	const { translate, content } = props.pageProps;
	const pages = JSON.parse(content) as IParsedPageData[];
	const page = pages && pages[0];
	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: MLNODE_TYPES.UNKNOWN,
	};
	return (
		<Layout {...{ translate }}>
			<Head>
				<title>{page?.title}</title>
			</Head>
			<article className={classes.root}>
				<h1 className={classes.title}>{page?.title}</h1>
				{node ? (
					<ContentIterator componentData={{ node: node }} />
				) : (
					<div className={classes.noContent}>(No page content)</div>
				)}
			</article>
		</Layout>
	);
}
