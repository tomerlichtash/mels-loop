import { SITE_PAGES } from "./pages-data";
import { SITE_META } from "../locales/components";

export const getSiteTitle = () => {
	return SITE_META.siteTitle;
};

export const getSiteSubtitle = () => {
	return SITE_META.siteSubtitle;
};

export const getPathData = (id: string) =>
	Object.values(SITE_PAGES).filter((p) => p.targetPathname === id)[0];
