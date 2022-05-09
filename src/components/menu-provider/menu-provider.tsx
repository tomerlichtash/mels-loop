import React, { useContext, useMemo } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import {
	MenuSections,
	MobileMenuSections,
	MenuItems,
} from "../../config/menu-data";
import {
	IMenuSection,
	IMenuItem,
	MenuItemKeys,
	IMenuItemBase,
	IMenuData,
} from "../../interfaces/menu";
import { ComponentProps } from "../../interfaces/models";
import { Menu } from "../menu";
import { st as menuStyle, classes as menuClasses } from "../menu/menu.st.css";
import { MobileMenu } from "../mobile-menu";
import {
	st as mobileStyle,
	classes as mobileClasses,
} from "../mobile-menu/mobile-menu.st.css";

export interface MenuProviderProps extends ComponentProps {
	isMobile?: boolean;
}

const trKeys = (
	item: IMenuItemBase,
	translate: (s: string) => string
): MenuItemKeys =>
	Object.fromEntries(
		Object.keys(item.keys).map((key) => [
			key,
			translate(item.keys[key] as string),
		])
	);

const getSectionItems = (section: IMenuSection): IMenuItem[] =>
	section.children
		? section.children.map(
				(childId) => MenuItems.filter((child) => child.id === childId)[0]
		  )
		: null;

const getMenuItems = (
	sections: IMenuSection[],
	translate: (s: string) => string
) => {
	return Object.keys(sections).map((section) => {
		const currentSection = sections[section] as IMenuSection;
		return Object.assign({}, currentSection, {
			keys: trKeys(currentSection, translate),
			children: getSectionItems(currentSection).map((item) =>
				Object.assign({}, item, {
					keys: trKeys(item, translate),
				})
			),
		});
	});
};

const getSectionData = (isMobile: boolean): IMenuSection[] => {
	return isMobile ? MobileMenuSections : MenuSections;
};

export const renderMenuItem =
	(item: IMenuData) =>
	(
		renderSection: (items: IMenuData) => React.ReactElement,
		renderSingle: (
			items: IMenuData
		) => React.ReactElement | React.ReactElement[]
	) => {
		switch (item.type) {
			case "group":
				return renderSection(item);
			case "single":
				return renderSingle(item);
			default:
				break;
		}
	};

export const MenuProvider = ({ isMobile, className }: MenuProviderProps) => {
	const { textDirection, translate } = useContext(ReactLocaleContext);

	const menuItems = useMemo(
		() => getMenuItems(getSectionData(isMobile), translate),
		[translate, isMobile]
	);

	if (isMobile) {
		return (
			<MobileMenu
				items={menuItems}
				className={mobileStyle(mobileClasses.root, className)}
				right={textDirection === "ltr"}
			/>
		);
	}

	return (
		<Menu
			items={menuItems}
			className={menuStyle(menuClasses.root, className)}
		/>
	);
};

export default MenuProvider;
