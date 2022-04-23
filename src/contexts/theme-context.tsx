import { Context, createContext } from "react";
import Cookies from "js-cookie";
export type Themes = "light" | "dark" | null;

import { classes as LightTheme } from "../theme/light-theme.st.css";
import { classes as DarkTheme } from "../theme/dark-theme.st.css";

const themes = {
	light: [LightTheme.root],
	dark: [DarkTheme.root],
};

export interface IThemeContextProps {
	// theme: Themes;
	// themeFromCookie: Themes;
	setTheme: (theme: Themes) => void;
}

export interface IThemeContext {
	theme: Themes;
	setTheme: (theme: Themes) => void;
	toggleTheme: () => void;
	isDarkTheme: boolean;
}

export class ThemeContext implements IThemeContext {
	private _theme: Themes;
	private _themeFromCookie: Themes;
	private _setState: (theme: Themes) => void;
	constructor(props: IThemeContextProps) {
		const { setTheme } = props;
		// const { theme, themeFromCookie, setTheme } = props;
		// this._theme = theme;
		this._setState = setTheme;
		// this._themeFromCookie = themeFromCookie;
	}

	public setTheme = (theme: Themes) => {
		this._setState(theme);
		Cookies.set("theme", theme);

		// if (!theme) {
		// 	console.log("no theme, set light");
		// 	this._setState("light");
		// }
		// if (theme !== this.theme) {
		// 	// console.log("set theme", theme);
		// 	// Cookies.set("theme", theme);
		// 	this._setState(theme);
		// 	// return;
		// }
		// console.log("other");
		// // if (theme === "dark") {
		// // 	// Cookies.set("theme", theme);
		// // }
	};

	public get theme(): Themes {
		return this._theme;
	}

	public get storedTheme(): Themes {
		return this._themeFromCookie;
	}

	public get isDarkTheme() {
		return this.theme === "dark";
	}

	public toggleTheme = () => {
		this.setTheme(this.isDarkTheme ? "light" : "dark");
	};

	public getThemeFromCookie = () => {
		const storedTheme = Cookies.get("theme") as Themes;
		console.log("got theme from cookie", storedTheme);
		this._themeFromCookie = storedTheme;
	};
}

const ctx = createContext<IThemeContext>(
	new ThemeContext({
		// theme: null,
		// themeFromCookie: null,
		setTheme: () => null,
	})
);

export const ReactThemeContext: Context<IThemeContext> = ctx;
