import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { translateFunc } from "../locales/translate";
import { ILayoutContext } from "../interfaces/layout-context";
import { ReactLayoutContext } from "../contexts/layout-context";
import { QueryContext, ReactQueryContext } from "../contexts/query-context";
import { PageContext, ReactPageContext } from "../contexts/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";
import { getPathData, getSiteTitle, getSiteSubtitle } from "../config/pages";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale } = router;
	const translate = translateFunc(locale);
	const pathData = getPathData(router.route);
	const queryContext = new QueryContext({ router });
	const contentContext = new PageContext(new DynamicContentServer());
	const layoutContext: ILayoutContext = {
		locale,
		compLocale: pathData?.locale,
		translate,
		getSiteTitle,
		getSiteSubtitle,
	};
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
