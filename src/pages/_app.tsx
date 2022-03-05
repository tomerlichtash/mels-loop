import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { SITE_PAGES } from "../config/pages";
import { useRouter } from "next/router";
import { ERROR_404_PAGE_LOCALE } from "../locales/components";
import { ReactLayoutContext } from "../contexts/layout-context";
import { ILayoutContext } from "../interfaces/layout-context";
import { SitePage } from "../interfaces/models";

function isCurrentPage(
	source: string,
	id: string,
	parent,
	pages: SitePage[]
): boolean {
	if (parent) {
		const pageData = pages.filter((p) => p.id === parent)[0];
		if (pageData.children && pageData.children.includes(source)) {
			return id === source;
		}
		return parent === source;
	}
	return id === source;
}

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname, query, asPath } = router;

	const pageParent = pathname.includes("[id]") ? pathname.split("/")[1] : "";
	const pathHasChild = (query.id || "") as string;

	const pathData = Object.values(SITE_PAGES).filter((p) => {
		return p.targetPathname === asPath;
	})[0];

	const compLocale = (pathData && pathData.locale) || ERROR_404_PAGE_LOCALE;

	const layoutContext: ILayoutContext = {
		locale,
		compLocale,
		pageId: pathData && pathData.id ? pathData.id : pathHasChild,
		pageParent,
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
