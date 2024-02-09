import React, { useContext } from 'react';
import { LoadContentModes, LoadFolderModes } from 'types/parser';
import { GetStaticProps } from 'next';
import { ContentTypes } from '../consts';
import { mlNextUtils } from '../lib/nextUtils';
import type { IPageProps, IParsedPageData } from 'types/models';
import usePageData from '../lib/usePageData';
import { LocaleContext } from '../context/locale/localeContext';
import orderBy from 'lodash.orderby';
import BlogPost from '../components/content-layout/article-content-layout/BlogPost';
import { Layout } from 'components';
import { unique } from 'utils';

export default function Blog(props: IPageProps) {
	const { locale, translate } = useContext(LocaleContext);
	const { pageData } = usePageData(props);
	return (
		<Layout>
			<div className="page">
				<h1 className="title">{translate('pages.blog.label')}</h1>
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
