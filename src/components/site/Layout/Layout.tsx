import React, {
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
} from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "./useWindowSize";
import { LocaleProvider } from "../../../locale/context/locale-context";
import Head from "next/head";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import Page from "../Page";
import Analytics from "./analytics";
import { FavIconAnimator, IFavIconProps } from "../../../lib/favicon-animator";
import { Scrollbar } from "@components/ui";
import styles from "./Layout.module.scss";
import useDrawer from "../SiteNav/VerticalMenu/useDrawer";
import { VerticalMenu } from "../SiteNav";

type LayoutProps = {
	title?: string;
};

const ICON_ANIMATOR_PROPS: IFavIconProps = {
	type: "rotate",
	durationSeconds: 2,
	height: 32,
	width: 32,
	debug: true,
	// TODO: Use light logo when dark mode is enabled
	image: "/assets/logo/ml-logo-dark.png",
};

const isDebug = process.env.NEXT_PUBLIC_ML_DEBUG;

export default function Layout({
	title,
	children,
}: PropsWithChildren<LayoutProps>) {
	const router = useRouter();
	const size = useWindowSize();
	const { siteTitle, siteSubtitle, textDirection, pageName } =
		useContext(LocaleProvider);
	const { open, setOpen, toggle } = useDrawer();

	const { locale, asPath: currentUrl } = router;
	const isHome = router.pathname === "/";
	const isMobile = size.width <= 1024;

	const sidebarMenu = useMemo(
		() => <VerticalMenu open={open} toggle={toggle} isHome={isHome} />,
		[isHome, open, toggle]
	);

	const pageTitle = useMemo(
		() =>
			[siteTitle, siteSubtitle, title || pageName]
				.map((s) => s && s.trim())
				.filter(Boolean)
				.join(" - "),
		[siteTitle, siteSubtitle, title, pageName]
	);

	// close mobile menu on viewport change
	useEffect(() => setOpen(false), [isMobile, setOpen]);

	useEffect(() => {
		new FavIconAnimator(ICON_ANIMATOR_PROPS).run().catch(() => void 0);
	}, [currentUrl, locale]);

	useEffect(() => {
		const handleRouteChange = () => {
			new FavIconAnimator(ICON_ANIMATOR_PROPS).run().catch(() => void 0);
		};
		router.events.on("routeChangeStart", handleRouteChange);
		return () => router.events.off("routeChangeStart", handleRouteChange);
	}, [router.events]);

	if (size.width === undefined) {
		return null;
	}

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<link
					rel="icon"
					type="image/png"
					href="/favicon-dark.png"
					media="(prefers-color-scheme: light)"
				/>
				<link
					rel="icon"
					type="image/png"
					href="/favicon-light.png"
					media="(prefers-color-scheme: dark)"
				/>
				<meta itemProp="name" content={siteTitle} />
				<meta itemProp="description" content={siteSubtitle} />
				<meta name="description" content={siteSubtitle} />
				{/* <meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						title
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/> */}
				<meta name="og:title" content={`${siteTitle} - ${siteSubtitle}`} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<Scrollbar className={styles.root} textDirection={textDirection}>
				<div data-text-direction={textDirection}>
					<SiteHeader
						isHome={isHome}
						isMobile={isMobile}
						toggleSidebar={toggle}
					/>
					<Page nodes={children} />
					<SiteFooter />
					{sidebarMenu}
				</div>
			</Scrollbar>
			{!isDebug && <Analytics />}
		</>
	);
}

// export default Layout;
