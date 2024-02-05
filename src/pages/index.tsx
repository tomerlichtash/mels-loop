import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import type { IPageProps } from 'types/models';
import { mlNextUtils } from '../lib/next-utils';
import { LoadContentModes, LoadFolderModes } from 'types/parser';
import { contentUtils } from '../lib/content-utils';
import usePageData from '../lib/usePageData';
import { getMetadata, renderElements } from '../lib/content/helpers';
import { CONTENT_TYPES } from '../consts';
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

export const getStaticProps: GetStaticProps = async (context) => {
	/**
	 * @param node Guaranteed link node
	 * @param mode
	 * @returns
	 */
	return mlNextUtils.getFolderStaticProps(
		`docs/the-story-of-mel/${CONTENT_TYPES.CODEX}`,
		context.locale,
		LoadFolderModes.FOLDER,
		{
			contentMode: LoadContentModes.FULL,
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);
};

export default Index;
