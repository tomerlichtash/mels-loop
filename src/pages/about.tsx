import Head from "next/head";
import Layout from "../components/layout/layout";
import { classes } from "./about.st.css";
// import { useRouter } from "next/router";
// import { aboutLocale } from "../locales/about";

export default function About() {
	// const { locale } = useRouter();
	return (
		<Layout>
			<Head>{/* <title>{siteTitle}</title> */}</Head>
			<section className={classes.root}>
				<h1>About</h1>
				{/* <h2>{aboutLocale[locale].title}</h2> */}
				About this site
			</section>
		</Layout>
	);
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   const allPostsData = getSortedPostsData(locale);
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// };

// export const getStaticProps = async (context: IContext) => {
//   return {
//     props: { context },
//   };
// };
