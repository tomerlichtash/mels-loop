const trKeys = (item, translate: (s: string) => string) =>
	Object.fromEntries(
		Object.keys(item.locale as string[]).map((key) => [
			key,
			translate(item.locale[key] as string),
		])
	);

const getSectionItems = (section, items) => {
	return section.items
		? section.items.map(
				(itemId) => items.filter((item) => item.id === itemId)[0]
		  )
		: null;
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
