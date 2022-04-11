import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { ReactLocaleContext } from "../contexts/locale-context";
import { classes } from "./_error.st.css";

export default function CustomError() {
	const { translate, getSiteTitle, getSiteSubtitle } =
		useContext(ReactLocaleContext);
	return (
		<Layout>
			<Head>
				<title>
					{translate(getSiteTitle())} - ${translate(getSiteSubtitle())}
				</title>
			</Head>
			<div className={classes.root}>
				<h1>Error</h1>
			</div>
		</Layout>
	);
}
