import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { SITE_PAGES } from "../config/pages";
import { useRouter } from "next/router";
import { ERROR_404_PAGE_LOCALE } from "../locales/components";
import { ReactLayoutContext } from "../contexts/layout-context";
import { ILayoutContext } from "../interfaces/layout-context";

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

	const layoutContext: ILayoutContext = {
		locale,
		compLocale,
		pageId,
		pages: SITE_PAGES,
		isCurrentPage,
		translate: translate(locale),
	};

	return (
		<ReactLayoutContext.Provider value={layoutContext}>
			<Component {...pageProps} />
		</ReactLayoutContext.Provider>
	);
}

export default App;
