import React from 'react';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { ContentTypes, type IPageProps } from 'types';
import { getFolderStaticPaths, getFolderStaticProps } from '../../lib/next-utils';
import { useLocale, usePageData } from 'hooks';
import { Link } from '@melsloop/ml-components';
import Layout from 'layout/Layout';
import { createPopoverLinksNodeProcessor } from 'lib/next-utils/processors/createPopoverLinksNodeProcessor';
import { MLNODE_TYPES } from 'lib/types/nodes';
import { LoadFolderModes } from 'lib/types/modes';
import type { IParsedNode } from 'lib/types/models';
import ContentIterator from 'lib/content-component/ContentIterator';

export default function GlossaryTerm(props: IPageProps) {
	const { pageData } = usePageData(props);
	const page = pageData && pageData[0];
	const metaData = page?.metaData;
	const node: IParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: MLNODE_TYPES.UNKNOWN
	};
	const { t } = useLocale();

	return (
		<Layout>
			<article className="page">
				<Link
					className="title"
					href={'/glossary'}
				>
					{t('common:button:backToTarget', {
						sep: t('common:to'),
						target: t('pages:glossary:title')
					})}
				</Link>
				<h1 className="title">{t('pages:glossary:title')}</h1>
				<h2 className="title">{t(`glossary:term:${metaData?.glossary_key}`)}</h2>
				{/* TODO: Use forced translation */}
				{/* <p className="term">{t(metaData?.glossary_key, 'en')}</p> */}
				{node ? (
					<ContentIterator componentData={{ node }} />
				) : (
					<div className="no-content">(No page content)</div>
				)}
				{/* <List
					className="bibliography"
					label={''}
					items={[
						{
							label: `${metaData.source_name}${
								metaData.source_name ? ` / ${metaData.source_name}` : ''
							}`,
							url: metaData.source_url,
						},
					]}
				/> */}
			</article>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async (context) =>
	getFolderStaticPaths(ContentTypes.Glossary, context.locales);

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) =>
	getFolderStaticProps(
		`${ContentTypes.Glossary}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder,
		{
			nodeProcessors: [createPopoverLinksNodeProcessor()]
		}
	);
