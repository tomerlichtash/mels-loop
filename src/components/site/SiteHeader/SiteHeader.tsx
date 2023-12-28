import React, { useContext, useEffect, useMemo, useState } from "react";
import SiteTitle from "../SiteTitle";
import SiteNav from "../SiteNav";
import LocaleSelector from "../LocaleSelector";
import ThemeSelector from "../ThemeSelector";
import { LocaleProvider } from "../../../locale/context/locale-context";
import Drawer from "react-modern-drawer";
import { Button } from "@components/ui";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { TextDirection } from "locale/locale-context";
import { useTheme } from "next-themes";
import styles from "./SiteHeader.module.scss";

type SiteHeaderProps = {
	isHome?: boolean;
	isMobile?: boolean;
};

const SiteHeader = ({ isHome, isMobile }: SiteHeaderProps) => {
	const { theme } = useTheme();
	const [open, setOpen] = useState(false);
	const {
		siteTitle,
		siteSubtitle,
		textDirection,
		locale,
		locales,
		translate,
		getLocaleLabel,
		getLocaleSymbol,
		onLocaleChange,
	} = useContext(LocaleProvider);

	useEffect(() => setOpen(false), [isMobile]);

	useEffect(() => {
		const handleKeydown = ({ key }) => {
			if (open && key === "Escape") {
				setOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeydown);
		return () => window.document.removeEventListener("keydown", handleKeydown);
	}, [open]);

	const themeSelectorComponent = useMemo(
		() => (
			<ThemeSelector
				className={classNames(styles.item, styles.themeSelector)}
				label={`${translate(
					"site.components.themeSelector.switchTo"
				)} ${translate(
					`site.components.themeSelector.theme.${
						theme === "dark" ? "light" : "dark"
					}`
				)}`}
				icon="sun"
			/>
		),
		[translate, theme]
	);

	const localeOptions = locales.map((id) => ({
		id,
		symbol: getLocaleSymbol(id),
		title: translate(`${getLocaleLabel(id)}_LABEL`),
		textDirection: "ltr" as TextDirection,
	}));

	const localeSelectorComponent = useMemo(
		() => (
			<LocaleSelector
				className={classNames(styles.item, styles.localeSelector)}
				value={locale}
				options={localeOptions}
				size="small"
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onChange={(val) => onLocaleChange(val)}
			/>
		),
		[locale, localeOptions, onLocaleChange]
	);

	const horizontalMenu = useMemo(
		() => (
			<div className={classNames(styles.section, styles.horizontalMenu)}>
				<SiteNav
					variant="horizontal"
					className={classNames(styles.item, styles.menu)}
				/>
				<div className={styles.item}>{localeSelectorComponent}</div>
				<div className={styles.item}>{themeSelectorComponent}</div>
			</div>
		),
		[localeSelectorComponent, themeSelectorComponent]
	);

	const verticalMenu = useMemo(
		() => (
			<Drawer
				direction={textDirection === "ltr" ? "right" : "left"}
				open={open}
				size={250}
				overlayOpacity={0.5}
			>
				<aside dir="ltr">
					<Button
						onClick={() => setOpen(false)}
						className={styles.mobileMenuTrigger}
					>
						<Cross2Icon />
					</Button>
					<SiteTitle
						title={siteTitle}
						subtitle={siteSubtitle}
						textDirection={textDirection}
						isHome={isHome}
						className={styles.siteTitle}
					/>
					{localeSelectorComponent}
					{themeSelectorComponent}
					<SiteNav
						className={classNames(styles.item, styles.menu)}
						variant="vertical"
					/>
				</aside>
			</Drawer>
		),
		[
			open,
			siteSubtitle,
			siteTitle,
			textDirection,
			localeSelectorComponent,
			themeSelectorComponent,
			isHome,
		]
	);

	const nav = useMemo(
		() => (
			<>
				{isMobile ? (
					<>
						<Button
							onClick={() => setOpen(true)}
							className={styles.mobileMenuTrigger}
						>
							<HamburgerMenuIcon />
						</Button>
						{verticalMenu}
					</>
				) : (
					horizontalMenu
				)}
			</>
		),
		[isMobile, horizontalMenu, verticalMenu]
	);

	return (
		<header className={styles.root} data-text-direction={textDirection}>
			<div className={styles.content}>
				<SiteTitle
					title={siteTitle}
					subtitle={siteSubtitle}
					textDirection={textDirection}
					isHome={isHome}
					className={styles.siteTitle}
				/>
				{nav}
			</div>
		</header>
	);
};

export default SiteHeader;
