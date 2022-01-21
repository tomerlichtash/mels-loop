import Head from "next/head";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { t } from "../locales/translate";
import { classes } from "./404.st.css";

export default function Custom404() {
	const { locale } = useRouter();
	return (
		<Layout>
			<Head>
				<title>
					${t("ERROR_FILE_NOT_FOUND", locale)} - $
					{t("ERROR_404_FILE_NOT_FOUND", locale)}
				</title>
			</Head>
			<div className={classes.root}>
				<h1>404 - Page Not Found</h1>
			</div>
		</Layout>
	);
}
