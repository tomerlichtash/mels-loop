import React, { useContext, useMemo } from "react";
import { translateItems, navItems } from "../../config/menu-data";
import Header from "../header";
import LocaleSelector from "../locale-selector";
import { Menu, MenuGroup } from "../menu";
import ThemeSelector from "../theme-selector";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "./top-bar.st.css";
import { ComponentProps } from "../../interfaces/models";

export interface ITopBarProps extends ComponentProps {
	isHome: boolean;
	isMobile: boolean;
}

export default function TopBar({ isHome, isMobile, className }: ITopBarProps) {
	const { locale, translate } = useContext(ReactLocaleContext);

	const menuItems = useMemo(
		() => translateItems(navItems, translate) as MenuGroup[],
		[translate]
	);

	return (
		<div className={st(classes.root, { locale }, className)}>
			<Header className={classes.header} isHome={isHome} />
			{!isMobile && (
				<div className={classes.items}>
					<Menu className={classes.nav} items={menuItems} />
					<LocaleSelector className={st(classes.localeSelector, { locale })} />
					<ThemeSelector className={classes.themeSelector} />
				</div>
			)}
		</div>
	);
}
