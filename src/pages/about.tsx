import React from "react";
import Layout from "../components/site/Layout/Layout";
import { GetStaticProps, NextPage } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { mlUtils } from "../lib/ml-utils";
import usePageData from "../lib/usePageData";
import {
	IMLParsedNode,
	IPageProps,
	IParsedPageData,
} from "../interfaces/models";
import { LoadFolderModes } from "../interfaces/parser";
import { ContentComponent } from "../components/content";

const About: NextPage<IPageProps> = (props) => {
	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed || [];
	const { metaData } = pageData[0];
	return (
		<Layout>
			<article className="page">
				<h1 className="topic">{metaData.title}</h1>
				<p className="title">{metaData.abstract}</p>
				<div className="section">
					{elements.map((node) => {
						return (
							<ContentComponent
								key={mlUtils.uniqueId()}
								componentData={{ node }}
							/>
						);
					})}
				</div>
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.ABOUT,
		context.locale,
		LoadFolderModes.FOLDER
	);
};

export default About;
