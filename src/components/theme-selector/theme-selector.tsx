import React, { useContext } from "react";
import { ReactThemeContext } from "../../contexts/theme-context";
import { ComponentProps } from "../../interfaces/models";
import { SunIcon } from "@radix-ui/react-icons";
import { st, classes } from "./theme-selector.st.css";

export const ThemeSelector = ({ className }: ComponentProps): JSX.Element => {
	const { theme, isDarkTheme, toggleTheme } = useContext(ReactThemeContext);
	const label = `Toggle ${theme} Theme`;
	return (
		<div
			className={st(classes.root, { dark: isDarkTheme }, className)}
			title={label}
			aria-label={label}
			onClick={() => toggleTheme()}
		>
			<SunIcon className={st(classes.icon)} />
		</div>
	);
};

export default ThemeSelector;
