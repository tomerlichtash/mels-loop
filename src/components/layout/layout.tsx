import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "./use-window-size";
import { ReactLocaleContext } from "../../contexts/locale-context";
import Head from "next/head";
import TopBar from "../top-bar";
import Footer from "../footer";
import Page from "../page";
import ScrollArea from "../scrollbar";
import { MenuProvider } from "../menu-provider";
import Analytics from "./analytics";
import { ComponentProps } from "../../interfaces/models";
import { FavIconAnimator, IFavIconProps } from "../../lib/favicon-animator";

export interface ILayoutProps extends ComponentProps {
	title?: string;
}

const ICON_ANIMATOR_PROPS: IFavIconProps = {
	type: "rotate",
	durationSeconds: 2,
	height: 32,
	width: 32,
	debug: true,
	// TODO: Use light logo when dark mode is enabled
	image: "/assets/ml-logo.png",
};

const isDebug = process.env.NEXT_PUBLIC_ML_DEBUG;

export default function Layout({ children, title }: ILayoutProps) {
	const router = useRouter();
	const { siteTitle, siteSubtitle, textDirection, pageName } =
		useContext(ReactLocaleContext);
	const { locale, asPath: currentUrl } = router;
	const size = useWindowSize();
	const isMobile = size.width <= 1024;

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

	const pageTitle = [siteTitle, siteSubtitle, title || pageName]
		.map((s) => s && s.trim())
		.filter(Boolean)
		.join(" - ");

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<link
					rel="icon"
					type="image/png"
					href="/favicon-temp.png"
					media="(prefers-color-scheme: light)"
				/>
				<link
					rel="icon"
					type="image/png"
					href="/favicon-light-temp.png"
					media="(prefers-color-scheme: dark)"
				/>

				<meta name="description" content={siteSubtitle} />
				<meta itemProp="name" content={siteTitle} />
				<meta itemProp="description" content={siteSubtitle} />
				{/* <meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						title
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/> */}
				<meta name="og:title" content={`${siteTitle} - ${siteSubtitle}`} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<div
				id="outer-container"
				className="layout"
				data-text-direction={textDirection}
			>
				<ScrollArea>
					<div id="page-wrap">
						<TopBar />
						<Page nodes={children} />
						<Footer textDirection={textDirection} />
					</div>
				</ScrollArea>
				{isMobile && <MenuProvider isMobile />}
			</div>
			{!isDebug && <Analytics />}
		</>
	);
}
