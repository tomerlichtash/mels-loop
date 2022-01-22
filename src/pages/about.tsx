import Head from "next/head";
import Layout from "../components/layout/layout";
import ContentBrowser from "../components/content-browser";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { t } from "../locales/translate";
import { getSortedDocsData } from "../lib/content-drivers/about";
import { style, classes } from "./about.st.css";

export default function About(data) {
	const router = useRouter();
	const { locale } = router;
	// const props = JSON.parse(data.content);
	// console.log(props[0].content);
	return (
		<Layout>
			<Head>
				<title>
					{t("SITE_NAME", locale)} - {t("ABOUT_NAV_LABEL", locale)}
				</title>
			</Head>
			{/* <section className={classes.root}>
				<h1>{t("ABOUT_PAGE_LABEL", locale)}</h1>
				{props[0].content}
			</section> */}
			<article className={style(classes.root)}>
				<ContentBrowser
					data={data}
					locale={locale}
					showTitle
				/>
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const data = getSortedDocsData(locale);
	return {
		props: {
			content: JSON.stringify(data),
			locale,
		},
	};
};
