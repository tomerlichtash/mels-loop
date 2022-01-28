import React from "react";
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
import { localeLabelPrefix } from "../../locales/locales";
import { IOption } from "../dropdown/option";
import { style, classes } from "./layout.st.css";

export interface LayoutProps extends ComponentProps {
	children: React.ReactNode;
	translate: (key: string) => string;
}

export default function Layout(props: LayoutProps) {
	const { translate } = props;

	const router = useRouter();
	const { locale, locales, pathname } = router;

	const onSelectChange = (locale: string) =>
		router.push(router.asPath, router.asPath, {
			locale,
			scroll: false,
		});

	const { siteTitle, siteSubtitle } = SITE_META;
	const isHome = pathname === "/";
	const title = translate(siteTitle);
	const subtitle = translate(siteSubtitle);

	const localeSelectorOptions: IOption[] = locales.map((lang) => {
		return {
			id: lang,
			label: `${localeLabelPrefix}_${lang.toUpperCase()}`,
			isCurrent: locale === lang,
			callback: onSelectChange,
		};
	});

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
					className={classes.header}
					pathname={pathname}
					isHome={isHome}
					sitePages={SITE_PAGES}
					compKeys={HEADER_LOCALE}
					translate={translate}
				/>
				<LocaleSelector
					className={classes.localeSelector}
					currentLocaleLabel={`LOCALE_LABEL_${locale.toUpperCase()}`}
					options={localeSelectorOptions}
					compKeys={LOCALE_SELECTOR_LOCALE}
					translate={translate}
				/>
				<Page className={classes.page} nodes={props.children} />
				<Footer
					className={classes.footer}
					compKeys={FOOTER_LOCALE}
					translate={translate}
				/>
			</div>
		</>
	);
}
