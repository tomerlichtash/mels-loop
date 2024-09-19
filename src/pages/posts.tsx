import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getFolderStaticProps } from '../lib/next-utils';
import orderBy from 'lodash.orderby';
import { useLocale, usePageData } from 'hooks';
import Layout from 'layout/Layout';
import { getMetadata, renderElements } from 'helpers';
import { GenericContentLayout } from 'components/GenericContentLayout/GenericContentLayout';
import { ContentTypes, type IPageProps } from 'types';
import { LoadContentModes, LoadFolderModes } from 'lib/types/modes';
import type { IParsedPage } from 'lib/types/models';
// import styles from '../custom-layouts/GenericContentLayout/mixins/BlogPostLayoutMixin.module.css';

export default function Blog(props: IPageProps) {
	const { pageData } = usePageData(props);
	const { t, lang } = useLocale();
	const pageTitle = `${t('common:site:title')} – ${t('pages:blog:title')}`;
	const sortedItems = orderBy(pageData, ['metaData.date'], ['desc']);

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>

			<GenericContentLayout
				caption={t('pages:blog:title')}
				title={'Posts'}
			>
				{sortedItems.map((page: IParsedPage) => {
					const { path } = page;
					const [title, date, author] = getMetadata(['title', 'date', 'author'], [page]);
					return (
						<GenericContentLayout
							key={title}
							title={title}
							date={date}
							author={author}
							path={path}
							locale={lang}
							// className={styles.root}
							// pageStyles={styles}
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
	const indexProps = getFolderStaticProps(
		ContentTypes.Posts,
		context.locale,
		LoadFolderModes.Children
	);

	const childrenProps = getFolderStaticProps(
		ContentTypes.Posts,
		context.locale,
		LoadFolderModes.Children,
		{
			contentMode: LoadContentModes.Metadata
		}
	);

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const props = {
		props: {
			...(indexProps as any).props,
			metaData: (childrenProps as any).props.content
		}
	};

	return props;
};
