import Head from "next/head";
import Layout from "../components/layout/layout";
import { useRouter } from "next/router";
import { aboutLocale } from "../locales/about";

export type ILocale = "en-US" | "he";

export interface IContext {
	locales: ILocale[];
	locale: ILocale;
	defaultLocale: ILocale;
}

export default function Home() {
	const { locale } = useRouter();

	return (
		<Layout>
			<Head>{/* <title>{siteTitle}</title> */}</Head>
			<section>
				<h1>About</h1>
				<h2>{aboutLocale[locale].title}</h2>
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
