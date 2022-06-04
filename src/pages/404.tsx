import React, { useContext } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
// import { GetStaticProps } from "next";
import { ReactLocaleContext } from "../contexts/locale-context";
import { classes } from "./_error.st.css";

const Error404: NextPage = () => {
	const { siteTitle, siteSubtitle } = useContext(ReactLocaleContext);
	return (
		<Layout>
			<Head>
				<title>
					{siteTitle} - {siteSubtitle}
				</title>
			</Head>
			<div className={classes.root}>
				<h1>404 - Page Not Found</h1>
			</div>
		</Layout>
	);
};

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
// 	return {
// 		props: {
// 			locale,
// 		},
// 	};
// };

export default Error404;
