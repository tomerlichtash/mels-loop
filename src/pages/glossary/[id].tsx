import React from 'react';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import ContentTypes from 'contentTypes';
import { mlNextUtils } from '../../lib/next-utils/nextUtils';
import { LoadFolderModes } from 'types/parser';
import { MLNODE_TYPES } from 'types/models';
import type { IMLParsedNode, IPageProps } from 'types/models';
import { usePageData } from '../../hooks/usePageData';
import { Link, List } from 'components/index';
import { ContentIterator } from 'lib/dynamic-content-utils';
import Layout from 'layout/Layout';
import { useLocale } from 'hooks/index';
import { createPopoverLinksNodeProcessor } from 'lib/processors/createPopoverLinksNodeProcessor';

export default function GlossaryTerm(props: IPageProps) {
	const { pageData } = usePageData(props);
	const page = pageData && pageData[0];
	const metaData = page?.metaData;
	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: MLNODE_TYPES.UNKNOWN,
	};
	const { t } = useLocale();

	return (
		<Layout title={metaData?.title}>
			<article className="page">
				<Link className="title" href={'/glossary'}>
					{t('GLOSSARY_NAV_LABEL')}
				</Link>
				<h1 className="title">{t(metaData?.glossary_key)}</h1>
				{/* TODO: Use forced translation */}
				{/* <p className="term">{t(metaData?.glossary_key, 'en')}</p> */}
				{node ? (
					<ContentIterator componentData={{ node }} />
				) : (
					<div className="no-content">(No page content)</div>
				)}
				<List
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
				/>
			</article>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async (context) =>
	mlNextUtils.getFolderStaticPaths(ContentTypes.Glossary, context.locales);

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) =>
	mlNextUtils.getFolderStaticProps(
		`${ContentTypes.Glossary}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder,
		{
			nodeProcessors: [createPopoverLinksNodeProcessor()],
		}
	);
