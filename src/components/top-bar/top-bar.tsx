import React, { useContext } from "react";
import Header from "../header";
import LocaleSelector from "../locale-selector";
import ThemeSelector from "../theme-selector";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { MenuProvider } from "../menu-provider/menu-provider";
import { ComponentProps } from "../../interfaces/models";
import { st, classes } from "./top-bar.st.css";

export interface ITopBarProps extends ComponentProps {
	isMobile: boolean;
}

export default function TopBar({ isMobile, className }: ITopBarProps) {
	const { locale, textDirection } = useContext(ReactLocaleContext);
	return (
		<div className={st(classes.root, { textDirection }, className)}>
			<Header className={classes.header} />
			{!isMobile && (
				<div className={classes.items}>
					<MenuProvider />
					<LocaleSelector
						className={st(classes.localeSelector, { locale }, classes.item)}
					/>
					<ThemeSelector className={st(classes.themeSelector, classes.item)} />
				</div>
			)}
		</div>
	);
}
