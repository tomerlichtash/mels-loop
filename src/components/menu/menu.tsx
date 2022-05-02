import React from "react";
import { NavMenuProps } from "./types";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuViewport,
	NavigationIndicator,
	NavigationTrigger,
	NavigationCaret,
} from "../radix-primitives";
import Link from "next/link";
import { mlUtils } from "../../lib/ml-utils";
import { st, classes } from "./menu.st.css";

export const Menu = ({ items, className }: NavMenuProps) => {
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
		<NavigationMenuItem key={mlUtils.uniqueId()} className={classes.item}>
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
				<NavigationMenuViewport className={classes.viewport} />
			</div>
		</NavigationMenu>
	);
};

export default Menu;
