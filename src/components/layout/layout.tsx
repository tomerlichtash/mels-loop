import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "./use-window-size";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ReactQueryContext } from "../../contexts/query-context";
import Head from "next/head";
import TopBar from "../top-bar";
import Footer from "../footer";
import Page from "../page";
import ScrollArea from "../scrollbar";
import Analytics from "./analytics";
import { MobileMenu } from "../mobile-menu";
import { ComponentProps } from "../../interfaces/models";
import { FavIconAnimator, IFavIconProps } from "../../lib/favicon-animator";
import { st, classes } from "./layout.st.css";

const ICON_ANIMATOR_PROPS: IFavIconProps = {
	type: "rotate",
	durationSeconds: 2,
	height: 32,
	width: 32,
	debug: true,
	image: "/assets/ml-logo.png",
};

const SCROLL_VIEW_PROPS: ScrollIntoViewOptions = {
	behavior: "smooth",
	block: "center",
};

export default function Layout({ children }: ComponentProps) {
	const router = useRouter();
	const { query } = useContext(ReactQueryContext);
	const size = useWindowSize();
	const { siteTitle, siteSubtitle, textDirection } =
		useContext(ReactLocaleContext);
	const { locale, asPath: currentUrl } = router;
	const { getLine } = query;
	const isMobile = size.width <= 970;

	useEffect(() => {
		if (getLine === -1) {
			return;
		}
		setTimeout(() => {
			const el = window.document.getElementById(`line${getLine}`);
			el?.scrollIntoView(SCROLL_VIEW_PROPS);
		}, 200);
	}, [getLine]);

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
				id="outer-container"
				className={st(classes.root, {
					textDirection,
					isMobile,
				})}
			>
				<div id="page-wrap">
					<ScrollArea>
						<TopBar isMobile={isMobile} className={classes.header} />
						<Page className={classes.page} nodes={children} />
						<Footer className={classes.footer} direction={textDirection} />
					</ScrollArea>
				</div>
				{isMobile && (
					<MobileMenu
						className={classes.mobileMenu}
						right={textDirection === "ltr"}
					/>
				)}
			</div>
			<Analytics />
		</>
	);
}
