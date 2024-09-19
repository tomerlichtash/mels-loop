import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { ContentTypes, type IPageProps } from 'types';
import { getFolderStaticProps } from '../lib/next-utils';
import { useLocale, usePageData } from 'hooks';
import { LoadFolderModes } from 'lib/types/modes';
import Layout from 'layout/Layout';
import { getMetadata, renderElements } from 'helpers';
import Head from 'next/head';
import { GenericContentLayout } from '../components/GenericContentLayout/GenericContentLayout';

const Contribute: NextPage<IPageProps> = (props) => {
	const { pageData } = usePageData(props);
	const [title] = getMetadata(['title'], pageData);
	const { t } = useLocale();
	const pageTitle = `
		${t('common:site:title')} – ${t('pages:contribute:title')}
	`;

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<GenericContentLayout
				caption={title}
				title={'Contribute and Participate'}
			>
				{renderElements(pageData)}
			</GenericContentLayout>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) =>
	getFolderStaticProps(ContentTypes.Contrib, context.locale, LoadFolderModes.Folder);

export default Contribute;
