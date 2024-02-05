import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Layout } from 'components';

const Error404: NextPage = () => {
	return (
		<Layout title="404">
			<div className="error">
				<h1>404 - Page Not Found</h1>
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: {} };
};

export default Error404;
