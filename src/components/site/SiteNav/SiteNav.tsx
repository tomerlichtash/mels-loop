import React, { useContext, useMemo } from "react";
import { LocaleProvider } from "../../../locale/context/locale-context";
import { MenuItems as menuItems } from "../../../config/siteNav/items";
import { MenuSections as menuSections } from "../../../config/siteNav/sections";
import HorizontalMenu from "./HorizontalMenu";
import VerticalMenu from "./VerticalMenu";
import { getMenuItems } from "./helpers";

type SiteNavProps = {
	variant?: "horizontal" | "vertical";
	className?: string;
};

const SiteNav = ({ variant = "horizontal", className }: SiteNavProps) => {
	const { translate } = useContext(LocaleProvider);

	const items = useMemo(
		() => getMenuItems(menuSections, menuItems, translate),
		[translate]
	);

	return (
		<>
			{variant === "horizontal" ? (
				<HorizontalMenu className={className} items={items} />
			) : (
				<VerticalMenu className={className} items={items} />
			)}
		</>
	);
};

export default SiteNav;
