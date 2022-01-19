import Head from "next/head";
import Nav from "../nav";
import Header from "../header";
import Footer from "../footer";
import Page from "../page";
import { useRouter } from "next/router";
import { style, classes } from "./layout.st.css";

const name = `Mel's Loop`;
export const siteTitle = `A Comprehensive Guide to The Story of Mel`;

export default function Layout({
	children,
	isHome,
}: {
	children: React.ReactNode;
	isHome?: boolean;
}) {
	const { locale } = useRouter();
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>

			<div className={style(classes.root, { locale: locale })}>
				<Header isHome={!!isHome} name={name} />
				<Nav />
				<Page nodes={children} />
				<Footer isHome={!!isHome} />
			</div>
		</>
	);
}
