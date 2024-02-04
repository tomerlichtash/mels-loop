import {
	NavItemDataProps,
	NavItemLocaleProps,
	NavParsedNodes,
	NavSectionDataProps,
} from './HorizontalMenu/types';

const translateKeys = (
	keys: NavItemLocaleProps,
	translateFn: (s: string) => string
) =>
	Object.fromEntries(
		Object.keys(keys).map((key) => [key, translateFn(keys[key])])
	);

const getSectionItems = (
	section: NavSectionDataProps,
	items: NavItemDataProps[]
) => {
	return section.items
		? section.items.map(
				(itemId) => items.filter((item) => item.id === itemId)[0]
		  )
		: null;
};

export const parseMenuItems = (
	sections: NavSectionDataProps[],
	items: NavItemDataProps[],
	translate: (s: string) => string
): NavParsedNodes[] => {
	const res = sections.map((section) => {
		return Object.assign({}, section, {
			locale: translateKeys(section.locale, translate),
			items: getSectionItems(section, items).map((item) => {
				return Object.assign({}, item, {
					locale: translateKeys(item.locale, translate),
				});
			}),
		});
	});
	return res;
};

export const mapSources = (sources) =>
	sources &&
	sources.map(({ name, author, ...rest }) => {
		const authorSuffix = author ? ` / ${author}` : '';
		return {
			label: `${name}${authorSuffix}`,
			target: '_blank',
			...rest,
		};
	});

export const serialPrefix = (
	index: number,
	limit: number,
	customPrefix: string
) => {
	return index <= limit ? customPrefix : '';
};

export const leadingZero = (index: number) => {
	return serialPrefix(index, 9, '0');
};
