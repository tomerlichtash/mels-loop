import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { SunIcon } from "@radix-ui/react-icons";
import { ReactThemeContext } from "../../contexts/theme-context";
import { st, classes } from "./theme-selector.st.css";

export const ThemeSelector = ({ className }: ComponentProps): JSX.Element => {
	const { theme, toggleTheme } = useContext(ReactThemeContext);
	const label = `Toggle Theme`;
	return (
		<div
			className={st(classes.root, { theme })}
			title={label}
			aria-label={label}
			onClick={toggleTheme}
		>
			<SunIcon className={classes.icon} />
		</div>
	);
};

export default ThemeSelector;
