import React, { useContext } from 'react';
import Head from 'next/head';
import { LocaleProvider } from '../../locale/context/locale-context';
import type {
	IContentComponentData,
	IMLParsedNode,
	IPageMetaData,
} from 'types/models';
import { MLNODE_TYPES } from 'types/models';
import { ContentIterator } from './contentIterator';
import usePageData from '../../lib/usePageData';
import { Layout, DateFormat } from 'components';

export default function GenericPage(props: IContentComponentData) {
	const { siteTitle, siteSubtitle, locale } = useContext(LocaleProvider);
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
				{siteTitle} - {siteSubtitle} - {metaData?.title}
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
}
