import Head from "next/head";
import Layout from "../components/layout/layout";
import ContentBrowser from "../components/content-browser";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { t } from "../locales/translate";
import { style, classes } from "./about.st.css";
import { CONTENT_TYPES } from "../consts";
import { mlNextUtils } from "../lib/next-utils";

export default function About(data) {
	const router = useRouter();
	const { locale } = router;
	return (
		<Layout>
			<Head>
				<title>
					{t("SITE_NAME", locale)} - {t("ABOUT_NAV_LABEL", locale)}
				</title>
			</Head>
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

export const getStaticProps: GetStaticProps = async (ctx) => {
	return mlNextUtils.getFolderStaticProps(CONTENT_TYPES.ABOUT, ctx, "folder");
};
