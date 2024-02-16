import React from 'react';
import { LoadContentModes, LoadFolderModes } from 'types/parser/modes';
import { GetStaticProps } from 'next';
import { ContentTypes } from 'types/content';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import type { IPageProps, IParsedPageData } from 'types/models';
import { usePageData } from '../hooks/usePageData';
import orderBy from 'lodash.orderby';
import BlogPost from '../components/content-layout/article-content-layout/BlogPost';
import { unique } from 'utils/index';
import Layout from 'layout/Layout';
import { useLocale } from 'hooks/index';

export default function Blog(props: IPageProps) {
	const { pageData } = usePageData(props);
	const { t, lang } = useLocale();
	return (
		<Layout>
			<div className="page">
				<h1 className="title">{t('blog:page:title')}</h1>
				{orderBy(pageData, ['metaData.date'], ['desc']).map(
					(page: IParsedPageData) => {
						const { metaData, path: path } = page;
						const { title, date, author } = metaData;
						return (
							<BlogPost
								key={unique.id()}
								title={title}
								date={date}
								path={path}
								locale={lang}
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
		ContentTypes.Posts,
		context.locale,
		LoadFolderModes.Children
	);

	const childrenProps = mlNextUtils.getFolderStaticProps(
		ContentTypes.Posts,
		context.locale,
		LoadFolderModes.Children,
		{
			contentMode: LoadContentModes.Metadata,
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
