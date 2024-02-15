import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Layout from 'layout/Layout';

const Error404: NextPage = () => {
	return (
		<Layout title="404">
			<div className="error">
				<h1>404 - Page Not Found</h1>
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => ({ props: {} });

export default Error404;
