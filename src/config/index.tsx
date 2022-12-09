import React from "react";
import { Themes, themes } from "../config/themes";

const PUBLIC_ML_CONFIG_VAR = "__MLCONFIG__";

export interface IMLConfig {
	themeName: Themes;
	themeClassName: string;
}
export class MLConfig {
	private config: IMLConfig;

	constructor({ theme }: { theme: Themes }) {
		this.setTheme(theme);
	}

	public getConfig(prop?: string) {
		if (prop && this.config[prop]) return this.config[prop];
		return this.config;
	}

	public getThemeClassName() {
		return this.config.themeClassName;
	}

	public setTheme(themeName: Themes) {
		this.config = {
			themeName: themeName,
			themeClassName: themes[themeName][0],
		};
	}
}

export const addConfigScript = (config) => {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `${PUBLIC_ML_CONFIG_VAR} = ${JSON.stringify({ ...config })}`,
			}}
		/>
	);
};

export const getWindowConfig = () =>
	typeof window !== "undefined" && window[PUBLIC_ML_CONFIG_VAR];
