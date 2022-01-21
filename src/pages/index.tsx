import Head from "next/head";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { t } from "../locales/translate";
import { style, classes } from "./index.st.css";

export default function Home() {
	const { locale } = useRouter();
	return (
		<Layout>
			<Head>
				<title>
					{`${t("SITE_NAME", locale)} - ${t("HOME_NAV_LABEL", locale)}`}
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
