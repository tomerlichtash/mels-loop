import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { ContentTypes, type IPageProps } from 'types';
import { getFolderStaticProps } from '../lib/next-utils';
import { useLocale, usePageData } from 'hooks';
import { Link } from '@melsloop/ml-components';
import Layout from 'layout/Layout';
import { LoadContentModes, LoadFolderModes } from 'lib/types/modes';

const Docs: NextPage<IPageProps> = (props) => {
	const { metaData } = usePageData(props);
	const { t } = useLocale();
	return (
		<Layout>
			<article className="page">
				<h1 className="title">{t('docs:page:title')}</h1>
				{metaData.length && (
					<ul>
						{metaData.map((page, index) => {
							const key = `doc-${index}`;
							return (
								<li
									className="item"
									key={key}
								>
									<Link href={page.path}>{page.metaData.title}</Link>
								</li>
							);
						})}
					</ul>
				)}
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const indexProps = getFolderStaticProps(
		ContentTypes.Docs,
		context.locale,
		LoadFolderModes.Folder
	);

	const childrenProps = getFolderStaticProps(
		ContentTypes.Docs,
		context.locale,
		LoadFolderModes.Children,
		{
			contentMode: LoadContentModes.Metadata
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

export default Docs;
