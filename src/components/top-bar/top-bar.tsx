import React, { useContext, useMemo } from "react";
import { translateItems, navItems } from "../../config/menu-data";
import Header from "../header";
import LocaleSelector from "../locale-selector";
import { Menu, MenuGroup } from "../menu";
import ThemeSelector from "../theme-selector";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import { MobileMenu } from "../mobile-menu";
import { st, classes } from "./top-bar.st.css";

export interface ITopBarProps extends ComponentProps {
	isMobile: boolean;
}

export default function TopBar({ isMobile, className }: ITopBarProps) {
	const { locale, textDirection, translate } = useContext(ReactLocaleContext);

	const menuItems = useMemo(
		() => translateItems(navItems, translate) as MenuGroup[],
		[translate]
	);

	return (
		<div className={st(classes.root, { textDirection }, className)}>
			<Header className={classes.header} />
			{!isMobile && (
				<div className={classes.items}>
					<Menu className={st(classes.nav, classes.item)} items={menuItems} />
					<LocaleSelector
						className={st(classes.localeSelector, { locale }, classes.item)}
					/>
					<ThemeSelector className={st(classes.themeSelector, classes.item)} />
				</div>
			)}
		</div>
	);
}
