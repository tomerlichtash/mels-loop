import React, { useContext } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import { ReactLocaleContext } from "../contexts/locale-context";
import { classes } from "./_error.st.css";

const CustomError: NextPage = () => {
	const { siteTitle, siteSubtitle } = useContext(ReactLocaleContext);
	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - ${siteSubtitle}
				</title>
			</Head>
			<div className={classes.root}>
				<h1>Error</h1>
			</div>
		</Layout>
	);
};

export default CustomError;
