import React, { Context, createContext } from "react";
import Cookies from "js-cookie";
import { Themes, themes } from "../config/themes";
import { PUBLIC_ML_CONFIG_VAR } from "../consts";

const initTheme =
	typeof window !== "undefined" && window[PUBLIC_ML_CONFIG_VAR]["themeName"];

export interface IThemeContextProps {
	theme: Themes;
}

export interface IThemeContext {
	theme: Themes;
	isDarkTheme: boolean;
	setTheme: (theme: Themes) => void;
	toggleTheme: () => void;
}

export interface ThemeContextProps {
	children: React.ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProps) {
	const themeContext: IThemeContext = new ThemeContext({
		theme: initTheme,
	});
	return (
		<ReactThemeContext.Provider value={themeContext}>
			{children}
		</ReactThemeContext.Provider>
	);
}

const updateClassName = (theme: string) => {
	const ref = window.document.querySelectorAll(
		"[data-theme]"
	)[0] as HTMLElement;
	ref.classList.remove(ref.classList[0]);
	ref.classList.add(themes[theme][0]);
};

export class ThemeContext implements IThemeContext {
	private _theme: Themes;
	constructor({ theme }: IThemeContextProps) {
		this._theme = theme;
	}

	public setTheme = (theme: Themes) => {
		this._theme = theme;
		updateClassName(theme);
		Cookies.set("theme", theme);
	};

	public get theme(): Themes {
		return this._theme;
	}

	public get isDarkTheme() {
		return this.theme === "dark";
	}

	public toggleTheme = () => {
		this.setTheme(this.isDarkTheme ? "light" : "dark");
	};
}

const ctx = createContext<IThemeContext>(new ThemeContext({ theme: null }));

export const ReactThemeContext: Context<IThemeContext> = ctx;
