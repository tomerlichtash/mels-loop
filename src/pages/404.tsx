import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
// import { GetStaticProps } from "next";
import { ReactLayoutContext } from "../contexts/layout-context";
import { classes } from "./_error.st.css";

export default function Error404() {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, compLocale } = layoutContext;
	const { siteTitle, pageName } = compLocale;
	return (
		<Layout>
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

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
// 	return {
// 		props: {
// 			locale,
// 		},
// 	};
// };
