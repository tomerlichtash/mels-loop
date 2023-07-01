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
	Pencil1Icon,
} from "@radix-ui/react-icons";
import { TextDirection } from "../../interfaces/locale-context";
import MyNavigationMenuDemo from "./tempmenu";

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
		case "pencil":
			return <Pencil1Icon />;
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
			target={type === "external" ? "_blank" : undefined}
			label={title}
			className="button"
			icon={getButtonIcon(type, icon)}
		>
			<div className="subtitle">{subtitle}</div>
		</Button>
	);
};

const MenuTrigger = ({ title, url }) => (
	<NavigationTrigger className="NavigationMenuTrigger">
		<Button
			label={title}
			link={url}
			className="trigger"
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
			className="NavigationMenuLink"
			asChild
		>
			<div>
				<MenuTrigger title={title} url={url} />
				<NavigationMenuContent>
					<div className="NavigationMenuContent">
						{children.map((child) => (
							<div key={mlUtils.uniqueId()} className="list-item">
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
			<NavigationMenuItem key={mlUtils.uniqueId()} className="menu-item">
				{/* <MenuTrigger title={title} url={url} /> */}
				<NavigationMenuContent asChild>
					<div className="menu-content">
						<p className="abstract">{description}</p>
						<Button
							className="more"
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
		<MyNavigationMenuDemo />
		// <NavigationMenu className="NavigationMenuRoot">
		// 	<NavigationMenuList className="NavigationMenuList">
		// 		{menuItems}
		// 		<NavigationIndicator className="NavigationMenuIndicator">
		// 			<div className="arrow"></div>
		// 		</NavigationIndicator>
		// 	</NavigationMenuList>
		// 	<div className="ViewportPosition">
		// 		<NavigationMenuViewport className="NavigationMenuViewport" />
		// 	</div>
		// </NavigationMenu>
	);
};

export default Menu;
