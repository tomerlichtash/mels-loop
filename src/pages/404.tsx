import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { ComponentProps } from "../interfaces/models";
import { ERROR_404_PAGE_LOCALE } from "../locales/components";
import { classes } from "./404.st.css";

export default function Custom404(props: ComponentProps) {
	const { translate, locale } = props;
	const { siteTitle, pageName } = ERROR_404_PAGE_LOCALE;
	return (
		<Layout {...{ locale, translate }}>
			<Head>
				<title>
					{translate(siteTitle)} - ${translate(pageName)}
				</title>
			</Head>
			<div className={classes.root}>
				<h1>404 - Page Not Found</h1>
			</div>
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
