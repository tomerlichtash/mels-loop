import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { ContentTypes } from 'types/content';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import { usePageData } from '../hooks/usePageData';
import { LoadFolderModes } from 'types/parser/modes';
import { ContentComponent } from 'lib/dynamic-content-utils';
import { unique } from 'utils/index';
import type { IMLParsedNode, IPageProps, IParsedPageData } from 'types/models';
import Layout from 'layout/Layout';

const Contribute: NextPage<IPageProps> = (props) => {
	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed || [];
	const { metaData } = pageData[0];
	return (
		<Layout>
			<article className="page">
				<h1 className="title">{metaData.title}</h1>
				<div className="section">
					{elements.map((node) => {
						return (
							<ContentComponent key={unique.id()} componentData={{ node }} />
						);
					})}
				</div>
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) =>
	mlNextUtils.getFolderStaticProps(
		ContentTypes.Contrib,
		context.locale,
		LoadFolderModes.Folder
	);

export default Contribute;
