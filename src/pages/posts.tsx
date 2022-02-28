import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { v4 as uuidv4 } from "uuid";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils, LoadFolderModes } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { LoadContentModes } from "../lib/markdown-driver";
import { usePageData } from "../components/usePageData";
import { Button, TimeFormat } from "../components/ui";
import { ContentComponent } from "../components/content";
import { ReactLayoutContext } from "../contexts/layout-context";
import { classes } from "./posts.st.css";

export default function Blog(props: IPageProps) {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, compLocale, locale } = layoutContext;
	const { siteTitle, pageName, postsList } = compLocale;
	const { pageData } = usePageData(props);
	return (
		<Layout>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<div className={classes.root}>
				<h2 className={classes.sectionTitle}>{translate(postsList)}</h2>
				{pageData.map((page) => {
					const { metaData, path } = page;
					const { title, date } = metaData;
					return (
						<article className={classes.post} key={uuidv4()}>
							<header className={classes.postHeader}>
								<h3 className={classes.postHeading}>
									<Button
										label={title}
										link={`/${path}`}
										className={classes.postTitle}
									/>
								</h3>
								{date && (
									<TimeFormat
										dateStr={date}
										locale={locale}
										className={classes.postDate}
									/>
								)}
							</header>
							<main className={classes.postMain}>
								{page.parsed.map((node) => {
									return (
										<ContentComponent
											key={uuidv4()}
											className={classes.postContent}
											componentData={{ node }}
										/>
									);
								})}
							</main>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.POSTS,
		context,
		LoadFolderModes.CHILDREN
	);
	const childrenProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.POSTS,
		context,
		LoadFolderModes.CHILDREN,
		LoadContentModes.METADATA
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
