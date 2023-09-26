import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { SunIcon } from "@radix-ui/react-icons";
import { ReactThemeContext } from "../../contexts/theme-context";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { Button } from "@mui/material";
import classNames from "classnames";
import styles from "./theme-selector.module.scss";

export const ThemeSelector = ({ className }: ComponentProps): JSX.Element => {
	const { toggleTheme } = useContext(ReactThemeContext);
	const { translate } = useContext(ReactLocaleContext);
	const label = translate("TOGGLE_THEME");
	return (
		<Button
			size="large"
			onClick={toggleTheme}
			title={label}
			className={classNames([styles.root, className])}
		>
			<SunIcon />
		</Button>
	);
};
