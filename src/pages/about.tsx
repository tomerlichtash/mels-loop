import Head from "next/head";
import Layout from "../components/layout/layout";
import ContentBrowser from "../components/content-browser";
import { GetStaticProps } from "next";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";
import { IContentComponentData, IPageProps } from "../interfaces/models";
import { style, classes } from "./about.st.css";

export default function About(props: IPageProps) {
	const { translate, compLocale, className } = props;
	const { siteTitle, pageName } = compLocale;
	debugger;
	return (
		<Layout {...{ translate }}>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={style(classes.root, className)}>
				<ContentBrowser content={props.content} showTitle />
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	return mlNextUtils.getFolderStaticProps(CONTENT_TYPES.ABOUT, ctx, "folder");
};
