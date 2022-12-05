import React, { useContext } from "react";
import {
	IContentComponentData,
	IMLParsedNode,
	IPageMetaData,
	MLNODE_TYPES,
} from "../../../interfaces/models";
import Layout from "../../layout";
import Head from "next/head";
import ContentIterator from "../content-iterator";
import { usePageData } from "../../usePageData";
import { TimeFormat } from "../../ui";
import { ReactLocaleContext } from "../../../contexts/locale-context";
import { st, classes } from "./../../../pages/page-base.st.css";

export default function GenericPage(props: IContentComponentData) {
	const { locale, textDirection, siteTitle, siteSubtitle } =
		useContext(ReactLocaleContext);
	const { pageData } = usePageData(props.pageProps);
	const page = pageData && pageData[0];
	const metaData = page?.metaData || ({} as IPageMetaData);
	const { author, date, abstract } = metaData;
	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: MLNODE_TYPES.UNKNOWN,
	};
	return (
		<Layout>
			<Head>
				{siteTitle} - {siteSubtitle} - {metaData?.title}
			</Head>
			<article className={st(classes.root, { textDirection })}>
				<header className={classes.header}>
					<h1 className={classes.title}>{metaData?.title}</h1>
					{abstract && <div className={classes.subtitle}>{abstract}</div>}
					<div className={st(classes.meta, { hasContent: !!author || !!date })}>
						{author && <div className={classes.byline}>{author}</div>}
						{date && (
							<TimeFormat
								dateStr={date}
								locale={locale}
								className={classes.date}
							/>
						)}
					</div>
				</header>
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
