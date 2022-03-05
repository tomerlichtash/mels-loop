import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { SITE_PAGES } from "../config/pages";
import { useRouter } from "next/router";
import { ERROR_404_PAGE_LOCALE } from "../locales/components";
import { ReactLayoutContext } from "../contexts/layout-context";
import { ILayoutContext } from "../interfaces/layout-context";
import { PageContext, ReactPageContext } from "../components/page/page-context";
import { PageContentAttributes } from "../interfaces/models";
import { DynamicContentServer } from "../lib/dynamic-content-server";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname, query, asPath } = router;

	const pageParent = pathname.includes("[id]") ? pathname.split("/")[1] : "";
	const pathHasChild = (query.id || "") as string;
	const sitePageId = query.id && pathHasChild ? pageParent : asPath;
	const pathData = Object.values(SITE_PAGES).filter(
		(p) => p.targetPathname === sitePageId
	)[0];
	const compLocale = pathData?.locale || ERROR_404_PAGE_LOCALE;
	const pageId = pathData?.id ? pathData.id : pathHasChild;

	const translateFunc = translate(locale);

	const isCurrentPage = (targetId: string): boolean => {
		if (pageParent) {
			const pageData = SITE_PAGES.filter((p) => p.id === pageParent)[0];
			if (pageData?.children?.includes(targetId)) {
				return pageId === targetId;
			}
			return pageParent === targetId;
		}
		return pageId === targetId;
	};

	const getPageName = (id: string) => {
		return translateFunc(SITE_PAGES.filter((p) => p.id === id)[0].label);
	};

	const layoutContext: ILayoutContext = {
		locale,
		compLocale,
		pageId,
		pages: SITE_PAGES,
		getPageName,
		isCurrentPage,
		translate: translateFunc,
	};

	const contentContext = new PageContext(
		new DynamicContentServer(),
		PageContentAttributes.Plain);

	return (
		<ReactLayoutContext.Provider value={layoutContext}>
			<ReactPageContext.Provider value={contentContext}>
				<Component {...pageProps} />
			</ReactPageContext.Provider>
		</ReactLayoutContext.Provider>
	);
}

export default App;
