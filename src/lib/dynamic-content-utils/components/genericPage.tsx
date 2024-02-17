import React from 'react';
import Layout from 'layout/Layout';
import Head from 'next/head';
import type { IContentComponentData, IMLParsedNode } from 'types/models';
import { ContentIterator } from '../contentIterator';
import { usePageData } from '../../../hooks/usePageData';
import { useLocale } from 'hooks/index';
import { MLNODE_TYPES } from 'types/nodes';
import { GenericContentLayout } from 'custom-layouts/generic-content-layout/GenericContentLayout';
import { getMetadata } from 'lib/dynamicContentHelpers';

const GenericPage = ({ pageProps, className }: IContentComponentData) => {
	const { pageData } = usePageData(pageProps);
	const page = pageData && pageData[0];
	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: MLNODE_TYPES.UNKNOWN,
	};
	const { t } = useLocale();

	const [title, abstract, author, date] = getMetadata(
		['title', 'abstract', 'author', 'date'],
		pageData
	);

	const pageTitle = `
		${t('common:site:title')} – ${t('common:site:subtitle')} – ${title}
	`;

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<GenericContentLayout
				title={title}
				abstract={abstract}
				author={author}
				date={date}
				className={className}
			>
				<ContentIterator componentData={{ node }} />
			</GenericContentLayout>
		</Layout>
	);
};

export default GenericPage;
