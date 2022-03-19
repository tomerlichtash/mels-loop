import React from "react";
import { ComponentProps } from "../../interfaces/models";
import LocaleSelector from "../locale-selector";
import Nav from "../nav";
import { LOCALE_SELECTOR_LOCALE } from "../../locales/components";
import { push as Menu } from "react-burger-menu";
import { st, classes } from "./nav-mobile.st.css";
import { IOption } from "../dropdown/option";

export interface IMobileNavProps extends ComponentProps {
	localeOptions: IOption[];
	right: boolean;
}

export const MobileNav = ({
	localeOptions,
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
			crossButtonClassName={classes.crossButton}
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
				className={classes.localeSelector}
				options={localeOptions}
				compKeys={LOCALE_SELECTOR_LOCALE}
			/>
			<Nav className={classes.nav} />
		</Menu>
	);
};

export default MobileNav;
