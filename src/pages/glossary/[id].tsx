import React, { useContext } from "react";
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { CONTENT_TYPES } from "../../consts";
import { mlNextUtils } from "../../lib/next-utils";
import { LoadFolderModes } from "../../interfaces/parser";
import { contentUtils } from "../../lib/content-utils";
import {
	IMLParsedNode,
	IPageProps,
	MLNODE_TYPES,
} from "../../interfaces/models";
import Layout from "../../components/layout";
import Head from "next/head";
import { ContentIterator } from "../../components/content/content-iterator";
import { usePageData } from "../../components/usePageData";
import { classes } from "./glossary-item.st.css";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { Button } from "../../components/ui";
import Bibliography from "../../components/bibliography";

export default function GlossaryTerm(props: IPageProps) {
	const { translate } = useContext(ReactLocaleContext);
	const { pageData } = usePageData(props);
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
				<Button
					className={classes.title}
					label={translate("GLOSSARY_NAV_LABEL")}
					link={"/glossary"}
				/>

				<h1 className={classes.title}>{translate(metaData?.glossary_key)}</h1>
				<p className={classes.term}>
					{translate(metaData?.glossary_key, "en")}
				</p>
				{node ? (
					<ContentIterator componentData={{ node }} />
				) : (
					<div className={classes.noContent}>(No page content)</div>
				)}
				<Bibliography
					className={classes.bibliography}
					sources={[
						{
							author: metaData.source_name,
							url: metaData.source_url,
							name: metaData.source_name,
						},
					]}
				/>
			</article>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths(
		CONTENT_TYPES.GLOSSARY,
		context.locales
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.GLOSSARY}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.FOLDER,
		{
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);
};
