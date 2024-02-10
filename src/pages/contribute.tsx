import React from 'react';
import { Layout } from 'components';
import { GetStaticProps, NextPage } from 'next';
import { ContentTypes } from '../consts';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import usePageData from '../hooks/usePageData';
import { LoadFolderModes } from 'types/parser';
import { ContentComponent } from 'lib/dynamic-content';
import { unique } from 'utils';
import type { IMLParsedNode, IPageProps, IParsedPageData } from 'types/models';

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
