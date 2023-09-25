import {
	FileIcon,
	GitHubLogoIcon,
	ListBulletIcon,
	TwitterLogoIcon,
	Pencil1Icon,
} from "@radix-ui/react-icons";

export const trKeys = (
	item: IMenuItemBase,
	translate: (s: string) => string
): MenuItemKeys =>
	Object.fromEntries(
		Object.keys(item.locale).map((key) => [
			key,
			translate(item.locale[key] as string),
		])
	);

export const getSectionItems = (section, items) => {
	return section.items
		? section.items.map(
				(itemId) => items.filter((item) => item.id === itemId)[0]
		  )
		: null;
};

export const getMenuItems = (
	sections: IMenuSection[],
	items,
	translate: (s: string) => string
) => {
	return Object.keys(sections).map((section) => {
		const currentSection = sections[section] as IMenuSection;
		return Object.assign({}, currentSection, {
			locale: trKeys(currentSection, translate),
			items: getSectionItems(currentSection, items).map((item) =>
				Object.assign({}, item, {
					locale: trKeys(item, translate),
				})
			),
		});
	});
};

export const getSectionData = (isMobile: boolean): IMenuSection[] => {
	return isMobile ? MobileMenuSections : MenuSections;
};

export const renderMenuItem =
	(item: IMenuData, textDirection: TextDirection) =>
	(
		renderSection: (
			items: IMenuData,
			textDirection: TextDirection
		) => React.ReactElement,
		renderSingle: (
			items: IMenuData,
			textDirection: TextDirection
		) => React.ReactElement | React.ReactElement[]
	) => {
		switch (item.type) {
			case "group":
				return renderSection(item, textDirection);
			case "single":
				return renderSingle(item, textDirection);
			default:
				break;
		}
	};

export const getButtonIcon = (icon: string) => {
	switch (icon) {
		case "file":
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
