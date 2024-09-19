import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { getFolderStaticProps } from 'lib/next-utils';
import { useLocale, usePageData } from 'hooks';
import Head from 'next/head';
import Layout from 'layout/Layout';
import { ContentTypes, type IPageProps } from 'types';
import { createPopoverLinksNodeProcessor } from 'lib/next-utils/processors/createPopoverLinksNodeProcessor';
import { getMetadata, renderElements } from 'helpers';
import { GenericContentLayout } from 'components/GenericContentLayout/GenericContentLayout';
import { LoadContentModes, LoadFolderModes } from 'lib/types/modes';

const Index: NextPage<IPageProps> = (props) => {
	const { t } = useLocale();
	const { pageData } = usePageData(props);
	const [title, moto] = getMetadata(['title', 'moto'], pageData);

	const pageTitle = `${t('common:site:title')} – ${t('common:site:subtitle')}`;

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<GenericContentLayout
				title={title}
				abstract={moto}
			>
				{renderElements(pageData)}
			</GenericContentLayout>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) =>
	getFolderStaticProps(
		`docs/the-story-of-mel/${ContentTypes.Codex}`,
		context.locale,
		LoadFolderModes.Folder,
		{
			contentMode: LoadContentModes.Full,
			nodeProcessors: [createPopoverLinksNodeProcessor()]
		}
	);

export default Index;
