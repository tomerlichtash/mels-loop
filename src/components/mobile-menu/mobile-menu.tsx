import React from "react";
import { push as Menu } from "react-burger-menu";
import Header from "../header";
import ThemeSelector from "../theme-selector";
import LocaleSelector from "../locale-selector";
import { NavMenuProps } from "../../interfaces/menu";
import { mlUtils } from "../../lib/ml-utils";
import Link from "next/link";
import { st, classes } from "./mobile-menu.st.css";

export interface IMobileNavProps extends NavMenuProps {
	right: boolean;
}

const listItem = ({ type, title, description, url, author }) => (
	<li key={mlUtils.uniqueId()}>
		<Link href={url}>
			<a href={url} className={classes.menuLink}>
				<span className={classes.title}>{title}</span>
				<p className={classes.text}>
					{type === "article" ? author : description}
				</p>
			</a>
		</Link>
	</li>
);

const menuItem = ({ title, content, layout }) => (
	<div>
		<h2>{title}</h2>
		<ul className={st(classes.menuContent, { layout })}>
			{content.map(listItem)}
		</ul>
	</div>
);

export const MobileMenu = ({
	right,
	items,
	className,
}: IMobileNavProps): JSX.Element => {
	return (
		<Menu
			pageWrapId={"page-wrap"}
			outerContainerId={"outer-container"}
			burgerButtonClassName={st(
				classes.burgerButton,
				{ right }
				// "mobileNavTrigger"
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
			className={st(
				classes.root,
				{ side: right ? "right" : "left" },
				className
			)}
		>
			<Header className={classes.header} />
			<div className={classes.strip}>xxx</div>
			<LocaleSelector className={classes.localeSelector} />
			<ThemeSelector className={classes.themeSelector} />
			{items.map(menuItem)}
		</Menu>
	);
};

export default MobileMenu;
