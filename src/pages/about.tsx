import Head from "next/head";
import Layout from "../components/layout/layout";
import { classes } from "./about.st.css";

export default function About() {
	return (
		<Layout>
			<Head>
				<title>About</title>
			</Head>
			<section className={classes.root}>
				<h1>About</h1>
				{/* <h2>{aboutLocale[locale].title}</h2> */}
				About this site
			</section>
		</Layout>
	);
}
