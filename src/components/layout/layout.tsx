import Head from "next/head";
import Header from "../header";
import Footer from "../footer";
import Page from "../page";
import LocaleSelector from "../locale-selector";
import { SITE_PAGES } from "../../config/pages";
import { useRouter } from "next/router";
import {
	SITE_META,
	HEADER_LOCALE,
	FOOTER_LOCALE,
	LOCALE_SELECTOR_LOCALE,
} from "../../locales/components";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./layout.st.css";

export interface LayoutProps extends ComponentProps {
	children: React.ReactNode;
	locale: string;
	translate: (key: string) => string;
}

export default function Layout(props: LayoutProps) {
	const { translate } = props;

	const router = useRouter();
	const { locale, pathname } = router;

	const onSelectChange = (locale: string) =>
		router.push(router.asPath, router.asPath, {
			locale,
			scroll: false,
		});

	const { siteTitle, siteSubtitle } = SITE_META;
	const isHome = pathname === "/";
	const title = translate(siteTitle);
	const subtitle = translate(siteSubtitle);

	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content={subtitle} />
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						title
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={title} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<div className={style(classes.root, { locale })}>
				<Header
					locale={locale}
					pathname={pathname}
					isHome={isHome}
					sitePages={SITE_PAGES}
					translate={translate}
					compKeys={HEADER_LOCALE}
				/>
				<LocaleSelector
					className={classes.localeSelector}
					locale={locale}
					onSelectChange={onSelectChange}
					translate={translate}
					compKeys={LOCALE_SELECTOR_LOCALE}
				/>
				<Page nodes={props.children} />
				<Footer translate={translate} compKeys={FOOTER_LOCALE} />
			</div>
		</>
	);
}
