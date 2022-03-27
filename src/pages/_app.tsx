import { AppProps } from "next/app";
import { translateFunc } from "../locales/translate";
import { useRouter } from "next/router";
import { ReactLayoutContext } from "../contexts/layout-context";
import { ILayoutContext } from "../interfaces/layout-context";
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
	const sitePageId = queryId ? parentId : asPath;
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

	const contentContext = new PageContext(new DynamicContentServer());

	return (
		<ReactLayoutContext.Provider value={layoutContext}>
			<ReactPageContext.Provider value={contentContext}>
				<Component {...pageProps} />
			</ReactPageContext.Provider>
		</ReactLayoutContext.Provider>
	);
}

export default App;
