import React from "react";
import { ComponentProps } from "../../interfaces/models";
import { slide as Menu } from "react-burger-menu";
import { st, classes } from "./nav-mobile.st.css";

export const MobileNav = ({
	children,
	className,
}: ComponentProps): JSX.Element => {
	return (
		<Menu
			className={st(classes.root, className)}
			// width={100}
			burgerButtonClassName={classes.burgerButton}
			menuClassName={classes.burgerMenu}
			burgerBarClassName={classes.burgerBars}
			crossButtonClassName={classes.crossButton}
			crossClassName={classes.burgerCross}
			overlayClassName={classes.overlay}
			itemListClassName={classes.itemList}
			itemListElement="div"
			styles={{
				bmMenuWrap: {
					position: "fixed",
					height: "100%",
					width: "70%",
					top: "0",
				},
			}}
		>
			{children}
		</Menu>
	);
};

export default MobileNav;
