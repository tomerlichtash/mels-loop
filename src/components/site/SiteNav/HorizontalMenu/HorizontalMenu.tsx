import React, { useMemo } from "react";
import {
	LocaleSelector,
	ThemeSelector,
	VerticalMenuTrigger,
} from "@components/site";
import HorizontalNav from "./HorizontalNav";
import styles from "./HorizontalMenu.module.scss";
import classNames from "classnames";

type HorizontalMenuProps = {
	isMobile?: boolean;
	toggleSidebar?: () => void;
	className?: string;
};
const HorizontalMenu = ({
	isMobile,
	toggleSidebar,
	className,
}: HorizontalMenuProps) => {
	const verticalMenuTrigger = useMemo(
		() => <VerticalMenuTrigger onClick={toggleSidebar} />,
		[toggleSidebar]
	);
	const horizontalNav = useMemo(() => <HorizontalNav />, []);
	const localeSelector = useMemo(() => <LocaleSelector />, []);
	const themeSelector = useMemo(() => <ThemeSelector />, []);

	if (isMobile) {
		return verticalMenuTrigger;
	}

	return (
		<div className={classNames(styles.root, className)}>
			{verticalMenuTrigger}
			{horizontalNav}
			{localeSelector}
			{themeSelector}
		</div>
	);
};

export default HorizontalMenu;
