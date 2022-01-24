import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import { HOME_PAGE_LOCALE } from "../locales/components";
import { style, classes } from "./index.st.css";

export interface HomeProps {
	locale: string;
	translate: (key: string) => string;
}

export default function Home(props: HomeProps) {
	const { translate, locale } = props;
	const { siteTitle, pageName } = HOME_PAGE_LOCALE;
	return (
		<Layout {...{ locale, translate }}>
			<Head>
				<title>
					{translate(siteTitle)} - ${translate(pageName)}
				</title>
			</Head>
			<article className={style(classes.root)}>
				<div>the story</div>
				<div>glossary</div>
				<div>photos</div>
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locale,
		},
	};
};
