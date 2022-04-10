// import React from "react";
// import { AppProps } from "next/app";
// import { translateFunc } from "../locales/translate";
// import { useRouter } from "next/router";
// import { ILayoutContext } from "../interfaces/layout-context";
// import { ReactLayoutContext } from "../contexts/layout-context";
// import { QueryContext, ReactQueryContext } from "../contexts/query-context";
// import { PageContext, ReactPageContext } from "../contexts/page-context";
// import { DynamicContentServer } from "../lib/dynamic-content-server";
// import { getLocaleInfo } from "../locales/locale-info";
// import { getPathData, getSiteTitle, getSiteSubtitle } from "../config/pages";
// import { QueryManager } from "../contexts/query-manager";

// export interface AppContext extends AppProps {
// 	children: any;
// }

// function AppContext({ Component, pageProps, children }: AppContext) {
// 	const router = useRouter();
// 	const { locale } = router;
// 	const translate = translateFunc(locale);
// 	const pathData = getPathData(router.route);
// 	const queryContext = new QueryContext(new QueryManager({ _router: router }));
// 	const contentContext = new PageContext(new DynamicContentServer());
// 	const layoutContext: ILayoutContext = {
// 		locale,
// 		compLocale: pathData?.locale,
// 		localeInfo: getLocaleInfo(locale),
// 		translate,
// 		getSiteTitle,
// 		getSiteSubtitle,
// 	};
// 	return (
// 		<ReactQueryContext.Provider value={queryContext}>
// 			<ReactLayoutContext.Provider value={layoutContext}>
// 				<ReactPageContext.Provider value={contentContext}>
// 					{children}
// 				</ReactPageContext.Provider>
// 			</ReactLayoutContext.Provider>
// 		</ReactQueryContext.Provider>
// 	);
// }

// export default App;
