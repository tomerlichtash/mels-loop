import { Context, createContext } from "react";

export type Themes = "light" | "dark" | null;

export interface IThemeContextProps {
	theme: Themes;
	setTheme: (theme: Themes) => void;
	setLSTheme: (theme: Themes) => void;
}

export interface IThemeContext {
	theme: string;
	toggleTheme: () => void;
	isDarkTheme: boolean;
}

export class ThemeContext implements IThemeContext {
	private _theme: string;
	private _setState: (theme: Themes) => void;
	private _setLocalStorage: (theme: Themes) => void;
	constructor(props: IThemeContextProps) {
		if (!props) {
			return null;
		}
		const { theme, setTheme, setLSTheme } = props;
		this._theme = theme;
		this._setState = setTheme;
		this._setLocalStorage = setLSTheme;
	}

	private setTheme(theme: Themes) {
		localStorage.clear();
		this._setState(theme);
		this._setLocalStorage(theme);
	}

	public get theme() {
		return this._theme;
	}

	public get isDarkTheme() {
		return this.theme === "dark";
	}

	public toggleTheme = () => {
		this.setTheme(this.isDarkTheme ? "light" : "dark");
	};
}

const ctx = createContext<IThemeContext>(new ThemeContext(null));

export const ReactThemeContext: Context<IThemeContext> = ctx;
