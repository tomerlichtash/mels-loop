import React, { useMemo } from "react";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuViewport,
	NavigationIndicator,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationTrigger,
	NavigationCaret,
} from "../radix-primitives";
import Link from "next/link";
import { mlUtils } from "../../lib/ml-utils";
import { renderMenuItem } from "../menu-provider";
import { Button } from "../ui";
import { IMenuData } from "../../interfaces/menu";
import { st, classes } from "./menu.st.css";

export interface MenuData {
	items: IMenuData[];
	className?: string;
}

const renderGroupChild = (child) => {
	const { meta, keys, type } = child;
	const { url } = meta;
	const { title, author, description } = keys;
	return (
		<li key={mlUtils.uniqueId()}>
			<Link href={url}>
				<a href={url}>
					{/* {icon && MenuIcons[icon]} */}
					<span className={classes.title}>{title}</span>
					<p className={classes.text}>
						{type === "article" ? author : description}
					</p>
				</a>
			</Link>
		</li>
	);
};

const renderGroupSection = (items: IMenuData) => {
	const { meta, keys, children } = items;
	const { title } = keys;
	const { layout } = meta;
	return (
		<NavigationMenuItem key={mlUtils.uniqueId()} className={classes.item}>
			<NavigationTrigger className={classes.trigger}>
				{title}
				<NavigationCaret aria-hidden />
			</NavigationTrigger>
			<NavigationMenuContent>
				<ul className={st(classes.menuContent, { layout })}>
					{children.map(renderGroupChild)}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
};

const renderSingleSection = (item: IMenuData) => {
	const { children, meta } = item;
	const { layout } = meta;
	return children.map((child) => {
		const { title, description, cta_label } = child.keys;
		const { url } = child.meta;
		return (
			<NavigationMenuItem key={mlUtils.uniqueId()} className={classes.item}>
				<NavigationTrigger className={classes.trigger}>
					<Link href={url}>
						<a href={url}>
							<span className={classes.title}>{title}</span>
						</a>
					</Link>
					<NavigationCaret aria-hidden />
				</NavigationTrigger>
				<NavigationMenuContent className={st(classes.menuContent, { layout })}>
					<div>{description}</div>
					<Button label={cta_label} />
				</NavigationMenuContent>
			</NavigationMenuItem>
		);
	});
};

export const Menu = ({ items, className }: MenuData) => {
	const menuItems = useMemo(
		() =>
			items.map((item) =>
				renderMenuItem(item)(renderGroupSection, renderSingleSection)
			),
		[items]
	);

	return (
		<NavigationMenu className={st(classes.root, className)}>
			<NavigationMenuList asChild>
				<div className={classes.list}>
					{menuItems}
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
