import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { translateFunc } from "../locales/translate";
import { ILayoutContext } from "../interfaces/layout-context";
import { ReactLayoutContext } from "../contexts/layout-context";
import { QueryContext, ReactQueryContext } from "../contexts/query-context";
import { PageContext, ReactPageContext } from "../contexts/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";
import {
	getPathData,
	getPagePath,
	getPageRefs,
	getPageName,
	isCurrentPage,
	isPageVisible,
	getSiteTitle,
	getSiteSubtitle,
} from "../config/pages";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname, query, asPath } = router;
	const parentId = pathname.includes("[id]") ? pathname.split("/")[1] : "";
	const queryId = query.id as string;
	const sitePageId = queryId ? parentId : asPath.split("?")[0];
	const pathData = getPathData(sitePageId);
	const pageId = pathData?.id || queryId;
	const translate = translateFunc(locale);

	const layoutContext: ILayoutContext = {
		locale,
		compLocale: pathData?.locale,
		pageId,
		getPageRefs,
		getPagePath,
		getPageName: (id: string) => translate(getPageName(id)),
		isCurrentPage: (id: string) => isCurrentPage(id, pageId, parentId),
		isPageVisible,
		translate,
		getSiteTitle,
		getSiteSubtitle,
	};

	const queryContext = new QueryContext({ router });
	const contentContext = new PageContext(new DynamicContentServer());

	return (
		<ReactQueryContext.Provider value={queryContext}>
			<ReactLayoutContext.Provider value={layoutContext}>
				<ReactPageContext.Provider value={contentContext}>
					<Component {...pageProps} />
				</ReactPageContext.Provider>
			</ReactLayoutContext.Provider>
		</ReactQueryContext.Provider>
	);
}

export default App;
