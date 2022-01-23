import Layout from "../../components/layout";
import { getAllDocIds, getDocData } from "../../lib/content-drivers/docs";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { ComponentProps } from "../../interfaces/models";

export interface DocProps extends ComponentProps {
	docData: {
		title: string;
		date: string;
		contentHtml: string;
	};
}

export default function Doc(props: DocProps) {
	const { locale, translate, docData } = props;
	const { title, contentHtml } = docData;
	return (
		<Layout locale={locale} translate={translate}>
			<Head>
				<title>{title}</title>
			</Head>
			<article>
				<h1>{title}</h1>
				<div>{/* <Date dateString={docData.date} locale={locale} /> */}</div>
				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />
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
			locale,
		},
	};
};
