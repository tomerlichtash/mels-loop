import React from 'react';
import Layout from 'layout/Layout';
import Head from 'next/head';
import type {
	IContentComponentData,
	IMLParsedNode,
	IPageMetaData,
} from 'types/models';
import { ContentIterator } from '../contentIterator';
import { usePageData } from '../../../hooks/usePageData';
import { DateFormat } from 'components/index';
import { useLocale } from 'hooks/index';
import { MLNODE_TYPES } from 'types/nodes';
import { localeDateFormat } from 'layout/consts';

const GenericPage = (props: IContentComponentData) => {
	const { t, lang } = useLocale();
	const { pageData } = usePageData(props.pageProps);

	const page = pageData && pageData[0];
	const metaData = page?.metaData || ({} as IPageMetaData);
	const { author, date, abstract } = metaData;

	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: MLNODE_TYPES.UNKNOWN,
	};

	const pageTitle = `${t('common:site:title')} – ${t(
		'common:site:subtitle'
	)} – ${metaData?.title}`;

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<article className="generic-page">
				<header className="header">
					<h1 className="title">{metaData?.title}</h1>
					{abstract && <div className="subtitle">{abstract}</div>}
					<div className="meta" data-has-content={!!author || !!date}>
						{author && <div className="byline">{author}</div>}
						{date && <DateFormat date={date} format={localeDateFormat[lang]} />}
					</div>
				</header>
				{node ? (
					<ContentIterator componentData={{ node }} />
				) : (
					<div className="no-content">(No page content)</div>
				)}
			</article>
		</Layout>
	);
};

export default GenericPage;