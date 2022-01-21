import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getSortedCodexData } from "../lib/content-drivers/codex";
import { IContentComponentData } from "../interfaces/models";
import ContentBrowser from "../components/content-browser";
import { t } from "../locales/translate";
import { style, classes } from "./index.st.css";

export default function Story(data: IContentComponentData) {
	const { locale } = useRouter();
	return (
		<Layout>
			<Head>
				<title>
					{`${t("SITE_NAME", locale)} - ${t("STORY_NAV_LABEL", locale)}`}
				</title>
			</Head>
			<article className={style(classes.root)}>
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
