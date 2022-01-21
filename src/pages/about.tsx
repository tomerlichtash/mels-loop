import Head from "next/head";
import Layout from "../components/layout/layout";
import { useRouter } from "next/router";
import { t } from "../locales/translate";
import { classes } from "./about.st.css";

export default function About() {
	const router = useRouter();
	const { locale } = router;
	return (
		<Layout>
			<Head>
				<title>
					{t("SITE_NAME", locale)} - ${t("ABOUT_NAV_LABEL", locale)}
				</title>
			</Head>
			<section className={classes.root}>
				<h1>About</h1>
				{/* <h2>{aboutLocale[locale].title}</h2> */}
				About this site
			</section>
		</Layout>
	);
}
