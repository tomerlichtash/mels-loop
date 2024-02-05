import React, { useContext } from 'react';
import { LoadContentModes, LoadFolderModes } from 'types/parser';
import { GetStaticProps } from 'next';
import { CONTENT_TYPES } from '../consts';
import { mlNextUtils } from '../lib/next-utils';
import type { IPageProps, IParsedPageData } from 'types/models';
import usePageData from '../lib/usePageData';
import { LocaleProvider } from '../locale/context/locale-context';
import orderBy from 'lodash.orderby';
import BlogPost from '../components/content-layout/article-content-layout';
import { Layout } from 'components';
import { mlUtils } from '../lib/ml-utils';

export default function Blog(props: IPageProps) {
	const { locale, sectionName } = useContext(LocaleProvider);
	const { pageData } = usePageData(props);
	return (
		<Layout>
			<div className="page">
				<h1 className="title">{sectionName}</h1>
				{orderBy(pageData, ['metaData.date'], ['desc']).map(
					(page: IParsedPageData) => {
						const { metaData, path: path } = page;
						const { title, date, author } = metaData;
						return (
							<BlogPost
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
