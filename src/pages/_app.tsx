import React, { useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { LocaleContext, ReactLocaleContext } from "../contexts/locale-context";
import { QueryContext, ReactQueryContext } from "../contexts/query-context";
import { PageContext, ReactPageContext } from "../contexts/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";
import { QueryManager } from "../contexts/query-manager";
import {
	ReactThemeContext,
	ThemeContext,
	IThemeContext,
	Themes,
} from "../contexts/theme-context";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const queryContext = new QueryContext(new QueryManager({ router }));
	const localeContext = new LocaleContext({ router });
	const contentContext = new PageContext(new DynamicContentServer());
	const [theme, setTheme] = useState<Themes>(null);
	const themeContext: IThemeContext = new ThemeContext({
		theme,
		setTheme,
	});

	return (
		<div>
			<ReactQueryContext.Provider value={queryContext}>
				<ReactLocaleContext.Provider value={localeContext}>
					<ReactPageContext.Provider value={contentContext}>
						<ReactThemeContext.Provider value={themeContext}>
							<Component {...pageProps} />
						</ReactThemeContext.Provider>
					</ReactPageContext.Provider>
				</ReactLocaleContext.Provider>
			</ReactQueryContext.Provider>
		</div>
	);
};

export default App;
