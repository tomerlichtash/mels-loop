import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { IPageProps } from "../interfaces/models";
import ContentBrowser from "../components/content-browser";
import { classes } from "./index.st.css";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";

export default function Story(props: IPageProps) {
	const { translate, compLocale, className } = props;
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

export const getStaticProps: GetStaticProps = async (ctx) => {
	return mlNextUtils.getFolderStaticProps(CONTENT_TYPES.CODEX, ctx, "children");
};
