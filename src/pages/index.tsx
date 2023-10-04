import React from "react";
import Layout from "../components/site/Layout";
import { GetStaticProps, NextPage } from "next";
import {
	IMLParsedNode,
	IPageProps,
	IParsedPageData,
} from "../interfaces/models";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { mlUtils } from "../lib/ml-utils";
import { LoadContentModes, LoadFolderModes } from "../interfaces/parser";
import { contentUtils } from "../lib/content-utils";
import usePageData from "../lib/usePageData";
import { ContentComponent } from "../components/content";

const Index: NextPage<IPageProps> = (props) => {
	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const { metaData } = pageData[0];
	const { title, moto } = metaData;
	const elements: IMLParsedNode[] = page.parsed;
	return (
		<Layout>
			<article>
				<h1 className="title">{title}</h1>
				<p className="moto">{moto}</p>
				{elements.map((node) => (
					<ContentComponent
						key={mlUtils.uniqueId()}
						className={"content-component"}
						componentData={{ node }}
					/>
				))}
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	/**
	 * @param node Guaranteed link node
	 * @param mode
	 * @returns
	 */
	return mlNextUtils.getFolderStaticProps(
		`docs/the-story-of-mel/${CONTENT_TYPES.CODEX}`,
		context.locale,
		LoadFolderModes.FOLDER,
		{
			contentMode: LoadContentModes.FULL,
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);
};

export default Index;
