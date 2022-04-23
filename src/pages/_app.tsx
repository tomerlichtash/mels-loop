import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { LocaleContext, ReactLocaleContext } from "../contexts/locale-context";
import { QueryContext, ReactQueryContext } from "../contexts/query-context";
import { PageContext, ReactPageContext } from "../contexts/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";
import { QueryManager } from "../contexts/query-manager";
import { ThemeCtx } from "../contexts/theme-context";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const queryContext = new QueryContext(new QueryManager({ router }));
	const localeContext = new LocaleContext({ router });
	const contentContext = new PageContext(new DynamicContentServer());

	return (
		<ReactQueryContext.Provider value={queryContext}>
			<ReactLocaleContext.Provider value={localeContext}>
				<ReactPageContext.Provider value={contentContext}>
					<ThemeCtx>
						<Component {...pageProps} />
					</ThemeCtx>
				</ReactPageContext.Provider>
			</ReactLocaleContext.Provider>
		</ReactQueryContext.Provider>
	);
};

export default App;
