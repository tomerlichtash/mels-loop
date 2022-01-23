import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { getSortedCodexData } from "../lib/content-drivers/codex";
import { IContentComponentData } from "../interfaces/models";
import { LAYOUT_LOCALE } from "../locales/components";
import ContentBrowser from "../components/content-browser";
import { classes } from "./index.st.css";

export default function Story(data: IContentComponentData) {
	const { translate, locale } = data;
	const { siteTitle, siteSubtitle } = LAYOUT_LOCALE;
	return (
		<Layout locale={locale} translate={translate}>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(siteSubtitle)}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const data = getSortedCodexData(locale);
	return {
		props: {
			content: JSON.stringify(data),
			locale,
		},
	};
};
