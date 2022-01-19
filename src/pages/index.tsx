import Head from "next/head";
import Layout from "../components/layout";
import { style, classes } from "./index.st.css";

export default function Home() {
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
