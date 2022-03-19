import React from "react";
import { ComponentProps } from "../../interfaces/models";
import LocaleSelector from "../locale-selector";
import Nav from "../nav";
import { LOCALE_SELECTOR_LOCALE } from "../../locales/components";
import { slide as Menu } from "react-burger-menu";
import { st, classes } from "./nav-mobile.st.css";
import { IOption } from "../dropdown/option";

export interface IMobileNavProps extends ComponentProps {
	localeOptions: IOption[];
}

export const MobileNav = ({
	localeOptions,
	className,
}: IMobileNavProps): JSX.Element => {
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
					maxWidth: "300px",
					top: "0",
				},
			}}
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
