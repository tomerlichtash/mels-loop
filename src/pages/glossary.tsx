import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import ContentTypes from 'contentTypes';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import type { IPageProps } from 'types/models';
import { usePageData } from '../hooks/usePageData';
import { LoadContentModes, LoadFolderModes } from 'types/parser';
import { Link } from 'components/index';
import Layout from 'layout/Layout';
import { useLocale } from 'hooks/index';

const Glossary: NextPage<IPageProps> = (props) => {
	const { metaData } = usePageData(props);
	const { t } = useLocale();

	return (
		<Layout>
			<article className="page">
				<h1 className="title">{t('glossary:page:title')}</h1>
				{metaData.length && (
					<ul className="term-list">
						{metaData.map((page, index) => {
							const term = page.metaData;
							const key = `term-${index}`;
							const { glossary_key } = term;
							return glossary_key ? (
								<li className="term" key={key}>
									<Link href={page.path}>
										{t(`glossary:term:${term.glossary_key}`)}
									</Link>
								</li>
							) : (
								<div key={key} className="error">
									Missing glossary term data {page.id}
								</div>
							);
						})}
					</ul>
				)}
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = mlNextUtils.getFolderStaticProps(
		ContentTypes.Glossary,
		context.locale,
		LoadFolderModes.Folder
	);

	const childrenProps = mlNextUtils.getFolderStaticProps(
		ContentTypes.Glossary,
		context.locale,
		LoadFolderModes.Children,
		{
			contentMode: LoadContentModes.Full,
		}
	);

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const props = {
		props: {
			...(indexProps as any).props,
			metaData: (childrenProps as any).props.content,
		},
	};

	return props;
};

export default Glossary;
