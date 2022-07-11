import React, { useContext } from "react";
import Layout from "../components/layout/layout";
import { GetStaticProps, NextPage } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { mlUtils } from "../lib/ml-utils";
import { usePageData } from "../components/usePageData";
import {
	IMLParsedNode,
	IPageProps,
	IParsedPageData,
} from "../interfaces/models";
import { LoadFolderModes } from "../interfaces/parser";
import { ContentComponent } from "../components/content";
import PageSEO from "../components/page-seo";
import { classes } from "./page-base.st.css";

const Contribute: NextPage<IPageProps> = (props) => {
	const { pageData } = usePageData(props);
	const page = pageData[0] || ({} as IParsedPageData);
	const elements: IMLParsedNode[] = page.parsed || [];
	const { metaData } = pageData[0];
	return (
		<Layout>
			<PageSEO />
			<article className={classes.root}>
				<h1 className={classes.title}>{metaData.title}</h1>
				{elements.map((node) => {
					return (
						<ContentComponent
							key={mlUtils.uniqueId()}
							componentData={{ node }}
							className={classes.contentComponent}
						/>
					);
				})}
			</article>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.CONTRIBUTE,
		context.locale,
		LoadFolderModes.FOLDER
	);
};

export default Contribute;
