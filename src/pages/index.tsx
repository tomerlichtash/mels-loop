import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Layout from 'layout/Layout';
import { Text, Heading } from 'components/index';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import { usePageData } from '../hooks/usePageData';
import { getMetadata, renderElements } from '../lib/dynamicContentHelpers';
import ContentTypes from '../contentTypes';
import { createPopoverLinksNodeProcessor } from 'lib/processors/createPopoverLinksNodeProcessor';

import type { IPageProps } from 'types/models';
import { LoadContentModes, LoadFolderModes } from 'types/parser';

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
	mlNextUtils.getFolderStaticProps(
		`docs/the-story-of-mel/${ContentTypes.Codex}`,
		context.locale,
		LoadFolderModes.Folder,
		{
			contentMode: LoadContentModes.Full,
			nodeProcessors: [createPopoverLinksNodeProcessor()],
		}
	);

export default Index;
