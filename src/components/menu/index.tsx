import React, { useContext, useMemo } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";

import { MenuItems as menuItems } from "./data/items";
import { MenuSections as menuSections } from "./data/sections";

import { ComponentProps } from "../../interfaces/models";
import { TopbarMenu, SidebarMenu } from "./menus";
import { getMenuItems } from "./utils";

export interface MenuProviderProps extends ComponentProps {
	isMobile?: boolean;
}
export const Menu = ({ isMobile, className }: MenuProviderProps) => {
	const { translate } = useContext(ReactLocaleContext);

	const items = useMemo(() => {
		return getMenuItems(menuSections, menuItems, translate);
	}, [translate]);

	if (isMobile) {
		return <SidebarMenu className={className} items={items} />;
	}

	return <TopbarMenu className={className} items={items} />;
};

export default Menu;
