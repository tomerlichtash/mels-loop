import { classes as LightTheme } from "../theme/light/style.st.css";
import { classes as DarkTheme } from "../theme/dark/style.st.css";

export type Themes = "base" | "light" | "dark" | null;

export const themes: Record<string, string[]> = {
	light: [LightTheme.root],
	dark: [DarkTheme.root],
	base: [],
};
