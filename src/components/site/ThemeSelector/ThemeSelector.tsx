import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { ComponentProps } from "../../../interfaces/models";
import classNames from "classnames";
import styles from "./ThemeSelector.module.scss";
import { ToggleRoot } from "@components/primitives";
import { SunIcon } from "@radix-ui/react-icons";

interface ThemeSelectorProps extends ComponentProps {
	label: string;
	icon: string;
}

const ThemeSelector = ({
	label,
	className,
}: ThemeSelectorProps): JSX.Element => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const isDark = theme === "dark";

	return (
		<ToggleRoot
			className={classNames(styles.root, className)}
			onPressedChange={() => setTheme(isDark ? "light" : "dark")}
			data-state={isDark ? "on" : "off"}
			defaultPressed={isDark}
			title={label}
		>
			<SunIcon />
		</ToggleRoot>
	);
};

export default ThemeSelector;
