import React from 'react';
import { Layout } from 'components';
import { GetStaticProps, NextPage } from 'next';
import { CONTENT_TYPES } from '../consts';
import { mlNextUtils } from '../lib/next-utils';
import { mlUtils } from '../lib/ml-utils';
import usePageData from '../lib/usePageData';
import type { IMLParsedNode, IPageProps, IParsedPageData } from 'types/models';
import { LoadFolderModes } from 'types/parser';
import { ContentComponent } from 'lib/content';

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
							<ContentComponent
								key={mlUtils.uniqueId()}
								componentData={{ node }}
							/>
						);
					})}
				</div>
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.CONTRIBUTE,
		context.locale,
		LoadFolderModes.FOLDER
	);
};

export default Contribute;
