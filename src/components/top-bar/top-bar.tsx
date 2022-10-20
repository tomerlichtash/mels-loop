import React, { useContext } from "react";
import Header from "../header";
import LocaleSelector from "../locale-selector";
// import ThemeSelector from "../theme-selector";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { MenuProvider } from "../menu-provider/menu-provider";
import { ComponentProps } from "../../interfaces/models";
import { st, classes } from "./top-bar.st.css";

export default function TopBar({ className }: ComponentProps) {
	const { locale, textDirection } = useContext(ReactLocaleContext);
	return (
		<div className={st(classes.root, { textDirection }, className)}>
			<Header className={classes.header} />
			<div className={classes.items}>
				<MenuProvider className={classes.nav} />
				<LocaleSelector
					className={st(classes.localeSelector, { locale }, classes.item)}
				/>
				{/* <ThemeSelector className={st(classes.themeSelector, classes.item)} /> */}
			</div>
		</div>
	);
}
