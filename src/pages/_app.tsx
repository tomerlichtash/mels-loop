import React, { useState, useRef } from "react";
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
import Cookies from "js-cookie";
import { useTheme } from "../hooks/useTheme";

// const themeFromCookie = Cookies.get("theme") as Themes;
import { classes as LightTheme } from "../theme/light-theme.st.css";
import { classes as DarkTheme } from "../theme/dark-theme.st.css";
const themes = {
	light: [LightTheme.root],
	dark: [DarkTheme.root],
};

// const currentTheme = Cookies.get("theme");

const App = ({ Component, pageProps }: AppProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const styleRef = useRef<HTMLStyleElement>(null);
	const setTheme = useTheme(
		themes,
		ref,
		styleRef as React.MutableRefObject<any>
	);

	const router = useRouter();
	const queryContext = new QueryContext(new QueryManager({ router }));
	const localeContext = new LocaleContext({ router });
	const contentContext = new PageContext(new DynamicContentServer());
	// const [theme, setTheme] = useState<Themes>(null);
	const themeContext: IThemeContext = new ThemeContext({
		// theme,
		// themeFromCookie: currentTheme,
		setTheme,
		// themeFromCookie,
	});

	return (
		<ReactQueryContext.Provider value={queryContext}>
			<ReactLocaleContext.Provider value={localeContext}>
				<ReactPageContext.Provider value={contentContext}>
					<ReactThemeContext.Provider value={themeContext}>
						<div ref={ref}>
							<style ref={styleRef}></style>
							<Component {...pageProps} />
						</div>
					</ReactThemeContext.Provider>
				</ReactPageContext.Provider>
			</ReactLocaleContext.Provider>
		</ReactQueryContext.Provider>
	);
};

export default App;
