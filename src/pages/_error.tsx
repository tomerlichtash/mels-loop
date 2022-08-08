import React from "react";
import { GetStaticProps, NextPage } from "next";
import Layout from "../components/layout";
import { classes } from "./_error.st.css";

const CustomError: NextPage = () => {
	return (
		<Layout title="Error">
			<div className={classes.root}>
				<h1>Error</h1>
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default CustomError;
