import React, { useContext } from "react";
import Layout from "../components/layout/layout";
import { LoadContentModes, LoadFolderModes } from "../interfaces/parser";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { IPageProps, IParsedPageData } from "../interfaces/models";
import { usePageData } from "../components/usePageData";
import { ReactLocaleContext } from "../contexts/locale-context";
import orderBy from "lodash.orderby";
import Post from "../components/post";
import { mlUtils } from "../lib/ml-utils";
import { st, classes } from "./page-base.st.css";
import { classes as postsClasses } from "./posts.st.css";

export default function Blog(props: IPageProps) {
	const { locale, sectionName } = useContext(ReactLocaleContext);
	const { pageData } = usePageData(props);
	return (
		<Layout>
			<div className={st(classes.root, postsClasses.root)}>
				<h1 className={classes.title}>{sectionName}</h1>
				{orderBy(pageData, ["metaData.date"], ["desc"]).map(
					(page: IParsedPageData) => {
						const { metaData, path: path } = page;
						const { title, date, author } = metaData;
						return (
							<Post
								key={mlUtils.uniqueId()}
								title={title}
								date={date}
								path={path}
								locale={locale}
								author={author}
								content={page}
								className={postsClasses.post}
							/>
						);
					}
				)}
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = await mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.POSTS,
		context.locale,
		LoadFolderModes.CHILDREN
	);
	const childrenProps = await mlNextUtils.getFolderStaticProps(
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
