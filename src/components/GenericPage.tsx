import React from 'react';
import Layout from 'layout/Layout';
import Head from 'next/head';
import ContentIterator from 'lib/content-component/ContentIterator';
import { useLocale, usePageData } from 'hooks';
import { GenericContentLayout } from 'components/GenericContentLayout/GenericContentLayout';
import { SITE_SUBTITLE, SITE_TITLE } from 'consts';
import { MLNODE_TYPES } from 'lib/types/nodes';
import { getMetadata } from 'helpers';
import type { IParsedNode } from 'lib/types/models';

interface IGenericPageProps {
	content: string;
}

/**
 * The data passed to a next component from the static props. The content is serialized to circumvent
 * next's approach to serializing
 */
export interface IContentComponentData {
	pageProps: IGenericPageProps;
	className?: string;
}

const GenericPage = ({ pageProps, className }: IContentComponentData) => {
	const { pageData } = usePageData(pageProps);
	const page = pageData && pageData[0];
	const node: IParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: MLNODE_TYPES.UNKNOWN
	};
	const { t } = useLocale();

	const [title, abstract, author, date] = getMetadata(
		['title', 'abstract', 'author', 'date'],
		pageData
	);

	const pageTitle = `
		${t(SITE_TITLE)} – ${t(SITE_SUBTITLE)} – ${title}
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
