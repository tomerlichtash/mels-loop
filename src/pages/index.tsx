// import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import { IPageProps } from "../interfaces/models";
import { style, classes } from "./index.st.css";

export interface HomeProps extends IPageProps {
	// locale: string;
	translate: (key: string) => string;
}

export default function Home(props: HomeProps) {
	const { translate, compLocale } = props;
	const { siteTitle, pageName } = compLocale;
	return (
		<Layout {...{ translate }}>
			<Head>
				<title>
					{translate(siteTitle)} - ${translate(pageName)}
				</title>
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
// 	return {
// 		props: {
// 			locale,
// 		},
// 	};
// };
