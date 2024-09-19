import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { getFolderStaticProps } from '../lib/next-utils';
import { useLocale, usePageData } from 'hooks';
import { ContentTypes, type IPageProps } from 'types';
import Layout from 'layout/Layout';
import { Container } from '@melsloop/ml-components';
import { GenericContentLayout } from 'components/GenericContentLayout/GenericContentLayout';
import { LoadFolderModes } from 'lib/types/modes';
import { getMetadata, renderElements } from 'helpers';

const About: NextPage<IPageProps> = (props) => {
	const { pageData } = usePageData(props);
	const [title, abstract] = getMetadata(['title', 'abstract'], pageData);
	const { t } = useLocale();

	return (
		<Layout>
			<Head>
				<title>{`${t('common:site:title')} – ${t('pages:about:title')}`}</title>
			</Head>
			<GenericContentLayout
				caption={title}
				title={abstract}
			>
				<Container flexDirection="column">{renderElements(pageData)}</Container>
			</GenericContentLayout>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) =>
	getFolderStaticProps(ContentTypes.About, context.locale, LoadFolderModes.Folder);

export default About;
