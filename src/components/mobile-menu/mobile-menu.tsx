import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { push as Menu } from "react-burger-menu";
import Header from "../header";
import ThemeSelector from "../theme-selector";
import LocaleSelector from "../locale-selector";
import { st, classes } from "./mobile-menu.st.css";

export interface IMobileNavProps extends ComponentProps {
	isHome: boolean;
	right: boolean;
}

export const MobileMenu = ({
	right,
	isHome,
	className,
}: IMobileNavProps): JSX.Element => {
	return (
		<Menu
			pageWrapId={"page-wrap"}
			outerContainerId={"outer-container"}
			burgerButtonClassName={st(
				classes.burgerButton,
				{ right },
				"mobileNavTrigger"
			)}
			menuClassName={classes.burgerMenu}
			burgerBarClassName={classes.burgerBars}
			crossButtonClassName={st(classes.crossButton, { right })}
			crossClassName={classes.burgerCross}
			overlayClassName={classes.overlay}
			itemListClassName={classes.itemList}
			styles={{
				bmMenuWrap: {
					position: "fixed",
					height: "100%",
					width: "300px",
					top: "0",
				},
			}}
			right={right}
			className={st(classes.root, className)}
		>
			<Header isHome={isHome} className={classes.header} />
			<LocaleSelector className={classes.localeSelector} />
			<ThemeSelector className={classes.themeSelector} />
		</Menu>
	);
};

export default MobileMenu;
