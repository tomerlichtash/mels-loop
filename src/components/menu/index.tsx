import React, { useContext, useMemo } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { MenuItems as menuItems } from "../../config/site-navigation/items";
import { MenuSections as menuSections } from "../../config/site-navigation/sections";
import { TopbarMenu, SidebarMenu } from "./menus";
import { getMenuItems } from "./utils";

export const Menu = ({
	isMobile = false,
	className,
}: {
	isMobile?: boolean;
	className?: string;
}) => {
	const { translate } = useContext(ReactLocaleContext);

	const items = useMemo(
		() => getMenuItems(menuSections, menuItems, translate),
		[translate]
	);

	if (isMobile) {
		return <SidebarMenu className={className} items={items} />;
	}

	return <TopbarMenu className={className} items={items} />;
};

export default Menu;
