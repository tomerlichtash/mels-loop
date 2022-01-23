import Head from "next/head";
import Header from "../header";
import Footer from "../footer";
import Page from "../page";
import { t } from "../../locales/translate";
import { SITE_PAGES } from "../../config/pages";
import { useRouter } from "next/router";
import { ILocaleRef } from "../../locales/types";
import { style, classes } from "./layout.st.css";

export interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
	const { locale, pathname } = useRouter();
	const isHome = pathname === "/";
	const siteTitle = t("SITE_NAME", locale);
	const siteSubtitle = t("SITE_SUBTITLE", locale);
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content={siteSubtitle} />
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
				<Header
					locale={locale as ILocaleRef}
					pathname={pathname}
					siteTitle={siteTitle}
					siteSubtitle={siteSubtitle}
					isHome={isHome}
					sitePages={SITE_PAGES}
				/>
				<Page nodes={props.children} />
				<Footer locale={locale as ILocaleRef} />
			</div>
		</>
	);
}
