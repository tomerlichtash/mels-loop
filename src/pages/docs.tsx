import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { ContentTypes } from 'types/content';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import type { IPageProps } from 'types/models';
import { usePageData } from '../hooks/usePageData';
import { LoadContentModes, LoadFolderModes } from 'types/parser/modes';
import { Link } from 'components/index';
import Layout from 'layout/Layout';
import { useLocale } from 'hooks/index';

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
								<li className="item" key={key}>
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
	const indexProps = mlNextUtils.getFolderStaticProps(
		ContentTypes.Docs,
		context.locale,
		LoadFolderModes.Folder
	);

	const childrenProps = mlNextUtils.getFolderStaticProps(
		ContentTypes.Docs,
		context.locale,
		LoadFolderModes.Children,
		{
			contentMode: LoadContentModes.Metadata,
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

export default Docs;
