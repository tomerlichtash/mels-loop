import Layout from "../../components/layout";
import { getAllDocIds, getDocData } from "../../lib/content-drivers/docs";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Doc({
	docData,
}: {
	docData: {
		title: string;
		date: string;
		contentHtml: string;
	};
}) {
	return (
		<Layout>
			<Head>
				<title>{docData.title}</title>
			</Head>
			<article>
				<h1>{docData.title}</h1>
				<div>{/* <Date dateString={docData.date} locale={locale} /> */}</div>
				<div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
			</article>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const paths = getAllDocIds(locales);
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	const docData = await getDocData(params.id as string, locale);
	return {
		props: {
			docData,
		},
	};
};