import Head from "next/head";
import Layout from "../components/layout";
import { IPageProps } from "../interfaces/models";
import { style, classes } from "./index.st.css";

export default function Home(props: IPageProps) {
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
