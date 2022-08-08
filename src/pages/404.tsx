import React from "react";
import { GetStaticProps, NextPage } from "next";
import Layout from "../components/layout";
import { classes } from "./_error.st.css";

const Error404: NextPage = () => {
	return (
		<Layout title="404">
			<div className={classes.root}>
				<h1>404 - Page Not Found</h1>
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default Error404;
