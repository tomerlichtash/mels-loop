import React, { useContext, useMemo } from "react";
import { translateItems, navItems } from "../../config/menu-data";
import Header from "../header";
import LocaleSelector from "../locale-selector";
import { NavMenu } from "../nav/menu";
import { MenuGroup } from "../nav/types";
import ThemeSelector from "../theme-selector";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "./top-bar.st.css";

export default function TopBar({ isHome, isMobile }) {
	const { locale, translate } = useContext(ReactLocaleContext);

	const menuItems = useMemo(
		() => translateItems(navItems, translate) as MenuGroup[],
		[translate]
	);

	return (
		<div className={st(classes.root, { locale })}>
			<Header className={classes.header} isHome={isHome} />
			{!isMobile && (
				<div className={classes.items}>
					<NavMenu className={classes.nav} items={menuItems} />
					<LocaleSelector className={st(classes.localeSelector, { locale })} />
					<ThemeSelector className={classes.themeSelector} />
				</div>
			)}
		</div>
	);
}
