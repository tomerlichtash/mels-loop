import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/content-drivers/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
// import { useRouter } from 'next/router';
// import Date from '../../components/date';

export default function Post({
	postData,
}: {
	postData: {
		title: string;
		// date: string;
		contentHtml: string;
	};
}) {
	// const { locale } = useRouter();
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article className={"article"}>
				{/* <h1 className={utilStyles.headingXl}>{postData.title}</h1> */}
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const paths = getAllPostIds(locales);
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	const postData = await getPostData(params.id as string, locale);
	return {
		props: {
			postData,
		},
	};
};
