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
import { IMenuData, IMenuItem } from "../../interfaces/menu";
import {
	FileIcon,
	GitHubLogoIcon,
	ListBulletIcon,
	TwitterLogoIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
} from "@radix-ui/react-icons";
import { st, classes } from "./menu.st.css";
import { TextDirection } from "../../interfaces/locale-context";

export interface MenuData {
	items: IMenuData[];
	textDirection: TextDirection;
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

const MenuButton = ({ meta, keys, type }: IMenuItem) => {
	const { url, icon } = meta;
	const { title, author, description } = keys;
	const subtitle = type === "article" ? author : description;
	return (
		<Button
			link={url}
			label={title}
			className={st(classes.button, classes.menuItemButton)}
			icon={getButtonIcon(type, icon)}
		>
			<div className={classes.buttonSubtitle}>{subtitle}</div>
		</Button>
	);
};

const MenuTrigger = ({ title, url }) => (
	<NavigationTrigger className={classes.menuTrigger}>
		<Button
			label={title}
			link={url}
			className={st(classes.button, classes.triggerButton)}
			icon={<NavigationCaret aria-hidden />}
			iconSide={"left"}
		/>
	</NavigationTrigger>
);

const renderGroupSection = (items: IMenuData) => {
	const { meta, keys, children } = items;
	const { title } = keys;
	const { layout, url } = meta;
	return (
		<NavigationMenuItem
			key={mlUtils.uniqueId()}
			className={classes.menuItem}
			asChild
		>
			<div>
				<MenuTrigger title={title} url={url} />
				<NavigationMenuContent>
					<div className={st(classes.menuContent, { layout })}>
						{children.map((child) => (
							<div key={mlUtils.uniqueId()} className={classes.listItem}>
								<MenuButton {...child} />
							</div>
						))}
					</div>
				</NavigationMenuContent>
			</div>
		</NavigationMenuItem>
	);
};

const renderSingleSection = (item: IMenuData, textDirection: TextDirection) => {
	const { layout } = item.meta;
	return item.children.map((child) => {
		const { keys, meta } = child;
		const { url } = meta;
		const { title, description, cta_label } = keys;
		return (
			<NavigationMenuItem key={mlUtils.uniqueId()} className={classes.menuItem}>
				<MenuTrigger title={title} url={url} />
				<NavigationMenuContent asChild>
					<div className={st(classes.menuContent, { layout })}>
						<div className={classes.abstractTitle}>{title}</div>
						<p className={classes.abstract}>
							{description}
							<Button
								className={classes.more}
								label={cta_label}
								link={url}
								iconSide={"left"}
								icon={
									textDirection === "ltr" ? (
										<ChevronRightIcon />
									) : (
										<ChevronLeftIcon />
									)
								}
							/>
						</p>
					</div>
				</NavigationMenuContent>
			</NavigationMenuItem>
		);
	});
};

export const Menu = ({ items, textDirection, className }: MenuData) => {
	const menuItems = useMemo(
		() =>
			items.map((item) =>
				renderMenuItem(item, textDirection)(
					renderGroupSection,
					renderSingleSection
				)
			),
		[items, textDirection]
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
