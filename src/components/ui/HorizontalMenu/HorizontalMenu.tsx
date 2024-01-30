// import React, { PropsWithChildren, useMemo } from "react";
// // import { LocaleSelector, ThemeSelector } from "@components/site";
// import HorizontalNav from "./HorizontalNav";
// import styles from "./HorizontalMenu.module.scss";
// import classNames from "classnames";

// type HorizontalMenuProps = {
// 	className?: string;
// };

// const HorizontalMenu = ({
// 	children,
// 	className,
// }: HorizontalMenuProps & PropsWithChildren) => {
// 	const horizontalNav = useMemo(() => <HorizontalNav />, []);
// 	// const localeSelector = useMemo(() => <LocaleSelector />, []);
// 	// const themeSelector = useMemo(() => <ThemeSelector />, []);

// 	return (
// 		<div className={classNames(styles.root, className)}>
// 			{horizontalNav}
// 			{children}
// 			{/* {localeSelector}
// 			{themeSelector} */}
// 		</div>
// 	);
// };

// export default HorizontalMenu;
