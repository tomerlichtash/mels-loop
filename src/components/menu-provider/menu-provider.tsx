import React, { useContext, useMemo } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import {
	TopBarMenuSections as MenuSections,
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
// import {
// 	EnvelopeClosedIcon,
// 	GitHubLogoIcon,
// 	TwitterLogoIcon,
// 	FileIcon,
// 	FileTextIcon,
// 	ListBulletIcon,
// 	Pencil1Icon,
// 	InfoCircledIcon,
// 	ArchiveIcon,
// } from "@radix-ui/react-icons";
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

// export const MenuIcons = {
// 	github: <GitHubLogoIcon />,
// 	contact: <EnvelopeClosedIcon />,
// 	twitter: <TwitterLogoIcon />,
// 	file: <FileIcon />,
// 	fileText: <FileTextIcon />,
// 	list: <ListBulletIcon />,
// 	pencil: <Pencil1Icon />,
// 	info: <InfoCircledIcon />,
// 	archive: <ArchiveIcon />,
// 	envelope: <EnvelopeClosedIcon />,
// };

const getSection = (section: string): IMenuSection => MenuSections[section];

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

const getSectionChildren = (section: IMenuSection): IMenuItem[] =>
	section.children
		? section.children.map(
				(childId) => MenuItems.filter((child) => child.id === childId)[0]
		  )
		: null;

const getMenuItems = (translate: (s: string) => string) =>
	Object.keys(MenuSections).map((section) =>
		Object.assign({}, MenuSections[section], {
			keys: trKeys(getSection(section), translate),
			children: getSectionChildren(getSection(section)).map((child) =>
				Object.assign({}, child, {
					keys: trKeys(child, translate),
				})
			),
		})
	);

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

	const menuItems = useMemo(() => getMenuItems(translate), [translate]);

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
