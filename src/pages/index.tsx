import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getSortedCodexData } from "../lib/content-drivers/codex";
import { IContentComponentData } from "../interfaces/models";
import ContentBrowser from "../components/content-browser";
import { style, classes } from "./index.st.css";

export default function Home(data: IContentComponentData) {
	const { locale } = useRouter();
	return (
		<Layout>
			<Head>
				<title>Home</title>
			</Head>
			<article className={style(classes.root)}>
				<div>the story</div>
				<div>glossary</div>
				<div>photos</div>
			</article>
		</Layout>
	);
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
// 	const data = getSortedCodexData(locale);
// 	return {
// 		props: {
// 			content: JSON.stringify(data),
// 			locale,
// 		},
// 	};
// };
