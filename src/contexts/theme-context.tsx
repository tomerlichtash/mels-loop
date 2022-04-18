import { Context, createContext } from "react";

export interface IThemeContext {
	theme: string;
}
export class ThemeContext implements IThemeContext {
	private _theme: string;
	constructor(props: IThemeContext) {
		this._theme = props.theme;
	}

	public get theme() {
		return this._theme;
	}

	public setTheme(theme: string) {
		this._theme = theme;
	}
}

const ctx = createContext<IThemeContext>(new ThemeContext({ theme: "" }));

export const ReactThemeContext: Context<IThemeContext> = ctx;
