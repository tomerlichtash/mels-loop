import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { IContentComponentData } from "../interfaces/models";
import { STORY_PAGE_LOCALE } from "../locales/components";
import ContentBrowser from "../components/content-browser";
import { classes } from "./index.st.css";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";

export default function Story(data: IContentComponentData) {
	const { translate, locale } = data;
	const { siteTitle, pageName } = STORY_PAGE_LOCALE;
	return (
		<Layout {...{ locale, translate }}>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={classes.root}>
				<ContentBrowser
					data={data}
					locale={locale}
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
