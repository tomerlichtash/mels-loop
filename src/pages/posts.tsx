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
import PostHeader from "../components/post/post-header";
import { mlUtils } from "../lib/ml-utils";
import { classes } from "./page-base.st.css";

export default function Blog(props: IPageProps) {
	const { locale, sectionName } = useContext(ReactLocaleContext);
	const { pageData } = usePageData(props);
	return (
		<Layout>
			<div className={classes.root}>
				<h1 className={classes.title}>{sectionName}</h1>
				{orderBy(pageData, ["metaData.date"], ["desc"]).map(
					(page: IParsedPageData) => {
						const { metaData, path } = page;
						const { title, date, author } = metaData;
						return (
							<PostHeader
								key={mlUtils.uniqueId()}
								title={title}
								date={date}
								path={path}
								locale={locale}
								author={author}
								className={classes.post}
							/>
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
