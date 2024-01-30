import React, {
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
} from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useWindowSize } from "./useWindowSize";
import { LocaleProvider } from "../../../locale/context/locale-context";
import { Drawer, useDrawer } from "../../ui/VerticalMenu/useDrawer";

import { HeadSection } from "./Head";
import { FavIconAnimator, IFavIconProps } from "../../../lib/favicon-animator";

import Page from "../../ui/Page";
import SiteFooter from "../SiteFooter";
import LocaleSelector from "../../ui/LocaleSelector";
import ThemeSelector from "../../ui/ThemeSelector";
import Analytics from "./analytics";

import HorizontalNav from "../../ui/HorizontalMenu/HorizontalNav";
import VerticalNav from "../../ui/VerticalMenu/VerticalNav";
import VerticalMenuTrigger from "../../ui/VerticalMenu/VerticalMenuTrigger";

import SiteTitle from "../../ui/SiteTitle";
import Strip from "../../ui/Strip";
import Logo from "../../ui/Logo";

import { Button, Scrollbar, Container } from "@components/ui";

import { MenuSections } from "@config/siteNav/sections";
import { MenuItems } from "@config/siteNav/items";
import { getMenuItems } from "../../helpers";

import { Cross2Icon } from "@radix-ui/react-icons";

import styles from "./Layout.module.scss";

import type { LocaleId } from "locale/locale-context";

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

const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
	const router = useRouter();
	const size = useWindowSize();
	const { theme, setTheme } = useTheme();
	const { open, setOpen, toggle } = useDrawer();
	const isHome = router.pathname === "/";
	const isMobile = size.width <= 1024;

	const {
		siteTitle,
		siteSubtitle,
		textDirection,
		pageName,
		locale,
		locales,
		translate,
		getLocaleLabel,
		getLocaleSymbol,
		onLocaleChange,
	} = useContext(LocaleProvider);

	const getThemeName = (theme: string) => {
		return theme === "dark" ? "light" : "dark";
	};

	const themeLabel = useMemo(() => {
		return `${translate("site.components.themeSelector.switchTo")} ${translate(
			`site.components.themeSelector.theme.${getThemeName(theme)}`
		)}`;
	}, [theme, translate]);

	const menuItems = useMemo(
		() => getMenuItems(MenuSections, MenuItems, translate),
		[translate]
	);

	const localeOptions = useMemo(
		() =>
			locales.map((id) => ({
				id,
				label: getLocaleSymbol(id),
				title: translate(`${getLocaleLabel(id)}_LABEL`),
			})),
		[getLocaleLabel, getLocaleSymbol, locales, translate]
	);

	// close mobile menu on viewport change
	useEffect(() => setOpen(false), [isMobile, setOpen]);

	useEffect(() => {
		new FavIconAnimator(ICON_ANIMATOR_PROPS).run().catch(() => void 0);
	}, [router.asPath, locale]);

	useEffect(() => {
		const handleRouteChange = () => {
			new FavIconAnimator(ICON_ANIMATOR_PROPS).run().catch(() => void 0);
		};
		router.events.on("routeChangeStart", handleRouteChange);
		return () => router.events.off("routeChangeStart", handleRouteChange);
	}, [router.events]);

	// if (size.width === undefined) {
	// 	return null;
	// }

	const mobileMenu = useMemo(
		() => (
			<Drawer
				direction={"right"}
				open={open}
				size={350}
				duration={300}
				overlayOpacity={0.5}
				onClose={toggle}
				className={styles.root}
			>
				<Scrollbar className={styles.root} textDirection={textDirection}>
					<Button onClick={toggle} asChild>
						<Cross2Icon />
					</Button>
					<Logo />
					<SiteTitle
						title={siteTitle}
						subtitle={siteSubtitle}
						linked={!isHome}
					/>
					<Strip />
					<LocaleSelector
						type="single"
						value={locale}
						options={localeOptions}
						onSelect={(id: LocaleId) => void onLocaleChange(id)}
					/>
					<ThemeSelector
						label={themeLabel}
						theme={theme}
						setTheme={setTheme}
					></ThemeSelector>
					<VerticalNav
						items={menuItems}
						onClose={toggle}
						// className={styles.menu}
					/>
				</Scrollbar>
			</Drawer>
		),
		[
			isHome,
			locale,
			textDirection,
			localeOptions,
			menuItems,
			open,
			theme,
			themeLabel,
			siteSubtitle,
			siteTitle,
			onLocaleChange,
			setTheme,
			toggle,
		]
	);

	return (
		<>
			<HeadSection
				siteTitle={siteTitle}
				siteSubtitle={siteSubtitle}
				title={title}
				pageName={pageName}
			/>
			<Scrollbar
				textDirection={textDirection}
				height="100vh"
				className={styles.root}
				data-locale={locale}
			>
				<Container
					sticky
					fullWidth
					spaceBetween
					alignItemsCenter
					horizontalGutter
					position="top"
					asChild
				>
					<Container>
						<Container alignItemsCenter className={styles.siteTitle}>
							<Logo />
							<SiteTitle
								title={siteTitle}
								subtitle={siteSubtitle}
								linked={!isHome}
							/>
						</Container>
						{isMobile ? (
							<VerticalMenuTrigger onClick={toggle} />
						) : (
							<Container alignItemsCenter>
								<HorizontalNav items={menuItems} />
								<>
									<LocaleSelector
										type="single"
										value={locale}
										options={localeOptions}
										onSelect={(id: LocaleId) => void onLocaleChange(id)}
									/>
									<ThemeSelector
										label={themeLabel}
										theme={theme}
										setTheme={setTheme}
									></ThemeSelector>
								</>
							</Container>
						)}
					</Container>
				</Container>
				<Page>{children}</Page>
				<SiteFooter title={siteTitle} subtitle={siteSubtitle} />
				{isMobile && mobileMenu}
			</Scrollbar>
			{!isDebug && <Analytics />}
		</>
	);
};

export default Layout;
