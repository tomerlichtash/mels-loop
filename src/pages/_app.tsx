import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { useRouter } from "next/router";
import { ReactLayoutContext } from "../contexts/layout-context";
import { ILayoutContext } from "../interfaces/layout-context";
import { PageContext, ReactPageContext } from "../components/page/page-context";
import { PageContentAttributes } from "../interfaces/models";
import { DynamicContentServer } from "../lib/dynamic-content-server";
import {
	getPathData,
	getPath,
	getPageRefs,
	getPageName,
	isCurrentPage,
} from "../config/pages";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale, pathname, query, asPath } = router;

	const parent = pathname.includes("[id]") ? pathname.split("/")[1] : "";
	const queryId = query.id as string;
	const sitePageId = queryId ? parent : asPath;
	const pathData = getPathData(sitePageId);
	const compLocale = pathData?.locale;
	const pageId = pathData?.id ? pathData.id : queryId;

	const translateFunc = translate(locale);

	const layoutContext: ILayoutContext = {
		locale,
		compLocale,
		pageId,
		getPageRefs,
		getPath,
		getPageName: (id: string) => translateFunc(getPageName(id)),
		isCurrentPage: (id: string) => isCurrentPage(id, pageId, parent),
		translate: translateFunc,
	};

	const contentContext = new PageContext(
		new DynamicContentServer(),
		PageContentAttributes.Plain
	);

	return (
		<ReactLayoutContext.Provider value={layoutContext}>
			<ReactPageContext.Provider value={contentContext}>
				<Component {...pageProps} />
			</ReactPageContext.Provider>
		</ReactLayoutContext.Provider>
	);
}

export default App;
