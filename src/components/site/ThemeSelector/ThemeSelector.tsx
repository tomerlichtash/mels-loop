import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import styles from "./ThemeSelector.module.scss";
import { ToggleRoot } from "@components/primitives";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@components/ui";
import { LocaleProvider } from "../../../locale/context/locale-context";

const ThemeSelector = (): JSX.Element => {
	const { translate } = useContext(LocaleProvider);
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const label = useMemo(() => {
		const themeName = theme === "dark" ? "light" : "dark";
		return `${translate("site.components.themeSelector.switchTo")} ${translate(
			`site.components.themeSelector.theme.${themeName}`
		)}`;
	}, [theme, translate]);

	if (!mounted) return null;

	const isDark = theme === "dark";

	return (
		<Button asChild className={styles.root}>
			<ToggleRoot
				onPressedChange={() => setTheme(isDark ? "light" : "dark")}
				data-selected-theme={isDark ? "dark" : "light"}
				defaultPressed={isDark}
				title={label || ""}
			>
				{isDark ? (
					<MoonIcon className={styles.icon} />
				) : (
					<SunIcon className={styles.icon} />
				)}
			</ToggleRoot>
		</Button>
	);
};

export default ThemeSelector;
