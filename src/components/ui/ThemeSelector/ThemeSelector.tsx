import React, { useEffect, useState } from "react";
import { ToggleRoot } from "@components/primitives";
import { Button } from "@components/ui";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import styles from "./ThemeSelector.module.scss";

const getIcon = (isDark: boolean) =>
	isDark ? (
		<MoonIcon className={styles.icon} />
	) : (
		<SunIcon className={styles.icon} />
	);

const ThemeSelector = ({ label, theme, setTheme }): JSX.Element => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

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
				{getIcon(isDark)}
			</ToggleRoot>
		</Button>
	);
};

export default ThemeSelector;
