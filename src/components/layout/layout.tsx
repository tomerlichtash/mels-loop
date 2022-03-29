import React, { useState, useContext, useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import Header from "../header";
import Footer from "../footer";
import { MobileNav } from "../nav/nav-mobile";
import Page from "../page";
import LocaleSelector from "../locale-selector";
import { useRouter } from "next/router";
import { HEADER_LOCALE, FOOTER_LOCALE } from "../../locales/components";
import { ComponentProps } from "../../interfaces/models";
import { localeLabelPrefix } from "../../locales/locales";
import { IOption } from "../dropdown/option";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { NavMenu } from "../nav/menu";
import { navItems } from "../../config/menu-data";
import { MenuGroup } from "../nav/types";
import ScrollArea from "../scrollbar";
import { st, classes } from "./layout.st.css";

interface Size {
	width: number | undefined;
	height: number | undefined;
}

export interface LayoutProps extends ComponentProps {
	children: React.ReactNode;
}

function useWindowSize(): Size {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState<Size>({
		width: undefined,
		height: undefined,
	});
	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		// Add event listener
		window.addEventListener("resize", handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
}

export default function Layout(props: LayoutProps) {
	// const [_dimensions, setDimensions] = useState(getWindowDimensions());

	const { translate, getSiteTitle, getSiteSubtitle } =
		useContext(ReactLayoutContext);

	const router = useRouter();
	const { locale, locales } = router;

	function onLocaleChange(locale: string): Promise<boolean> {
		return router.push(router.asPath, router.asPath, {
			locale,
			scroll: false,
		});
	}

	const localeSelectorOptions: IOption[] = locales.map((lang) => {
		return {
			id: lang,
			label: translate(`${localeLabelPrefix}_${lang.toUpperCase()}`),
		};
	});

	const title = translate(getSiteTitle());
	const subtitle = translate(getSiteSubtitle());

	const size: Size = useWindowSize();
	const isMobile = size.width <= 970;

	const translateItems = (items: MenuGroup[]) => {
		return items.map((group) =>
			Object.assign({}, group, {
				title: translate(group.title),
				content: group.content.map((item) =>
					Object.assign({}, item, {
						title: translate(item.title),
						description: translate(item.description),
						author: translate(item.author),
					})
				),
			})
		);
	};

	// useEffect(() => {
	// 	const path = window.location.hash;
	// 	if (path && path.includes("#")) {
	// 		// window.next.router.scrollToHash(path.split("#")[1]);
	// 		// window.top.router.scrollToHash("#line50");
	// 		// setTimeout(() => {
	// 		// 	debugger;
	// 		// 	const id = path.replace("#", "");
	// 		// 	const el = window.document.getElementById(id);
	// 		// 	const r = el.getBoundingClientRect();
	// 		// 	window.top.scroll({
	// 		// 		top: scrollY + r.top,
	// 		// 		behavior: "smooth",
	// 		// 	});
	// 		// }, 600);
	// 	}
	// });

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
			<div
				className={st(classes.root, {
					locale,
					isMobile,
					theme: "light",
				})}
				id="outer-container"
			>
				<div id="page-wrap">
					<div className={classes.topBar}>
						<div className={classes.siteHeader}>
							<Header className={classes.header} compKeys={HEADER_LOCALE} />
							{!isMobile && (
								<div className={classes.primaryNav}>
									{/* <Nav className={classes.nav} /> */}
									<NavMenu
										className={classes.nav}
										items={translateItems(navItems)}
									/>

									<LocaleSelector
										options={localeSelectorOptions}
										onLocaleChange={onLocaleChange}
										className={st(classes.localeSelector, { locale })}
									/>
								</div>
							)}
						</div>
					</div>
					<div className={classes.scrollablePage}>
						<ScrollArea>
							<div className={classes.scrollable}>
								<Page className={classes.page} nodes={props.children} />
								<Footer className={classes.footer} compKeys={FOOTER_LOCALE} />
							</div>
						</ScrollArea>
					</div>
				</div>

				{isMobile && (
					<MobileNav
						className={classes.mobileNav}
						right={locale === "en"}
						onLocaleChange={onLocaleChange}
						localeOptions={localeSelectorOptions}
					/>
				)}
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
