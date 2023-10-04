import React from "react";
import { GetStaticProps, NextPage } from "next";
import Layout from "../components/site/Layout";

const CustomError: NextPage = () => {
	return (
		<Layout title="Error">
			<div className="error">
				<h1>Error</h1>
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default CustomError;
