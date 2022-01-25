import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { IPageProps } from "../interfaces/models";
import { classes } from "./_error.st.css";

export default function Error404(props: IPageProps) {
	const { translate, compLocale } = props;
	const { siteTitle, pageName } = compLocale;
	return (
		<Layout {...{ translate }}>
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
