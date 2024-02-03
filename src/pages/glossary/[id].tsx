import React, { useContext } from 'react';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { CONTENT_TYPES } from '../../consts';
import { mlNextUtils } from '../../lib/next-utils';
import { LoadFolderModes } from '../../types/parser';
import { contentUtils } from '../../lib/content-utils';
import { IMLParsedNode, IPageProps, MLNODE_TYPES } from '../../types/models';
import Layout from '../../components/layout';
import usePageData from '../../lib/usePageData';
import { LocaleProvider } from '../../locale/context/locale-context';
import { Link, List } from '@components/index';
import { ContentIterator } from 'lib/content';

export default function GlossaryTerm(props: IPageProps) {
	const { translate } = useContext(LocaleProvider);
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

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths(
		CONTENT_TYPES.GLOSSARY,
		context.locales
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.GLOSSARY}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.FOLDER,
		{
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);
};
