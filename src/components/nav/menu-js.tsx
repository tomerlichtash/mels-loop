import React from "react";
import { NavMenuProps } from "./types";
import { v4 as uuidv4 } from "uuid";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuContent,
	NavigationMenuViewport,
	NavigationIndicator,
	NavigationTrigger,
	NavigationCaret,
} from "./menu-primitives";
import { st, classes } from "./menu.st.css";

export const NavMenu = ({ items, className }: NavMenuProps) => {
	const listItem = ({ title, description, url }) => (
		<li key={uuidv4()}>
			<NavigationMenuLink href={url} className={classes.link}>
				<div className={classes.linkTitle}>{title as string}</div>
				<p className={classes.linkText}>{description}</p>
			</NavigationMenuLink>
		</li>
	);

	const menuItem = ({ title, content, layout }) => (
		<NavigationMenuItem key={uuidv4()} className={classes.item}>
			<NavigationTrigger className={classes.trigger}>
				{title}
				<NavigationCaret aria-hidden />
			</NavigationTrigger>
			<NavigationMenuContent>
				<ul className={st(classes.menuContent, { layout })}>
					{content.map(listItem)}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);

	return (
		<NavigationMenu className={st(classes.root, className)}>
			<NavigationMenuList asChild>
				<div className={classes.list}>
					{items.map(menuItem)}
					<NavigationIndicator>
						<div className={classes.arrow}></div>
					</NavigationIndicator>
				</div>
			</NavigationMenuList>
			<div className={classes.viewportPosition}>
				<NavigationMenuViewport />
			</div>
		</NavigationMenu>
	);
};

export default NavMenu;
