import React, { useContext } from 'react';
import Head from 'next/head';
import { LocaleContext } from '../../context/locale/localeContext';
import type {
	IContentComponentData,
	IMLParsedNode,
	IPageMetaData,
} from 'types/models';
import { MLNODE_TYPES } from 'types/models';
import { ContentIterator } from './contentIterator';
import usePageData from '../usePageData';
import { Layout, DateFormat } from 'components';

const GenericPage = (props: IContentComponentData) => {
	const { translate, locale } = useContext(LocaleContext);
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
	return (
		<Layout>
			<Head>
				{translate('site.title')} - {translate('site.subtitle')} -{' '}
				{metaData?.title}
			</Head>
			<article className="generic-page">
				<header className="header">
					<h1 className="title">{metaData?.title}</h1>
					{abstract && <div className="subtitle">{abstract}</div>}
					<div className="meta" data-has-content={!!author || !!date}>
						{author && <div className="byline">{author}</div>}
						{date && <DateFormat date={date} locale={locale} />}
					</div>
				</header>
				{node ? (
					<ContentIterator
						componentData={{ node }}
						className="content-component"
					/>
				) : (
					<div className="no-content">(No page content)</div>
				)}
			</article>
		</Layout>
	);
};

export default GenericPage;
