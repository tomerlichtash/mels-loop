import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { SunIcon } from "@radix-ui/react-icons";
import { st, classes } from "./theme-selector.st.css";
import { ReactThemeContext } from "../../contexts/theme-context";
export interface IThemeSelectorProps extends ComponentProps {
	// isDarkTheme: boolean;
	// toggleTheme: () => void;
	// theme: string;
	className?: string;
}

export const ThemeSelector = ({
	// toggleTheme,
	// theme,
	className,
}: IThemeSelectorProps): JSX.Element => {
	const { theme, toggleTheme } = useContext(ReactThemeContext);
	const label = `Toggle ${theme} Theme`;
	return (
		<div
			className={st(classes.root, { theme }, className)}
			title={label}
			aria-label={label}
			onClick={toggleTheme}
		>
			<SunIcon className={st(classes.icon)} />
		</div>
	);
};

export default ThemeSelector;
