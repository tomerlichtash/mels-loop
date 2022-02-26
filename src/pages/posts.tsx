import Head from "next/head";
import Layout from "../components/layout/layout";
import ContentBrowser from "../components/content-browser";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils, LoadFolderModes } from "../lib/next-utils";
import { IPageProps } from "../interfaces/models";
import { style, classes } from "./about.st.css";
import { LoadContentModes } from "../lib/markdown-driver";
import { usePageData } from "../components/usePageData";
import Link from "next/link";

export default function Blog(props: IPageProps) {
	const { translate, compLocale, className } = props;
	const { siteTitle, pageName } = compLocale;

	const { pageData, metaData } = usePageData(props);
	// If the props changed, due to locale change, reparse the content
	debugger;
	return (
		<Layout {...{ translate }}>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<h1>Blog Posts</h1>
			<article className={style(classes.root, className)}>
				{/* <ContentBrowser content={pageData} showTitle /> */}
			</article>
			{metaData.length && (
				<ul>
					{metaData.map((page, index) => {
						const post = page.metaData;
						const key = `term-${index}`;
						const displayName = post.title;
						// TODO classes.error is empty, where do we import from?
						return post && displayName ? (
							<li key={key}>
								<Link href={page.path}>{displayName}</Link>
							</li>
						) : (
							<div key={key} className={classes.error}>
								Missing glossary term data {page.id}
							</div>
						);
					})}
				</ul>
			)}
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.POSTS,
		context,
		LoadFolderModes.FOLDER
	);
	const childrenProps = mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.POSTS,
		context,
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
