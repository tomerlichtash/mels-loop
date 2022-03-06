import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { ReactLayoutContext } from "../contexts/layout-context";
import { classes } from "./_error.st.css";

export default function CustomError() {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, getSiteTitle, getSiteSubtitle } = layoutContext;
	return (
		<Layout>
			<Head>
				<title>
					{translate(getSiteTitle())} - ${translate(getSiteSubtitle())}
				</title>
			</Head>
			<div className={classes.root}>
				<h2>Error</h2>
			</div>
		</Layout>
	);
}
