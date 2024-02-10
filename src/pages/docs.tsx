import React, { useContext } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { ContentTypes } from '../consts';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import type { IPageProps } from 'types/models';
import usePageData from '../hooks/usePageData';
import { LocaleContext } from '../context/locale/localeContext';
import { LoadContentModes, LoadFolderModes } from 'types/parser';
import { Layout, Link } from 'components';

const Docs: NextPage<IPageProps> = (props) => {
	const { translate } = useContext(LocaleContext);
	const { metaData } = usePageData(props);
	return (
		<Layout>
			<article className="page">
				<h1 className="title">{translate('pages.docs.label')}</h1>
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
