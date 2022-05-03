import React, { useContext, useMemo } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { navItems } from "../../config/menu-data";
import { Menu } from "../menu";
import { MobileMenu } from "../mobile-menu";
import { MenuGroup } from "../../interfaces/menu";
import { ComponentProps } from "../../interfaces/models";
import { st as menuStyle, classes as menuClasses } from "../menu/menu.st.css";
import {
	st as mobileStyle,
	classes as mobileClasses,
} from "../mobile-menu/mobile-menu.st.css";

export interface MenuProviderProps extends ComponentProps {
	isMobile?: boolean;
}

export const translateItems = (
	items: MenuGroup[],
	translate: (s: string) => string
) => {
	return items.map((group: MenuGroup) =>
		Object.assign({}, group, {
			title: translate(group.title),
			content: group.content.map((item) =>
				Object.assign({}, item, {
					title: translate(item.title),
					description: translate(item.description),
					author: translate(item.author),
				})
			),
		})
	);
};

export const MenuProvider = ({ isMobile, className }: MenuProviderProps) => {
	const { textDirection, translate } = useContext(ReactLocaleContext);

	const menuItems = useMemo(
		() => translateItems(navItems, translate) as MenuGroup[],
		[translate]
	);

	if (isMobile) {
		return (
			<MobileMenu
				className={mobileStyle(mobileClasses.root, className)}
				right={textDirection === "ltr"}
				items={menuItems}
			/>
		);
	}

	return (
		<Menu
			className={menuStyle(menuClasses.root, className)}
			items={menuItems}
		/>
	);
};

export default MenuProvider;
