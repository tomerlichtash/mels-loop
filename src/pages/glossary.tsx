import React from 'react';
import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { getFolderStaticProps } from '../lib/next-utils';
import { useLocale, usePageData } from 'hooks';
import Layout from 'layout/Layout';
import { Link, Text } from '@melsloop/ml-components';
import { ContentTypes, type IPageProps } from 'types';
import { LoadContentModes, LoadFolderModes } from 'lib/types/modes';

const Glossary: NextPage<IPageProps> = (props) => {
	const { metaData } = usePageData(props);
	const { t } = useLocale();
	const pageTitle = `${t('common:site:title')} – ${t('pages:glossary:title')}`;

	const getItem = (page, index) => {
		const term = page.metaData;
		const key = `term-${index}`;
		const { glossary_key } = term;
		return glossary_key ? (
			<Link href={page.path}>{t(`glossary:term:${term.glossary_key}`)}</Link>
		) : (
			<Text
				key={key}
				className="error"
			>
				Missing glossary term data {page.id}
			</Text>
		);
	};

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<article className="page">
				<h1 className="title">{t('pages:glossary:title')}</h1>
				{metaData.length && (
					<ul className="term-list">
						{metaData.map((page, index) => (
							<li key={`glossary-item-${page.id}`}>{getItem(page, index)}</li>
						))}
					</ul>
				)}
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = getFolderStaticProps(
		ContentTypes.Glossary,
		context.locale,
		LoadFolderModes.Folder
	);

	const childrenProps = getFolderStaticProps(
		ContentTypes.Glossary,
		context.locale,
		LoadFolderModes.Children,
		{
			contentMode: LoadContentModes.Full
		}
	);

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const props = {
		props: {
			...(indexProps as any).props,
			metaData: (childrenProps as any).props.content
		}
	};

	return props;
};

export default Glossary;
