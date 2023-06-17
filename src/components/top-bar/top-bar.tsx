import React, { useContext } from "react";
import Header from "../header";
import LocaleSelector from "../locale-selector";
// import ThemeSelector from "../theme-selector";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { MenuProvider } from "../menu-provider";
import { ComponentProps } from "../../interfaces/models";

export default function TopBar({ className }: ComponentProps) {
	// const { locale, textDirection } = useContext(ReactLocaleContext);
	return (
		<div className="top-bar">
			<Header />
			<div className="menu">
				<MenuProvider />
				<LocaleSelector />
				{/* <ThemeSelector className={st(classes.themeSelector, classes.item)} /> */}
			</div>
		</div>
	);
}
