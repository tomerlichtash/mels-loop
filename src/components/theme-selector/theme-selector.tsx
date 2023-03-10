import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { SunIcon } from "@radix-ui/react-icons";
import { ReactThemeContext } from "../../contexts/theme-context";
import { ReactLocaleContext } from "../../contexts/locale-context";

export const ThemeSelector = ({ className }: ComponentProps): JSX.Element => {
	const { toggleTheme } = useContext(ReactThemeContext);
	const { translate } = useContext(ReactLocaleContext);
	const label = translate("TOGGLE_THEME");
	return (
		<div
			className="theme-selector"
			title={label}
			aria-label={label}
			onClick={toggleTheme}
		>
			<SunIcon className="icon" />
		</div>
	);
};

export default ThemeSelector;
