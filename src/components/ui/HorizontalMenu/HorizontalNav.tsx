import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { mlUtils } from "lib/ml-utils";
import { Button, NavListItem, NavItemContent } from "@components/ui";
import styles from "./HorizontalNav.module.scss";

type MenuSectionProps = {
	id: string;
	locale: Record<string, string>;
	items: string[];
};

type MenuItemProps = {
	id: string;
	type: "article" | "page" | "external";
	url: string;
	icon: string;
	locale: Record<string, string>;
};

type NavItemProps = {
	icon: string;
	title: string;
	description: string;
	author: string;
};

const getItems = (items: MenuItemProps[]) =>
	items.map((item) => (
		<NavigationMenu.Link asChild key={mlUtils.uniqueId()}>
			<li className={styles.listItem}>
				<NavListItem key={mlUtils.uniqueId()} className={styles.item} {...item}>
					<NavItemContent {...item} {...item.locale} />
				</NavListItem>
			</li>
		</NavigationMenu.Link>
	));

const getSections = (sections: MenuSectionProps[]) =>
	sections.map((section) => (
		<NavigationMenu.Item key={section.id}>
			<Button asChild className={styles.trigger}>
				<NavigationMenu.Trigger>
					{section.locale.title}
					<CaretDownIcon className={styles.caretDown} />
				</NavigationMenu.Trigger>
			</Button>
			<NavigationMenu.Content className={styles.content}>
				<ul data-list-grid-size="1" className={styles.items}>
					{getItems(section.items)}
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	));

const HorizontalNav = ({ items }) => (
	<NavigationMenu.Root className={styles.root}>
		<NavigationMenu.List className={styles.list}>
			{getSections(items)}
			<NavigationMenu.Indicator className={styles.indicator}>
				<div className={styles.arrow}></div>
			</NavigationMenu.Indicator>
		</NavigationMenu.List>
		<div className={styles.viewportPosition}>
			<NavigationMenu.Viewport className={styles.viewport} />
		</div>
	</NavigationMenu.Root>
);

export default HorizontalNav;
