import Script from "next/script";
import React, { useContext } from "react";
import Head from "next/head";
import Header from "../header";
import Footer from "../footer";
import Nav from "../nav";
import Page from "../page";
import LocaleSelector from "../locale-selector";
import { useRouter } from "next/router";
import {
	HEADER_LOCALE,
	FOOTER_LOCALE,
	LOCALE_SELECTOR_LOCALE,
} from "../../locales/components";
import { ComponentProps } from "../../interfaces/models";
import { localeLabelPrefix } from "../../locales/locales";
import { IOption } from "../dropdown/option";
import { LOCALE_FLAGS } from "../svg";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { st, classes } from "./layout.st.css";

export interface LayoutProps extends ComponentProps {
	children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
	const { translate, getSiteTitle, getSiteSubtitle } =
		useContext(ReactLayoutContext);

	const router = useRouter();
	const { locale, locales } = router;

	function onLocaleChange(locale: string) {
		return router.push(router.asPath, router.asPath, {
			locale,
			scroll: false,
		});
	}

	const localeSelectorOptions: IOption[] = locales.map((lang) => {
		return {
			id: lang,
			label: `${localeLabelPrefix}_${lang.toUpperCase()}`,
			isCurrent: locale === lang,
			icon: LOCALE_FLAGS[lang],
			onSelectChange: onLocaleChange,
		};
	});

	const title = translate(getSiteTitle());
	const subtitle = translate(getSiteSubtitle());

	return (
		<>
			<Head>
				<link rel="icon" type="image/png" href="/favicon-temp.png" />
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
			<div className={st(classes.root, { locale })}>
				<div className={classes.siteHeader}>
					<Header className={classes.header} compKeys={HEADER_LOCALE} />
					<div className={classes.primaryNav}>
						<Nav className={classes.nav} />
						<LocaleSelector
							className={classes.localeSelector}
							options={localeSelectorOptions}
							compKeys={LOCALE_SELECTOR_LOCALE}
						/>
					</div>
				</div>
				<Page className={classes.page} nodes={props.children} />
				<Footer className={classes.footer} compKeys={FOOTER_LOCALE} />
			</div>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-XLWMW4QLVE"
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

					gtag('config', 'G-XLWMW4QLVE');
        `}
			</Script>
		</>
	);
}
