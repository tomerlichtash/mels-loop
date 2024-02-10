import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import type { IPageProps } from 'types/models';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import { LoadContentModes, LoadFolderModes } from 'types/parser';
import { contentUtils } from '../lib/content-utils/contentUtils';
import usePageData from '../hooks/usePageData';
import { getMetadata, renderElements } from '../lib/dynamic-content/helpers';
import { ContentTypes } from '../consts';
import { Layout, Text, Heading } from 'components';

const Index: NextPage<IPageProps> = (props) => {
	const { pageData } = usePageData(props);
	const [title, moto] = getMetadata(['title', 'moto'], pageData);
	return (
		<Layout>
			<article>
				<Heading level={1} className="title">
					{title}
				</Heading>
				<Text variant="h2">{moto}</Text>
				{renderElements(pageData)}
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) =>
	/**
	 * @param node Guaranteed link node
	 * @param mode
	 * @returns
	 */
	mlNextUtils.getFolderStaticProps(
		`docs/the-story-of-mel/${ContentTypes.Codex}`,
		context.locale,
		LoadFolderModes.Folder,
		{
			contentMode: LoadContentModes.Full,
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);

export default Index;
