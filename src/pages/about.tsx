import Head from "next/head";
import Layout from "../components/layout/layout";
import ContentBrowser from "../components/content-browser";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { ABOUT_PAGE_LOCALE } from "../locales/components";
import { ComponentProps, IContentComponentData } from "../interfaces/models";
import { style, classes } from "./about.st.css";

export interface AboutProps extends ComponentProps {
	content: IContentComponentData;
}

export default function About(props: IContentComponentData) {
	const { translate, locale, className } = props;
	const { siteTitle, pageName } = ABOUT_PAGE_LOCALE;
	const title = translate(siteTitle);
	// const subtitle = translate(siteSubtitle);
	const pageTitle = translate(pageName);
	return (
		<Layout {...{ locale, translate }}>
			<Head>
				<title>
					{title} - {pageTitle}
				</title>
			</Head>
			<article className={style(classes.root, className)}>
				<ContentBrowser data={props} locale={locale} showTitle />
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	return mlNextUtils.getFolderStaticProps(CONTENT_TYPES.ABOUT, ctx, "folder");
};
