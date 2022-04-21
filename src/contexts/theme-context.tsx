import { Context, createContext } from "react";
import Cookies from "js-cookie";
export type Themes = "light" | "dark" | null;

export interface IThemeContextProps {
	theme: Themes;
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
	private _setState: (theme: Themes) => void;
	constructor(props: IThemeContextProps) {
		const { theme, setTheme } = props;
		this._theme = theme;
		this._setState = setTheme;
		if (theme !== null) {
			Cookies.set("theme", theme);
		}
	}

	public setTheme = (theme: Themes) => {
		if (theme === this.theme) {
			return;
		}

		this._setState(theme);
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
		setTheme: () => null,
	})
);

export const ReactThemeContext: Context<IThemeContext> = ctx;
