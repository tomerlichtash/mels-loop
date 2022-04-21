import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { SunIcon } from "@radix-ui/react-icons";
import { st, classes } from "./theme-selector.st.css";

export interface IThemeSelectorProps extends ComponentProps {
	isDarkTheme: boolean;
	toggleTheme: () => void;
	theme: string;
}

export const ThemeSelector = ({
	toggleTheme,
	// theme,
	className,
}: IThemeSelectorProps): JSX.Element => {
	const label = `Toggle Theme`;
	return (
		<div
			className={st(classes.root, { theme: false }, className)}
			title={label}
			aria-label={label}
			onClick={toggleTheme}
		>
			<SunIcon className={st(classes.icon)} />
		</div>
	);
};

export default ThemeSelector;
