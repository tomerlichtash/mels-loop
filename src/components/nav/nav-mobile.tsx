import React from "react";
import { ComponentProps } from "../../interfaces/models";
import LocaleSelector from "../locale-selector";
import Nav from "../nav";
import { push as Menu } from "react-burger-menu";
import { st, classes } from "./nav-mobile.st.css";

export interface IMobileNavProps extends ComponentProps {
	onLocaleChange: (id: string) => Promise<boolean>;
	right: boolean;
}

export const MobileNav = ({
	onLocaleChange,
	right,
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
			<LocaleSelector
				onLocaleChange={onLocaleChange}
				className={classes.localeSelector}
			/>
			<Nav className={st(classes.nav, { right })} />
		</Menu>
	);
};

export default MobileNav;
