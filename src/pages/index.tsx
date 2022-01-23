// import { GetStaticProps } from "next";
// import { getSortedDocsData } from "../lib/content-drivers/docs";
import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import { LAYOUT_LOCALE } from "../locales/components";
import { style, classes } from "./index.st.css";

export interface HomeProps {
	locale: string;
	translate: (key: string) => string;
}

export default function Home(props: HomeProps) {
	const { translate, locale } = props;
	const { siteTitle, siteSubtitle } = LAYOUT_LOCALE;
	const title = translate(siteTitle);
	const subtitle = translate(siteSubtitle);
	return (
		<Layout locale={locale} translate={translate}>
			<Head>
				<title>
					{title} - ${subtitle}
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

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
// 	const data = getSortedDocsData(locale);
// 	return {
// 		props: {
// 			content: JSON.stringify(data),
// 			locale,
// 		},
// 	};
// };
