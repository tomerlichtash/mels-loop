import React from 'react';
import { LoadContentModes, LoadFolderModes } from 'types/parser/modes';
import { GetStaticProps } from 'next';
import { ContentTypes } from 'types/content';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import type { IPageProps, IParsedPageData } from 'types/models';
import { usePageData } from '../hooks/usePageData';
import orderBy from 'lodash.orderby';
import Layout from 'layout/Layout';
import { useLocale } from 'hooks/index';
import Head from 'next/head';
import { getMetadata, renderElements } from 'lib/dynamicContentHelpers';
import { GenericContentLayout } from 'custom-layouts/generic-content-layout/GenericContentLayout';
import styles from '../custom-layouts/generic-content-layout/mixins/BlogPostLayoutMixin.module.scss';

export default function Blog(props: IPageProps) {
	const { pageData } = usePageData(props);
	const { t, lang } = useLocale();
	const pageTitle = `${t('common:site:title')} – ${t('pages:blog:title')}`;
	const sortedItems = orderBy(pageData, ['metaData.date'], ['desc']);
	const items = sortedItems || pageData;

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>

			<GenericContentLayout caption={t('pages:blog:title')} title={'Posts'}>
				{items.map((page: IParsedPageData) => {
					const { path } = page;
					const [title, date, author] = getMetadata(
						['title', 'date', 'author'],
						[page]
					);
					// return (
					// 	<div key={page.id}>Nothing</div>
					// )
					return (
						<GenericContentLayout
							key={title}
							title={title}
							date={date}
							author={author}
							path={path}
							locale={lang}
							className={styles.root}
							pageStyles={styles}
						>
							{renderElements([page])}
						</GenericContentLayout>
					);
				})}
			</GenericContentLayout>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = await mlNextUtils.getFolderStaticProps(
		ContentTypes.Posts,
		context.locale,
		LoadFolderModes.Children
	);

	const childrenProps = await mlNextUtils.getFolderStaticProps(
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
