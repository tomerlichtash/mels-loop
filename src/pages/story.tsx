import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { IPageProps, MLParseModes } from "../interfaces/models";
import ContentBrowser from "../components/content-browser";
import { classes } from "./index.st.css";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils, LoadFolderModes } from "../lib/next-utils";
import { LoadContentModes } from "../lib/markdown-driver";

export default function Story(props: IPageProps) {
	const { translate, compLocale } = props;
	const { siteTitle, pageName } = compLocale;
	return (
		<Layout {...{ translate }}>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={classes.root}>
				<ContentBrowser
					content={props.content}
					showTitle
					showMoto
					showCredits
				/>
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	return mlNextUtils.getFolderStaticProps(
		CONTENT_TYPES.CODEX,
		context,
		LoadFolderModes.FOLDER,
		LoadContentModes.FULL,
		MLParseModes.VERSE
	);
};
