import React, { useContext } from 'react';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { ContentTypes } from '../../consts';
import { mlNextUtils } from '../../lib/nextUtils';
import { LoadFolderModes } from 'types/parser';
import { contentUtils } from '../../lib/contentUtils';
import { MLNODE_TYPES } from 'types/models';
import type { IMLParsedNode, IPageProps } from 'types/models';
import usePageData from '../../lib/usePageData';
import { LocaleContext } from '../../context/locale/localeContext';
import { Layout, Link, List } from 'components';
import { ContentIterator } from 'lib/dynamic-content';

export default function GlossaryTerm(props: IPageProps) {
	const { translate } = useContext(LocaleContext);
	const { pageData } = usePageData(props);
	const page = pageData && pageData[0];
	const metaData = page?.metaData;
	const node: IMLParsedNode = page && {
		children: page.parsed,
		key: page.id,
		line: -1,
		type: MLNODE_TYPES.UNKNOWN,
	};
	return (
		<Layout title={metaData?.title}>
			<article className="page">
				<Link className="title" href={'/glossary'}>
					{translate('GLOSSARY_NAV_LABEL')}
				</Link>
				<h1 className="title">{translate(metaData?.glossary_key)}</h1>
				<p className="term">{translate(metaData?.glossary_key, 'en')}</p>
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
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);
