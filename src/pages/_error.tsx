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
	/**
	 * Yep, it's empty, but needed to force reading cookies and request
	 * headers on server-side so _document can read it
	 *
	 * See references:
	 * https://github.com/vercel/next.js/discussions/18235
	 * https://eric-schaefer.com/til/2022/02/05/next.js-unexpected-missing-ctx.req-in-_document/
	 */
	return { props: {} };
};

export default CustomError;
