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
import { mlUtils } from "../../lib/ml-utils";
import { renderMenuItem } from "../menu-provider";
import { Button } from "../ui";
import { IMenuData } from "../../interfaces/menu";
import {
	FileIcon,
	GitHubLogoIcon,
	ListBulletIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { st, classes } from "./menu.st.css";

export interface MenuData {
	items: IMenuData[];
	className?: string;
}

export interface MenuTriggerProps {
	title: string;
	url?: string;
	className?: string;
}

const getButtonIcon = (type: string, icon: string) => {
	switch (icon || type) {
		case "article":
			return <FileIcon />;
		case "list":
			return <ListBulletIcon />;
		case "twitter":
			return <TwitterLogoIcon />;
		case "github":
			return <GitHubLogoIcon />;
		default:
			break;
	}
};

const MenuButton = ({ meta, keys, type }) => {
	const { url, icon } = meta;
	const { title, author, description } = keys;
	const subtitle = type === "article" ? author : description;
	return (
		<Button
			link={url}
			label={title}
			className={st(classes.button, classes.menuItemButton)}
			icon={getButtonIcon(type as string, icon as string)}
		>
			<div className={classes.buttonSubtitle}>{subtitle}</div>
		</Button>
	);
};

const renderGroupSection = (items: IMenuData) => {
	const { meta, keys, children } = items;
	const { title } = keys;
	const { layout, url } = meta;
	return (
		<NavigationMenuItem key={mlUtils.uniqueId()} className={classes.menuItem}>
			{/* <MenuTrigger
				title={title}
				className={st(classes.button, classes.triggerButton)}
			/> */}
			<NavigationTrigger className={classes.menuTrigger}>
				<Button
					label={title}
					link={url}
					className={st(classes.button, classes.triggerButton)}
					icon={<NavigationCaret aria-hidden />}
				/>
			</NavigationTrigger>
			<NavigationMenuContent>
				<ul className={st(classes.menuContent, { layout })}>
					{children.map((child) => (
						<li key={mlUtils.uniqueId()} className={classes.listItem}>
							<MenuButton {...child} />
						</li>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
};

const renderSingleSection = (item: IMenuData) => {
	const { layout } = item.meta;
	return item.children.map((child) => {
		const { keys, meta } = child;
		const { url } = meta;
		const { title, description, cta_label } = keys;
		return (
			<NavigationMenuItem key={mlUtils.uniqueId()} className={classes.menuItem}>
				{/* <MenuTrigger
					title={title}
					url={url}
					className={st(classes.button, classes.triggerButton)}
				/> */}
				<NavigationTrigger className={classes.menuTrigger}>
					<Button
						label={title}
						link={url}
						className={st(classes.button, classes.triggerButton)}
						icon={<NavigationCaret aria-hidden />}
					/>
				</NavigationTrigger>
				<NavigationMenuContent className={st(classes.menuContent, { layout })}>
					<p className={classes.abstract}>{description}</p>
					<Button label={cta_label} link={url} />
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
					<NavigationIndicator className={classes.indicator}>
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
