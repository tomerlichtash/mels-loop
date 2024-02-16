import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Layout from 'layout/Layout';
import Head from 'next/head';
import { useLocale } from 'hooks/useLocale';

const Error404: NextPage = () => {
	const { t } = useLocale();
	const pageTitle = `${t('pages:404:title')}`;
	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<div className="error">
				<h1>404 - Page Not Found</h1>
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => ({ props: {} });

export default Error404;
