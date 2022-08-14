import experiments from "../config/experiments.json";
import { Themes, themes } from "../config/themes";
import { PUBLIC_ML_CONFIG_VAR } from "../consts";

type ExperimentEnv = "development" | "production" | "disabled";

const env = process.env.NODE_ENV;

export interface IPublicConfig {
	themeName: Themes;
	themeId: string;
	debug: boolean;
	experiments: Record<string, ExperimentEnv>;
}

let config: IPublicConfig = {
	themeName: null,
	themeId: "",
	debug: !!process.env.NEXT_PUBLIC_ML_DEBUG,
	experiments: JSON.parse(JSON.stringify(experiments)),
};

export const addConfigScript = () => {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `${PUBLIC_ML_CONFIG_VAR} = ${JSON.stringify({ ...config })}`,
			}}
		/>
	);
};

export const getConfig = () => {
	return config;
};

export const setTheme = (themeName: Themes) => {
	config.themeName = themeName;
	config.themeId = themes[themeName][0];
};

export const getThemeId = () => {
	return config.themeId;
};

export const isExperimentEnabled = (experimentName: string) => {
	const experiment = config.experiments[experimentName];
	if (!experiment || experiment === "disabled") return false;
	if (experiment === "production") return true;
	return experiment === env;
};
