import { SitePageRef } from "../interfaces/models";
import { SITE_PAGES } from "./pages-data";
import { SITE_META } from "../locales/components";

export const getSiteTitle = () => {
	return SITE_META.siteTitle;
};

export const getSiteSubtitle = () => {
	return SITE_META.siteSubtitle;
};

export const getPage = (id: string) => SITE_PAGES.filter((p) => p.id === id);

export const getPathData = (id: string) =>
	Object.values(SITE_PAGES).filter((p) => p.targetPathname === id)[0];

export const getPageRefs = () =>
	SITE_PAGES.map(({ id, menuNav }: SitePageRef) => {
		return { id, menuNav };
	});

export const isPageVisible = (id: string) => {
	const page = getPage(id);
	if (!page.length) {
		throw new Error(`Missing page key: ${id}`);
	}
	if (!Object.keys(page[0]).includes("menuNav")) {
		throw new Error(`Missing visibility settings for pageId ${id}`);
	}
	const { menuNav } = page[0];
	return menuNav;
};

export const getPagePath = (id: string) => {
	const page = getPage(id);
	if (!page.length) {
		throw new Error(`Missing page key: ${id}`);
	}
	const { targetPathname } = page[0];
	if (!targetPathname) {
		throw new Error(`Missing targetPathname for pageId ${id}`);
	}
	return targetPathname;
};

export const getPageName = (id: string) => {
	const page = getPage(id);
	if (!page.length) {
		throw new Error(`Missing page key: ${id}`);
	}
	const { locale } = page[0];
	if (!locale) {
		throw new Error(`Missing locale for pageId ${id}`);
	}
	return locale.pageName;
};

export const isCurrentPage = (
	id: string,
	currentPageId: string,
	pageParent: string
): boolean => {
	if (pageParent) {
		const pageData = getPage(pageParent)[0];
		if (!pageData?.children?.includes(id)) {
			return pageParent === id;
		}
	}
	return currentPageId === id;
};
