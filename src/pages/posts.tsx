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

export default function Blog(props: IPageProps) {
	const { locale, sectionName } = useContext(ReactLocaleContext);
	const { pageData } = usePageData(props);
	return (
		<Layout>
			<div className="page">
				<h1 className="title">{sectionName}</h1>
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
