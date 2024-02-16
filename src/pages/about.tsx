import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { ContentTypes } from '../types/content';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import { usePageData } from '../hooks/usePageData';
import { LoadFolderModes } from 'types/parser/modes';
import type { IPageProps } from 'types/models';
import Layout from 'layout/Layout';
import { getMetadata, renderElements } from 'lib/dynamicContentHelpers';
import Head from 'next/head';
import { useLocale } from 'hooks/useLocale';
import { GenericPageContentLayout } from 'custom-layouts/generic-page-content-layout/GenericPageContentLayout';

const About: NextPage<IPageProps> = (props) => {
	const { pageData } = usePageData(props);
	const [title, abstract] = getMetadata(['title', 'abstract'], pageData);
	const { t } = useLocale();
	const pageTitle = `${t('common:site:title')} – ${t('pages:about:title')}`;

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<GenericPageContentLayout title={title} abstract={abstract}>
				{renderElements(pageData)}
			</GenericPageContentLayout>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) =>
	mlNextUtils.getFolderStaticProps(
		ContentTypes.About,
		context.locale,
		LoadFolderModes.Folder
	);

export default About;
