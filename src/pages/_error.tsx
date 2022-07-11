import React from "react";
import { NextPage } from "next";
import Layout from "../components/layout";
import PageSEO from "../components/page-seo";
import { classes } from "./_error.st.css";

const CustomError: NextPage = () => {
	return (
		<Layout>
			<PageSEO title="Error" />
			<div className={classes.root}>
				<h1>Error</h1>
			</div>
		</Layout>
	);
};

export default CustomError;
