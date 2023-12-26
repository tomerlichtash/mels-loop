import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { ComponentProps } from "../../../interfaces/models";
import styles from "./ThemeSelector.module.scss";
import { ToggleRoot } from "@components/primitives";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

interface ThemeSelectorProps extends ComponentProps {
	label: string;
	icon: string;
}

const ThemeSelector = ({ label }: ThemeSelectorProps): JSX.Element => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const isDark = theme === "dark";

	return (
		<ToggleRoot
			className={styles.root}
			onPressedChange={() => setTheme(isDark ? "light" : "dark")}
			data-selected-theme={isDark ? "dark" : "light"}
			defaultPressed={isDark}
			title={label}
		>
			{isDark ? <MoonIcon color="#fff" /> : <SunIcon color="#000" />}
		</ToggleRoot>
	);
};

export default ThemeSelector;
