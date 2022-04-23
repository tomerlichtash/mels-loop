import React, { Context, createContext, useRef } from "react";
import Cookies from "js-cookie";
import { useTheme } from "../hooks/useTheme";
import { classes as LightTheme } from "../theme/light-theme.st.css";
import { classes as DarkTheme } from "../theme/dark-theme.st.css";

export type Themes = "light" | "dark" | null;

export interface IThemeContextProps {
	theme: Themes;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ref: React.MutableRefObject<any>;
	setTheme: (theme: Themes) => void;
}

export interface IThemeContext {
	theme: Themes;
	setTheme: (theme: Themes) => void;
	themeRef: string;
	toggleTheme: () => void;
	isDarkTheme: boolean;
}

export interface ThemeCtxProps {
	children: React.ReactChild;
}

const themes = {
	light: [LightTheme.root],
	dark: [DarkTheme.root],
};

export function ThemeContextProvider({ children }: ThemeCtxProps) {
	const ref = useRef<HTMLDivElement>(null);
	const styleRef = useRef<HTMLStyleElement>(null);
	const [theme, setTheme, _ref] = useTheme(
		themes,
		ref,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		styleRef as React.MutableRefObject<any>
	);
	const themeContext: IThemeContext = new ThemeContext({
		theme,
		setTheme,
		ref: _ref,
	});

	return (
		<ReactThemeContext.Provider value={themeContext}>
			<div ref={ref}>
				<style ref={styleRef}></style>
				{children}
			</div>
		</ReactThemeContext.Provider>
	);
}

export class ThemeContext implements IThemeContext {
	private _theme: Themes;
	private _setState: (theme: Themes) => void;
	constructor(props: IThemeContextProps) {
		const { theme, setTheme } = props;
		this._setState = setTheme;
		this._theme = theme;
	}

	public get themeRef() {
		return themes[this.theme][0];
	}

	public setTheme = (theme: Themes) => {
		this._theme = theme;
		this._setState(theme);
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

const ctx = createContext<IThemeContext>(
	new ThemeContext({
		theme: null,
		ref: null,
		setTheme: () => null,
	})
);

export const ReactThemeContext: Context<IThemeContext> = ctx;
