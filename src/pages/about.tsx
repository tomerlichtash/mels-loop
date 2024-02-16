import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import ContentTypes from '../types/content';
import { mlNextUtils } from '../lib/next-utils/nextUtils';
import { usePageData } from '../hooks/usePageData';
import { LoadFolderModes } from 'types/parser/modes';
import type { IPageProps } from 'types/models';
import Layout from 'layout/Layout';
import { getMetadata, renderElements } from 'lib/dynamicContentHelpers';

const About: NextPage<IPageProps> = (props) => {
	const { pageData } = usePageData(props);
	const [title, abstract] = getMetadata(['title', 'abstract'], pageData);

	return (
		<Layout>
			<article className="page">
				<h1 className="topic">{title}</h1>
				<p className="title">{abstract}</p>
				<div className="section">{renderElements(pageData)}</div>
			</article>
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
