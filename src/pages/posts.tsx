import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { LoadContentModes, LoadFolderModes } from "../interfaces/parser";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { IPageProps, IParsedPageData } from "../interfaces/models";
import { usePageData } from "../components/usePageData";
import { Button, TimeFormat } from "../components/ui";
import { ContentComponent } from "../components/content";
import { ReactLocaleContext } from "../contexts/locale-context";
import orderBy from "lodash.orderby";
import { mlUtils } from "../lib/ml-utils";
import { classes } from "./posts.st.css";

export default function Blog(props: IPageProps) {
	const { locale, siteTitle, pageName, sectionName } =
		useContext(ReactLocaleContext);
	const { pageData } = usePageData(props);
	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - {pageName}
				</title>
			</Head>
			<div className={classes.root}>
				<h1 className={classes.sectionTitle}>{sectionName}</h1>
				{orderBy(pageData, ["metaData.date"], ["desc"]).map(
					(page: IParsedPageData) => {
						const { metaData, path } = page;
						const { title, date } = metaData;
						return (
							<article className={classes.post} key={mlUtils.uniqueId()}>
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
												key={mlUtils.uniqueId()}
												className={classes.postContent}
												componentData={{ node }}
											/>
										);
									})}
								</main>
							</article>
						);
					}
				)}
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.POSTS,
		context.locale,
		LoadFolderModes.CHILDREN
	);
	const childrenProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.POSTS,
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
