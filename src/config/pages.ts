import { SITE_PAGES } from "./pages-data";
import { SITE_META } from "../locales/components";

export const getSiteTitle = () => SITE_META.siteTitle;

export const getSiteSubtitle = () => SITE_META.siteSubtitle;

export const getPopoverBackLabel = () => SITE_META.popoverBackLabel;

export const getPathData = (id: string) =>
	Object.values(SITE_PAGES).filter((p) => p.targetPathname === id)[0];
