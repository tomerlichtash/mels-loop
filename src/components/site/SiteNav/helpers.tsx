import {
	FileIcon,
	ListBulletIcon,
	GitHubLogoIcon,
	Pencil1Icon,
} from "@radix-ui/react-icons";

const trKeys = (item, translate: (s: string) => string) =>
	Object.fromEntries(
		Object.keys(item.locale as string[]).map((key) => [
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

const getIcon = (icon: string) => {
	switch (icon) {
		case "article":
			return <FileIcon />;
		case "list":
			return <ListBulletIcon />;
		case "github":
			return <GitHubLogoIcon />;
		case "pencil":
			return <Pencil1Icon />;
		default:
			return icon;
	}
};

export const getMenuItems = (
	sections,
	items,
	translate: (s: string) => string
) => {
	return Object.keys(sections as Record<any, any>[]).map((section) => {
		const currentSection = sections[section];
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

export const itemContent = (styles, { icon, title, description, author }) => {
	return (
		<>
			<div className={"icon"}>{icon && getIcon(icon as string)}</div>
			<div>
				<div className={"title"}>{title}</div>
				<div className={"description"}>{description}</div>
				<div className={"author"}>{author}</div>
			</div>
		</>
	);
};
