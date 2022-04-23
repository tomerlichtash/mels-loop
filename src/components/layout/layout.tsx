import React, { useContext, useEffect, useMemo } from "react";
import Script from "next/script";
import Head from "next/head";
import Header from "../header";
import Footer from "../footer";
import { MobileNav } from "../nav/nav-mobile";
import Page from "../page";
import LocaleSelector from "../locale-selector";
import ThemeSelector from "../theme-selector";
import { useRouter } from "next/router";
import { useWindowSize, ISize } from "./use-window-size";
import { ComponentProps } from "../../interfaces/models";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ReactThemeContext } from "../../contexts/theme-context";
import { ReactQueryContext } from "../../contexts/query-context";
import { NavMenu } from "../nav/menu";
import { navItems, translateItems } from "../../config/menu-data";
import ScrollArea from "../scrollbar";
import { FavIconAnimator, IFavIconProps } from "../../lib/favicon-animator";
import { st, classes } from "./layout.st.css";
import { MenuGroup } from "../nav/types";

const ICON_ANIMATOR_PROPS: IFavIconProps = {
	type: "rotate",
	durationSeconds: 2,
	height: 32,
	width: 32,
	debug: true,
	image: "/assets/ml-logo.png",
};

export default function Layout({ children }: ComponentProps) {
	// const [_dimensions, setDimensions] = useState(getWindowDimensions());

	const { setTheme } = useContext(ReactThemeContext);
	const { translate, siteTitle, siteSubtitle } = useContext(ReactLocaleContext);

	const router = useRouter();
	const { locale, asPath: currentUrl } = router;

	function onLocaleChange(locale: string): Promise<boolean> {
		return router.push(currentUrl, currentUrl, {
			locale,
			scroll: true,
		});
	}

	const size: ISize = useWindowSize();
	const isMobile = size.width <= 970;

	const { query } = useContext(ReactQueryContext);
	const { getLine } = query;

	const menuItems = useMemo(
		() => translateItems(navItems, translate) as MenuGroup[],
		[translate]
	);

	useEffect(() => {
		if (getLine > -1) {
			const scrollProps: ScrollIntoViewOptions = {
				behavior: "smooth",
				block: "center",
			};
			setTimeout(() => {
				const el = window.document.getElementById(`line${getLine}`);
				el.scrollIntoView(scrollProps);
			}, 200);
		}
	});

	useEffect(() => {
		new FavIconAnimator(ICON_ANIMATOR_PROPS).run().catch(() => void 0);
	}, [currentUrl, locale]);

	useEffect(() => {
		const handleRouteChange = () => {
			new FavIconAnimator(ICON_ANIMATOR_PROPS).run().catch(() => void 0);
		};

		router.events.on("routeChangeStart", handleRouteChange);
		// unsubscribe on unmount
		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			<Head>
				<link rel="icon" type="image/png" href="/favicon-temp.png" />
				<meta name="description" content={siteSubtitle} />
				{/* <meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						title
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/> */}
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<div
				className={st(classes.root, {
					locale,
					isMobile,
				})}
				id="outer-container"
			>
				<div id="page-wrap">
					<div className={classes.topBar}>
						<div className={classes.siteHeader}>
							<Header
								className={classes.header}
								isHome={router.asPath === "/"}
							/>
							{!isMobile && (
								<div className={classes.primaryNav}>
									<NavMenu className={classes.nav} items={menuItems} />
									<LocaleSelector
										onLocaleChange={onLocaleChange}
										className={st(classes.localeSelector, { locale })}
									/>
									<button onClick={() => setTheme("dark")}>dark</button>
									<button onClick={() => setTheme("light")}>light</button>
									<ThemeSelector />
								</div>
							)}
						</div>
					</div>
					<div className={classes.scrollablePage}>
						<ScrollArea>
							<div className={classes.scrollable}>
								<Page className={classes.page} nodes={children} />
								<Footer className={classes.footer} />
							</div>
						</ScrollArea>
					</div>
				</div>
				{isMobile && (
					<MobileNav
						className={classes.mobileNav}
						right={locale === "en"}
						onLocaleChange={onLocaleChange}
					/>
				)}
			</div>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-XLWMW4QLVE"
				strategy="lazyOnload"
			/>
			<Script id="google-analytics" strategy="lazyOnload">
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
