import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { IContentComponentData } from "../interfaces/models";
import ContentBrowser from "../components/content-browser";
import { t } from "../locales/translate";
import { style, classes } from "./index.st.css";
import { loadContentFolder } from "../lib/markdown-driver";
import { CONTENT_TYPES } from "../consts";

export default function Story(data: IContentComponentData) {
	const { locale } = useRouter();
	return (
		<Layout>
			<Head>
				<title>
					{t("SITE_NAME", locale)} - {t("STORY_NAV_LABEL", locale)}
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
	const data = loadContentFolder({ relativePath: CONTENT_TYPES.CODEX, locale, type: "children" });
	return {
		props: {
			content: JSON.stringify(data.pages),
			locale,
		},
	};
};
