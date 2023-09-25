import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { SunIcon } from "@radix-ui/react-icons";
import { ReactThemeContext } from "../../contexts/theme-context";
import { ReactLocaleContext } from "../../contexts/locale-context";
import classNames from "classnames";
import styles from "./theme-selector.module.scss";
import { Button } from "@mui/material";

export const ThemeSelector = ({ className }: ComponentProps): JSX.Element => {
	const { toggleTheme } = useContext(ReactThemeContext);
	const { translate } = useContext(ReactLocaleContext);
	const label = translate("TOGGLE_THEME");
	return (
		<Button
			size="small"
			onClick={toggleTheme}
			title={label}
			className={classNames([styles.root, className])}
		>
			<SunIcon className="icon" />
		</Button>
	);
};
