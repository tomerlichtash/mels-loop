import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { classes } from "./_error.st.css";
import { ReactLayoutContext } from "../contexts/layout-context";

export default function CustomError() {
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
				<h2>Error</h2>
			</div>
		</Layout>
	);
}
