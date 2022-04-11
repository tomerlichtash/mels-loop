import React from "react";
import { AppProps } from "next/app";
import { translateFunc } from "../locales/translate";
import { useRouter } from "next/router";
import { ILocaleContext } from "../interfaces/layout-context";
import { ReactLocaleContext } from "../contexts/locale-context";
import { QueryContext, ReactQueryContext } from "../contexts/query-context";
import { PageContext, ReactPageContext } from "../contexts/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";
import { getLocaleInfo } from "../locales/locale-info";
import { getPathData, getSiteTitle, getSiteSubtitle } from "../config/pages";
import { QueryManager } from "../contexts/query-manager";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale } = router;
	const translate = translateFunc(locale);
	const pathData = getPathData(router.route);
	const queryContext = new QueryContext(new QueryManager({ _router: router }));
	const contentContext = new PageContext(new DynamicContentServer());
	const localeContext: ILocaleContext = {
		locale,
		compLocale: pathData?.locale,
		localeInfo: getLocaleInfo(locale),
		translate,
		getSiteTitle,
		getSiteSubtitle,
		popoverRef: React.createRef(),
	};
	return (
		<ReactQueryContext.Provider value={queryContext}>
			<ReactLocaleContext.Provider value={localeContext}>
				<ReactPageContext.Provider value={contentContext}>
					<Component {...pageProps} />
				</ReactPageContext.Provider>
			</ReactLocaleContext.Provider>
		</ReactQueryContext.Provider>
	);
}

export default App;
